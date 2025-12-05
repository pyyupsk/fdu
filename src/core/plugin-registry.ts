/**
 * Plugin Registry - Manages plugin lifecycle and prevents conflicts
 *
 * @internal
 */

import type { FduInstance, Plugin, PluginAPI } from "./types";

/**
 * Lazy loading to avoid circular dependency
 */
// biome-ignore lint/suspicious/noExplicitAny: fduFunction needs to accept any input type
let fduFunction: ((input?: any) => FduInstance) | null = null;

/**
 * Error thrown when a plugin is missing the required install method.
 */
export class InvalidPluginError extends Error {
  /**
   * Creates a new InvalidPluginError.
   *
   * @param message - The error message describing the invalid plugin
   */
  constructor(message: string) {
    super(message);
    this.name = "InvalidPluginError";
  }
}

/**
 * Error thrown when a plugin attempts to override a core method.
 */
export class CoreMethodOverrideError extends Error {
  /**
   * Creates a new CoreMethodOverrideError.
   *
   * @param message - The error message describing the override attempt
   */
  constructor(message: string) {
    super(message);
    this.name = "CoreMethodOverrideError";
  }
}

/**
 * Internal singleton that manages plugin lifecycle, prevents conflicts,
 * and provides isolation between plugins and core.
 */
export class PluginRegistry {
  private static instance: PluginRegistry;
  private readonly plugins = new Map<string, Plugin>();
  private readonly installedMethods = new Set<string>();
  private coreMethods?: Set<string>;

  private constructor() {}

  /**
   * Set the fdu function reference (called from datetime.ts to avoid circular dependency).
   *
   * @param fn - The fdu factory function to register
   *
   * @internal
   */
  // biome-ignore lint/suspicious/noExplicitAny: fduFunction needs to accept any input type
  static setFduFunction(fn: (input?: any) => FduInstance): void {
    fduFunction = fn;
  }

  /**
   * Get the singleton instance of the PluginRegistry.
   *
   * @returns The singleton PluginRegistry instance
   *
   * @internal
   */
  static getInstance(): PluginRegistry {
    if (!PluginRegistry.instance) {
      PluginRegistry.instance = new PluginRegistry();
    }
    return PluginRegistry.instance;
  }

  /**
   * Get core method names from FdInstance prototype.
   * Cached on first call.
   *
   * @returns Set of protected core method names
   *
   * @internal
   */
  getCoreMethodNames(): Set<string> {
    if (this.coreMethods) {
      return this.coreMethods;
    }

    // Scan FdInstance prototype for core methods
    // These are the methods that plugins cannot override
    this.coreMethods = new Set<string>([
      "format",
      "add",
      "subtract",
      "isBefore",
      "isAfter",
      "isSame",
      "diff",
      "year",
      "month",
      "date",
      "hour",
      "minute",
      "second",
      "millisecond",
      "day",
      "weekday",
      "locale",
      "toDate",
      "toISOString",
      "valueOf",
      "isValid",
    ]);
    return this.coreMethods;
  }

  /**
   * Check if a method name conflicts with core methods.
   * Throws CoreMethodOverrideError if conflict detected.
   *
   * @param name - The method name to check for conflicts
   *
   * @internal
   */
  preventCoreOverride(name: string): void {
    const coreMethods = this.getCoreMethodNames();
    if (coreMethods.has(name)) {
      throw new CoreMethodOverrideError(
        `Cannot override core method: ${name}. Core methods are protected.`,
      );
    }
  }

  /**
   * Check if a method has already been registered by another plugin.
   *
   * @param name - The method name to check
   * @returns True if the method is already registered
   *
   * @internal
   */
  isMethodRegistered(name: string): boolean {
    return this.installedMethods.has(name);
  }

  /**
   * Register a plugin and call its install method.
   *
   * @param plugin - The plugin to register
   * @param options - Optional configuration to pass to the plugin's install method
   *
   * @internal - Use fdu.extend() instead
   */
  register(plugin: Plugin, options?: unknown): void {
    if (typeof plugin.install !== "function") {
      throw new InvalidPluginError("Plugin must have an install method");
    }

    if (plugin.name && this.plugins.has(plugin.name)) {
      console.warn(
        `[Plugin] Plugin "${plugin.name}" is already registered. Re-registering will replace the previous version.`,
      );
    }

    // Create PluginAPI instance
    const api = this.createPluginAPI();

    // Call plugin install
    plugin.install(api, options);

    // Add to registry
    if (plugin.name) {
      this.plugins.set(plugin.name, plugin);
    }

    // Freeze plugin to prevent mutation
    Object.freeze(plugin);
  }

  /**
   * Create a PluginAPI instance for a plugin.
   *
   * @returns A new PluginAPI instance for plugin installation
   *
   * @internal
   */
  private createPluginAPI(): PluginAPI {
    const self = this;

    return {
      extendPrototype(
        methodName: string,
        fn: (this: FduInstance, ...args: unknown[]) => unknown,
      ): void {
        self.preventCoreOverride(methodName);

        if (self.isMethodRegistered(methodName)) {
          console.warn(
            `[Plugin] Method '${methodName}' already registered by another plugin. Overriding.`,
          );
        }

        if (!fduFunction) {
          throw new Error(
            "fdu function not initialized. This is an internal error.",
          );
        }

        const FduInstancePrototype = Object.getPrototypeOf(fduFunction());

        Object.defineProperty(FduInstancePrototype, methodName, {
          value: fn,
          writable: false,
          enumerable: false,
          configurable: true, // Allow future unregistration
        });

        self.installedMethods.add(methodName);
      },

      getInternalDate(this: FduInstance): Date {
        return this.getInternalDate() || new Date();
      },

      createInstance(date: Date | number | string): FduInstance {
        if (!fduFunction) {
          throw new Error(
            "fdu function not initialized. This is an internal error.",
          );
        }
        return fduFunction(date);
      },

      get version(): string {
        return "__VERSION__";
      },
    };
  }
}
