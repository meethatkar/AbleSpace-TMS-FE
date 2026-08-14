/**
 * Normalizes a string by converting it to lowercase and removing all spaces, hyphens, and underscores.
 * Useful for case-insensitive and symbol-agnostic comparisons.
 */
export const normalizeString = (str: string): string => {
  return str.toLowerCase().replace(/[\s-_]/g, "");
};
