/**
 * Uppercase first letter and the rest Lower Case
 * @param word
 * @returns
 */
export function capitalize(word: string) {
  if (!word) return;
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * This will return a promise that will stop the execution for n ms.
 * @param ms Milliseconds to sleep
 * @returns
 */
export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Create a random number between max and min
 * @param max Max number to consider exclusive
 * @param min Starting number to start counting default 0
 * @returns A number between max and min
 */
export function getRandomInt(max: number, min: number = 0) {
  return Math.floor(Math.random() * max) + min;
}

export function generateRandomUI(): string {
  return Math.random().toString(16).slice(2);
}

/**
 * Remove numbers from a string, all numbers with this char will be removed number with dot (10.)
 */
export function removeNumbers(content: string): string {
  return content.replaceAll(/[\d]+[.]\s/g, "");
}
