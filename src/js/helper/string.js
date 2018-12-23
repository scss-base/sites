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
 * @param {String} string
 * @returns {String}
 */
export const kebabCase = (string) =>
  `${string}`.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();

/**
 * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
 * @param {String} namespace - name of plugin to be incorporated in uid, optional.
 * @returns {String} random base-36 uid with namespacing
 */
export const pid = (length, namespace) => {
  const pid = Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)))
    .toString(36).slice(1);
  return namespace ? `${namespace}-${pid}` : `${pid}`;
};
