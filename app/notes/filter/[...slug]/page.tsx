import { notFound } from "next/navigation";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { Metadata } from "next";
import NotesClient from "./Notes.client";

const VALID_TAGS = ["all", "work", "personal", "todo", "meeting", "shopping"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0]?.toLowerCase() ?? "all";
  const filterName = tag === "all" ? "All notes" : `Filtered by ${tag}`;
  const title = `NoteHub — ${filterName}`;
  const description = `Browse your ${filterName.toLowerCase()} in NoteHub.`;
  const url = `${
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  }/notes/filter/${tag}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
    },
  };
}

// -------------------------------------------------------------

export default async function FilterPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  // ✅ розпаковуємо проміси
  const { slug } = await params;
  const sp = await searchParams;

  const tagRaw = slug?.[0]?.toLowerCase() ?? "all";
  if (!VALID_TAGS.includes(tagRaw)) notFound();

  const tag = tagRaw === "all" ? undefined : tagRaw;
  const q = typeof sp?.q === "string" ? sp.q : "";
  const page = sp?.page ? Number(sp.page) : 1;

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ["notes", { q, page, tag: tag ?? "" }],
    queryFn: () => fetchNotes({ q, page, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient tag={tag ?? null} />
    </HydrationBoundary>
  );
}