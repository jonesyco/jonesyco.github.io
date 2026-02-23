import { defineConfig } from "astro/config";

// User/Org Pages repo: https://jonesyco.github.io => base "/"
export default defineConfig({
    site: "https://jonesyco.github.io",
    base: "/",
    output: "static"
});