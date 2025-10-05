import { beforeEach, describe, expect, it } from "vitest";
import { fdu } from "../../../src";
import {
  CoreMethodOverrideError,
  InvalidPluginError,
  PluginRegistry,
} from "../../../src/core/plugin-registry";
import type { FduInstance, Plugin } from "../../../src/core/types";

describe("PluginRegistry", () => {
  let registry: PluginRegistry;

  beforeEach(() => {
    registry = PluginRegistry.getInstance();
  });

  describe("Singleton Pattern", () => {
    it("should return the same instance", () => {
      const instance1 = PluginRegistry.getInstance();
      const instance2 = PluginRegistry.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe("Core Method Protection", () => {
    it("should get core method names", () => {
      const coreMethods = registry.getCoreMethodNames();
      expect(coreMethods).toBeInstanceOf(Set);
      expect(coreMethods.has("format")).toBe(true);
      expect(coreMethods.has("add")).toBe(true);
      expect(coreMethods.has("subtract")).toBe(true);
      expect(coreMethods.has("isBefore")).toBe(true);
    });

    it("should cache core method names", () => {
      const first = registry.getCoreMethodNames();
      const second = registry.getCoreMethodNames();
      expect(first).toBe(second);
    });

    it("should prevent override of core methods", () => {
      expect(() => {
        registry.preventCoreOverride("format");
      }).toThrow(CoreMethodOverrideError);

      expect(() => {
        registry.preventCoreOverride("add");
      }).toThrow(CoreMethodOverrideError);
    });

    it("should allow non-core method names", () => {
      expect(() => {
        registry.preventCoreOverride("customMethod");
      }).not.toThrow();
    });
  });

  describe("Plugin Registration", () => {
    it("should throw error for invalid plugin", () => {
      const invalidPlugin = {
        name: "invalid",
      } as Plugin;

      expect(() => {
        registry.register(invalidPlugin);
      }).toThrow(InvalidPluginError);
    });

    it("should register valid plugin", () => {
      let installed = false;
      const validPlugin: Plugin = {
        name: "test-plugin",
        install: () => {
          installed = true;
        },
      };

      registry.register(validPlugin);
      expect(installed).toBe(true);
    });

    it("should register plugin with options", () => {
      let receivedOptions: unknown;
      const pluginWithOptions: Plugin<{ value: number }> = {
        name: "options-plugin",
        install: (_api, options) => {
          receivedOptions = options;
        },
      };

      registry.register(pluginWithOptions, { value: 42 });
      expect(receivedOptions).toEqual({ value: 42 });
    });

    it("should freeze plugin after registration", () => {
      const plugin: Plugin = {
        name: "freeze-test",
        install: () => {},
      };

      registry.register(plugin);
      expect(Object.isFrozen(plugin)).toBe(true);
    });
  });

  describe("Method Registration Tracking", () => {
    it("should track registered methods", () => {
      expect(registry.isMethodRegistered("nonExistentMethod")).toBe(false);

      const plugin: Plugin = {
        name: "tracking-test",
        install: (api) => {
          api.extendPrototype("trackedMethod", () => "tracked");
        },
      };

      registry.register(plugin);
      expect(registry.isMethodRegistered("trackedMethod")).toBe(true);
    });
  });

  describe("PluginAPI", () => {
    it("should extend prototype with new method", () => {
      const plugin: Plugin = {
        name: "extend-test",
        install: (api) => {
          api.extendPrototype("testMethod", () => "test result");
        },
      };

      registry.register(plugin);
      const instance = fdu();
      expect(
        (instance as FduInstance & { testMethod: () => string }).testMethod(),
      ).toBe("test result");
    });

    it("should prevent overriding core methods via extendPrototype", () => {
      const plugin: Plugin = {
        name: "override-test",
        install: (api) => {
          api.extendPrototype("format", () => "overridden");
        },
      };

      expect(() => {
        registry.register(plugin);
      }).toThrow(CoreMethodOverrideError);
    });

    it("should allow method context access", () => {
      const plugin: Plugin = {
        name: "context-test",
        install: (api) => {
          api.extendPrototype("getYear", function () {
            return this.year();
          });
        },
      };

      registry.register(plugin);
      const instance = fdu("2025-10-05");
      expect(
        (instance as FduInstance & { getYear: () => number }).getYear(),
      ).toBe(2025);
    });

    it("should provide getInternalDate method", () => {
      let internalDate: Date | null = null;
      const plugin: Plugin = {
        name: "internal-date-test",
        install: (api) => {
          api.extendPrototype("testInternalDate", function () {
            internalDate = api.getInternalDate.call(this);
            return internalDate;
          });
        },
      };

      registry.register(plugin);
      const instance = fdu("2025-10-05");
      (
        instance as FduInstance & { testInternalDate: () => Date }
      ).testInternalDate();
      expect(internalDate).toBeInstanceOf(Date);
    });

    it("should provide createInstance method", () => {
      let createdInstance: FduInstance | undefined;
      const plugin: Plugin = {
        name: "create-instance-test",
        install: (api) => {
          createdInstance = api.createInstance("2025-10-05");
        },
      };

      registry.register(plugin);
      expect(createdInstance).toBeDefined();
      expect(createdInstance?.year()).toBe(2025);
    });

    it("should provide version property", () => {
      let version: string | undefined;
      const plugin: Plugin = {
        name: "version-test",
        install: (api) => {
          version = api.version;
        },
      };

      registry.register(plugin);
      expect(version).toBeDefined();
      expect(typeof version).toBe("string");
    });
  });

  describe("Plugin Conflict Handling", () => {
    it("should warn when re-registering plugin with same name", () => {
      const plugin1: Plugin = {
        name: "duplicate",
        install: () => {},
      };

      const plugin2: Plugin = {
        name: "duplicate",
        install: () => {},
      };

      registry.register(plugin1);
      // Should warn but not throw
      registry.register(plugin2);
    });

    it("should warn when method is already registered", () => {
      const plugin1: Plugin = {
        name: "method-conflict-1",
        install: (api) => {
          api.extendPrototype("conflictMethod", () => "first");
        },
      };

      const plugin2: Plugin = {
        name: "method-conflict-2",
        install: (api) => {
          api.extendPrototype("conflictMethod", () => "second");
        },
      };

      registry.register(plugin1);
      // Should warn and override
      registry.register(plugin2);

      const instance = fdu();
      expect(
        (
          instance as FduInstance & { conflictMethod: () => string }
        ).conflictMethod(),
      ).toBe("second");
    });
  });

  describe("fdu.extend", () => {
    it("should register plugin via fdu.extend", () => {
      const plugin: Plugin = {
        name: "extend-api-test",
        install: (api) => {
          api.extendPrototype("viaExtend", () => "extended");
        },
      };

      fdu.extend(plugin);
      const instance = fdu();
      expect(
        (instance as FduInstance & { viaExtend: () => string }).viaExtend(),
      ).toBe("extended");
    });

    it("should pass options via fdu.extend", () => {
      let receivedOptions: { key: string } | undefined;
      const plugin: Plugin<{ key: string }> = {
        name: "extend-options-test",
        install: (_api, options) => {
          receivedOptions = options;
        },
      };

      fdu.extend(plugin, { key: "value" });
      expect(receivedOptions).toEqual({ key: "value" });
    });
  });

  describe("Edge Cases", () => {
    it("should handle fduFunction not initialized in extendPrototype", () => {
      // Create a new registry instance to test before initialization
      // biome-ignore lint/suspicious/noExplicitAny: Testing internal singleton behavior
      const freshRegistry = new (PluginRegistry as any)();
      const plugin: Plugin = {
        name: "uninitialized-test",
        install: (api) => {
          expect(() => {
            api.extendPrototype("testMethod", () => "test");
          }).toThrow("fdu function not initialized");
        },
      };

      // This should throw during plugin installation
      expect(() => freshRegistry.register(plugin)).toThrow();
    });

    it("should handle fduFunction not initialized in createInstance", () => {
      // Create a new registry instance to test before initialization
      // biome-ignore lint/suspicious/noExplicitAny: Testing internal singleton behavior
      const freshRegistry = new (PluginRegistry as any)();
      const plugin: Plugin = {
        name: "create-uninitialized-test",
        install: (api) => {
          expect(() => {
            api.createInstance("2025-10-05");
          }).toThrow("fdu function not initialized");
        },
      };

      // This should throw during plugin installation
      expect(() => freshRegistry.register(plugin)).toThrow();
    });
  });
});
