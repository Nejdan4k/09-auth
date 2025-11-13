
import type { User } from "@/types/user";
import type { NoteTag, Note } from "@/types/note";
import { nextServer } from "./api";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface createNoteProps {
  title: string;
  content: string;
  tag: NoteTag;
}

export type CheckSessionRequest = { success: boolean };

export async function fetchNotes(
  page: number,
  search: string,
  tag?: string
): Promise<FetchNotesResponse> {
  const { data } = await nextServer.get<FetchNotesResponse>(`/notes`, {
    params: { page, search, tag, perPage: 12 }, 
  });
  return data;
}

export async function createNote(newNote: createNoteProps): Promise<Note> {
  const { data } = await nextServer.post<Note>(`/notes`, newNote);
  return data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);
  return data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`);
  return data;
}

export async function register(email: string, password: string): Promise<User> {
  const { data } = await nextServer.post<User>("/auth/register", { email, password });
  return data;
}

export async function login(email: string, password: string): Promise<User> {
  const { data } = await nextServer.post<User>("/auth/login", { email, password });
  return data;
}

export async function logout(): Promise<void> {
  await nextServer.post("/auth/logout");
}

export async function checkSession(): Promise<CheckSessionRequest> {
  const { data } = await nextServer.get<CheckSessionRequest>("/auth/session");
  return data; 
}

export async function getUser(): Promise<User> {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
}

export async function patchUser(payload: { username: string }): Promise<User> {
  const { data } = await nextServer.patch<User>("/users/me", payload);
  return data;
}
