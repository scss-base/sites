/**
 * Converts string to camel case.
 * @link https://en.wikipedia.org/wiki/Camel_case
 * @param {string} string
 * @returns {string}
 */
export function camelCase(string: string): string {
  return `${string}`
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w+)/, 'g'),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\s/, 'g'), '')
    .replace(new RegExp(/\w/), s => s.toLowerCase());
}

/**
 * Converts string to pascal case.
 * @link https://en.wikipedia.org/wiki/Camel_case
 * @param string
 * @returns {string}
 */
export function pascalCase(string: string): string {
  return `${string}`
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w+)/, 'g'),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\s/, 'g'), '')
    .replace(new RegExp(/\w/), s => s.toUpperCase());
}

/**
 * Converts the first character of string to upper case and the remaining to lower case.
 * @param string
 * @returns {string}
 */
export function capitalize(string: string): string {
  return `${string}`.charAt(0).toUpperCase() + `${string}`.slice(1).toLowerCase();
}

/**
 * Converts string to kebab case.
 * @link https://en.wikipedia.org/wiki/Kebab_case
 * @param {string} string
 * @returns {string}
 */
export function kebabCase(string: string): string {
  return `${string}`
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

/**
 * Converts string to snake case.
 * @link https://en.wikipedia.org/wiki/Snake_case
 * @param {string} string
 * @returns {string}
 */
export function snakeCase(string: string): string {
  return `${string}`
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/\s+/g, '_')
    .toLowerCase();
}

/**
 * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
 * @param {string} namespace - name of plugin to be incorporated in uid, optional.
 * @returns {string} random base-36 uid with namespacing
 */
export function random(length: number, namespace: string = null): string {
  const pid = Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)))
    .toString(36).slice(1);
  return namespace ? `${namespace}-${pid}` : `${pid}`;
}
