// src/lib/photos.ts
import captions from "../data/paintings.captions.json";

type PaintingModule = {
    default: any; // Astro image metadata module
};

const paintingImports = import.meta.glob<PaintingModule>(
    "../assets/paintings/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
    { eager: true }
);

function slugifyFilename(filename: string) {
    // remove extension
    const base = filename.replace(/\.[^/.]+$/, "");
    // simple slug: keep letters/numbers, replace spaces/underscores with hyphen
    return base
        .trim()
        .toLowerCase()
        .replace(/[\s_]+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");
}

export type PaintingItem = {
    name: string;   // filename
    slug: string;   // derived slug
    image: any;     // Astro image metadata for getImage()
};

export const paintings: PaintingItem[] = Object.entries(paintingImports)
    .map(([path, mod]) => {
        const name = path.split("/").pop() ?? "painting";
        const slug = slugifyFilename(name);

        const meta = captions[slug] ?? {};

        return {
            name,
            slug,
            image: mod.default,
            title: meta.title ?? slug,
            caption: meta.caption ?? "",
            tags: meta.tags ?? []
        };
    })
    .sort((a, b) => a.name.localeCompare(b.name));