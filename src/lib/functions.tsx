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
