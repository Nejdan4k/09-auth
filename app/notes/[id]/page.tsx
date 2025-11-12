import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Metadata } from "next";
import NoteDetailsClient from "./NoteDetails.client";

// ----------------------------------------------------------------
// SEO metadata (await params – тепер обовʼязково у Next.js 15)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  const title = `NoteHub — ${note.title}`;
  const description =
    note.content?.slice(0, 160) || "View note details in NoteHub.";
  const url = `${
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  }/notes/${id}`;

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

// ----------------------------------------------------------------
// Сторінка з hydration React Query (також params як Promise)
export default async function NoteDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ розпаковуємо проміс

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}