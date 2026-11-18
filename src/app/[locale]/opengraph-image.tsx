// The [locale] layout defines its own openGraph block, which drops the root image;
// re-exporting it here gives the home page (and any route without its own card) a share image.
export { default, alt, size, contentType } from "../opengraph-image";
