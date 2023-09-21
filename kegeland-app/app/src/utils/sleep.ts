/**
 * Util function for waiting a specified duration in millisecons
 * @param ms the amount of minutes to wait
 * @returns promise waiting for x ms
 */
export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
