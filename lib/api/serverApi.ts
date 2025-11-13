import { api } from './api'
import type { Note, NoteTag } from '@/types/note'
import { User } from '@/types/user'
import { cookies } from 'next/headers'
import type { AxiosResponse } from 'axios'

export interface FetchNotesParams {
  page?: number
  perPage?: number
  search?: string
  tag?: NoteTag
}

export interface FetchNotesResponse {
  notes: Note[]
  totalPages: number
}

export interface CreateNoteData {
  title: string
  content: string
  tag: NoteTag
}

function buildQueryParams(params: FetchNotesParams) {
  const page = params.page ?? 1
  const perPage = params.perPage ?? 12
  const queryParams: Record<string, unknown> = { page, perPage }
  if (params.search) queryParams.search = params.search
  if (params.tag) queryParams.tag = params.tag
  return queryParams
}

function getCookieHeader() {
  return cookies().toString()
}

export async function fetchNotesServer(params: FetchNotesParams = {}): Promise<FetchNotesResponse> {
  const res = await api.get<FetchNotesResponse>('/notes', {
    headers: { Cookie: getCookieHeader() },
    params: buildQueryParams(params),
  })
  return res.data
}

export async function fetchNoteByIdServer(id: string): Promise<Note> {
  const res = await api.get<Note>(`/notes/${id}`, { headers: { Cookie: getCookieHeader() } })
  return res.data
}

export async function createNoteServer(data: CreateNoteData): Promise<Note> {
  const res = await api.post<Note>('/notes', data, { headers: { Cookie: getCookieHeader() } })
  return res.data
}

export async function deleteNoteServer(id: string): Promise<Note> {
  const res = await api.delete<Note>(`/notes/${id}`, { headers: { Cookie: getCookieHeader() } })
  return res.data
}

export async function getServerMe(): Promise<User> {
  const res = await api.get<User>('/users/me', { headers: { Cookie: getCookieHeader() } })
  return res.data
}
export const getServerSession = async (): Promise<AxiosResponse> => {
  const cookieStore = cookies()
  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  })
  return res
}