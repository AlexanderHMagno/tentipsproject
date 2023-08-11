/**
 * Uppercase first letter and the rest Lower Case
 * @param word
 * @returns
 */
export function capitalize(word: string) {
  if (!word) return;
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}
