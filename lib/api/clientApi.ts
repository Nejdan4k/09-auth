import { api } from './api'
import type { Note, NoteTag } from '@/types/note'
import { User } from '@/types/user'

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

export async function fetchNotes(params: FetchNotesParams = {}): Promise<FetchNotesResponse> {
  const res = await api.get<FetchNotesResponse>('/notes', { params: buildQueryParams(params) })
  return res.data
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await api.get<Note>(`/notes/${id}`)
  return res.data
}

export async function createNote(data: CreateNoteData): Promise<Note> {
  const res = await api.post<Note>('/notes', data)
  return res.data
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await api.delete<Note>(`/notes/${id}`)
  return res.data
}

interface RegisterData { email: string; password: string }
interface LoginData { email: string; password: string }
interface UpdateUsernameData { username: string }

export async function registerUser(data: RegisterData) {
  const res = await api.post('/auth/register', data)
  return res.data
}

export async function loginUser(data: LoginData) {
  const res = await api.post('/auth/login', data)
  return res.data
}

export async function getMe(): Promise<User> {
  try {
    const res = await api.get<User>('/users/me')
    return res.data
  } catch {
    throw new Error('User is not authenticated')
  }
}

export async function getSession(): Promise<User> {
  return getMe()
}

export async function updateUsername(data: UpdateUsernameData) {
  const res = await api.patch('/users/me', data)
  return res.data
}

export async function logoutUser() {
  try {
    await api.post('/auth/logout', {})
    return true
  } catch {
    return false
  }
}
