import { api } from "./client";
import type { Note } from "@/types/note";

interface CreateNoteDto {
  title: string;
  content: string;
  tag: string;
}

export async function createNote(dto: CreateNoteDto): Promise<Note> {
  const { data } = await api.post<{ note: Note }>("/notes", dto);
  return data.note;
}