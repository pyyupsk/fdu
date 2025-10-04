import type { LocaleConfig } from "../core/types";
import { tokenRegex, tokens } from "./tokens";

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

function handleUnclosedBracket(
  pattern: string,
  startIndex: number,
): { content: string; endIndex: number } {
  const spaceIndex = pattern.indexOf(" ", startIndex + 1);
  const endIndex = spaceIndex === -1 ? pattern.length : spaceIndex;
  const content = pattern.slice(startIndex, endIndex);

  return { content, endIndex };
}

function processNestedBrackets(content: string): string {
  if (content.startsWith("[") && content.endsWith("]")) {
    const innerContent = content.slice(1, -1);
    return `\x01${innerContent}\x01`;
  }
  return content;
}

function addEscapedSection(
  sections: Map<number, string>,
  content: string,
  escapeIndex: number,
): string {
  sections.set(escapeIndex, content);
  return `\x00${escapeIndex}\x00`;
}

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
