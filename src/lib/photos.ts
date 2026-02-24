// src/lib/photos.ts
import captions from "../data/photography.captions.json";

type PhotoModule = {
    default: any; // Astro image metadata module
};

const photoImports = import.meta.glob<PhotoModule>(
    "../assets/photos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
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

export type PhotoItem = {
    name: string;   // filename
    slug: string;   // derived slug
    image: any;     // Astro image metadata for getImage()
};

export const photos: PhotoItem[] = Object.entries(photoImports)
    .map(([path, mod]) => {
        const name = path.split("/").pop() ?? "photo";
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