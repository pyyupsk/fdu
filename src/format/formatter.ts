import type { LocaleConfig } from "../core/types";
import { tokenRegex, tokens } from "./tokens";

/**
 * Extract escaped sections from pattern and replace with placeholders
 * Handles nested brackets, unclosed brackets, and empty brackets
 */
function extractEscapedSections(pattern: string): {
  processedPattern: string;
  escapedSections: Map<number, string>;
} {
  const sections = new Map<number, string>();
  let result = "";
  let index = 0;
  let escapeIndex = 0;

  while (index < pattern.length) {
    if (pattern[index] === "[") {
      // Look for matching ]
      let closeIndex = -1;
      let bracketCount = 1;

      // Scan forward to find the matching close bracket
      for (let i = index + 1; i < pattern.length; i++) {
        if (pattern[i] === "[") {
          bracketCount++;
        } else if (pattern[i] === "]") {
          bracketCount--;
          if (bracketCount === 0) {
            closeIndex = i;
            break;
          }
        }
      }

      if (closeIndex === -1) {
        // Unclosed bracket - treat '[' and text until next space (or end) as literal
        const spaceIndex = pattern.indexOf(" ", index + 1);
        const endIndex = spaceIndex === -1 ? pattern.length : spaceIndex;
        const content = pattern.slice(index, endIndex); // Include '[' in literal content
        sections.set(escapeIndex, content);
        result += `\x00${escapeIndex}\x00`;
        escapeIndex++;
        index = endIndex; // Continue from space or end
      } else {
        // Extract content between brackets
        let content = pattern.slice(index + 1, closeIndex);

        // Handle nested brackets: [[XXX]] → [XXX]
        // Check if content starts with [ and ends with ]
        if (content.startsWith("[") && content.endsWith("]")) {
          // This is nested brackets: outer escapes, inner become literal
          // Extract the inner content
          const innerContent = content.slice(1, -1);

          // Mark it specially so we can format it during restoration
          content = `\x01${innerContent}\x01`; // Special marker for nested content
        }

        // Store escaped section
        sections.set(escapeIndex, content);
        result += `\x00${escapeIndex}\x00`;
        escapeIndex++;

        index = closeIndex + 1;
      }
    } else {
      result += pattern[index];
      index++;
    }
  }

  return { processedPattern: result, escapedSections: sections };
}

/**
 * Restore escaped sections from placeholders
 */
function restoreEscapedSections(
  formatted: string,
  escapedSections: Map<number, string>,
  date: Date,
  locale?: LocaleConfig,
): string {
  let result = formatted;

  for (const [index, content] of escapedSections) {
    // Check if this is nested bracket content (marked with \x01)
    if (content.startsWith("\x01") && content.endsWith("\x01")) {
      // Extract the inner content and format it
      const innerContent = content.slice(1, -1);
      const formattedInner = innerContent.replace(tokenRegex, (token) => {
        const getter = tokens[token as keyof typeof tokens];
        return getter ? getter(date, locale) : token;
      });
      // Wrap in brackets for output
      result = result.replace(`\x00${index}\x00`, `[${formattedInner}]`);
    } else {
      // Regular escaped text - just restore as-is
      result = result.replace(`\x00${index}\x00`, content);
    }
  }

  return result;
}

/**
 * Takes a date and a pattern and returns a formatted string
 * Supports escaped text in square brackets [text]
 */
export function format(
  date: Date,
  pattern: string,
  locale?: LocaleConfig,
): string {
  // Extract escaped sections (text in brackets)
  const { processedPattern, escapedSections } = extractEscapedSections(pattern);

  // Run token replacement on pattern without escaped sections
  const formatted = processedPattern.replace(tokenRegex, (token) => {
    const getter = tokens[token as keyof typeof tokens];
    return getter ? getter(date, locale) : token;
  });

  // Restore escaped sections
  return restoreEscapedSections(formatted, escapedSections, date, locale);
}
