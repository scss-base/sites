/**
 * Converts string to camel case.
 *
 * @param string
 * @returns {string}
 */
export const camelCase = (string) => {
  string = `${string}`
    .toLowerCase()
    .replace(/(?:(^.)|([-_\s]+.))/g, (match) => match.charAt(match.length - 1).toUpperCase());

  return string.charAt(0).toLowerCase() + string.substring(1);
};

/**
 *
 * Converts the first character of string to upper case and the remaining to lower case.
 *
 * @param string
 * @returns {string}
 */
export const capitalize = (string) => `${string}`.charAt(0).toUpperCase() + string.slice(1);

/**
 * Converts string to kebab case.
 *
 * @param string
 * @returns {string}
 */
export const kebabCase = (string) =>
  `${string}`.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
