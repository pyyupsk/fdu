import type { LocaleConfig } from "../core/types";
import { tokenRegex, tokens } from "./tokens";

/**
 * Formats a date according to the specified pattern and locale.
 *
 * Supports format tokens (YYYY, MM, DD, HH, mm, ss, etc.) and escaped text in square brackets.
 *
 * @param date - The date to format
 * @param pattern - Format pattern string (e.g., 'YYYY-MM-DD HH:mm:ss')
 * @param locale - Optional locale configuration for localized strings
 * @returns Formatted date string
 *
 * @example
 * ```ts
 * // Basic formatting
 * format(new Date(), 'YYYY-MM-DD') // '2024-01-15'
 *
 * // With time
 * format(new Date(), 'YYYY-MM-DD HH:mm:ss') // '2024-01-15 14:30:00'
 *
 * // Escaped text
 * format(new Date(), '[Today is] YYYY-MM-DD') // 'Today is 2024-01-15'
 *
 * // Nested brackets format inner content
 * format(new Date(), '[[YYYY-MM-DD]]') // '[2024-01-15]'
 * ```
 *
 * @internal
 */
export function format(
  date: Date,
  pattern: string,
  locale?: LocaleConfig,
): string {
  const { processedPattern, escapedSections } = extractEscapedSections(pattern);

  const formatted = processedPattern.replace(tokenRegex, (token) => {
    const getter = tokens[token as keyof typeof tokens];
    return getter ? getter(date, locale) : token;
  });

  return restoreEscapedSections(formatted, escapedSections, date, locale);
}

/**
 * Finds the matching closing bracket for nested bracket handling.
 * @internal
 */
function findMatchingBracket(pattern: string, startIndex: number): number {
  let bracketCount = 1;

  for (let i = startIndex + 1; i < pattern.length; i++) {
    if (pattern[i] === "[") {
      bracketCount++;
    } else if (pattern[i] === "]") {
      bracketCount--;
      if (bracketCount === 0) {
        return i;
      }
    }
  }

  return -1;
}

/**
 * Handles unclosed brackets by treating them as literal text until the next space.
 * @internal
 */
function handleUnclosedBracket(
  pattern: string,
  startIndex: number,
): { content: string; endIndex: number } {
  const spaceIndex = pattern.indexOf(" ", startIndex + 1);
  const endIndex = spaceIndex === -1 ? pattern.length : spaceIndex;
  const content = pattern.slice(startIndex, endIndex);

  return { content, endIndex };
}

/**
 * Processes nested brackets by marking them for special formatting.
 * @internal
 */
function processNestedBrackets(content: string): string {
  if (content.startsWith("[") && content.endsWith("]")) {
    const innerContent = content.slice(1, -1);
    return `\x01${innerContent}\x01`;
  }
  return content;
}

/**
 * Adds an escaped section to the map and returns a placeholder.
 * @internal
 */
function addEscapedSection(
  sections: Map<number, string>,
  content: string,
  escapeIndex: number,
): string {
  sections.set(escapeIndex, content);
  return `\x00${escapeIndex}\x00`;
}

/**
 * Extracts and replaces escaped sections (text in brackets) with placeholders.
 * @internal
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
      const closeIndex = findMatchingBracket(pattern, index);

      if (closeIndex === -1) {
        const { content, endIndex } = handleUnclosedBracket(pattern, index);
        result += addEscapedSection(sections, content, escapeIndex);
        escapeIndex++;
        index = endIndex;
      } else {
        const content = pattern.slice(index + 1, closeIndex);
        const processedContent = processNestedBrackets(content);
        result += addEscapedSection(sections, processedContent, escapeIndex);
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
 * Restores escaped sections from placeholders back to their original or formatted text.
 * @internal
 */
function restoreEscapedSections(
  formatted: string,
  escapedSections: Map<number, string>,
  date: Date,
  locale?: LocaleConfig,
): string {
  let result = formatted;

  for (const [index, content] of escapedSections) {
    if (content.startsWith("\x01") && content.endsWith("\x01")) {
      const innerContent = content.slice(1, -1);
      const formattedInner = innerContent.replace(tokenRegex, (token) => {
        const getter = tokens[token as keyof typeof tokens];
        return getter ? getter(date, locale) : token;
      });

      result = result.replace(`\x00${index}\x00`, `[${formattedInner}]`);
    } else {
      result = result.replace(`\x00${index}\x00`, content);
    }
  }

  return result;
}
