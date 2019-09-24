import { one } from './index';
/**
 * Loader function that helps to trigger a callback when multiple images has been loaded.
 *
 * @param {Array} images An array of strings with the paths to the images.
 * @param {Function} fn Callback function executed when all images has been loaded or not.
 */
export function imageLoader(images, fn) {
    let loaded = 0;
    const verifier = () => {
        loaded += 1;
        if (loaded === images.length) {
            fn.apply(undefined);
        }
    };
    images.forEach(image => {
        if (image.complete) {
            verifier();
            return;
        }
        one('load', image, verifier);
        one('error', image, verifier);
    });
}
