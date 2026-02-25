import { photos } from "./photos";
import { paintings } from "./paintings";

export type WorkItem = {
    kind: "photo" | "painting";
    title: string;
    caption: string;
    tags: string[];
    href: string;
    image: any;
    featured: boolean;
};

export const featuredWork: WorkItem[] = [
    ...photos.map((p: any) => ({
        kind: "photo" as const,
        title: p.title ?? p.slug,
        caption: p.caption ?? "",
        tags: p.tags ?? [],
        href: `/photography/${p.slug}`,
        image: p.image,
        featured: !!p.featured,
    })),

    ...paintings.map((p: any) => ({
        kind: "painting" as const,
        title: p.title ?? p.slug,
        caption: p.caption ?? "",
        tags: p.tags ?? [],
        href: `/paintings/${p.slug}`,
        image: p.image,
        featured: !!p.featured,
    })),
];