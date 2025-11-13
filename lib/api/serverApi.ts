import { User } from "@/types/user";
import { nextServer } from "./api";
import { cookies } from "next/headers";
import { CheckSessionRequest, FetchNotesResponse } from "./clientApi";
import { Note } from "@/types/note";

export interface FetchParams{
    params: {
        tag?:string
        page?: number,
        search?: string,
        perPage: number,
    }
    headers?: { Cookie:string }
}

export const checkSession = async () => {
    const cookieStore = await cookies()
    const checkSessionRep = await nextServer.get<CheckSessionRequest>('/auth/session', {
        headers: {
            Cookie: cookieStore.toString()
        }
    });
    
  return checkSessionRep;
};

export async function getUser(): Promise<User>{
    const cookieStore = await cookies()
    const getUserRep = await nextServer.get<User>('/users/me', {
        headers: {
            Cookie:cookieStore.toString()
        }
    })

    return getUserRep.data;
}

export async function fetchNotes(page?: number, keyWord?: string, tag?: string): Promise<FetchNotesResponse>{
const cookieStore = await cookies()
 tag = tag === "All" ? undefined : tag;

const fetchParams:FetchParams = {
    params: {
    tag:tag,
    page: page,
    search: keyWord,
    perPage: 12, 
    },
    headers: {
        Cookie:cookieStore.toString()
    }
}

const fetchResponse = await nextServer.get<FetchNotesResponse>('/notes', fetchParams)
return fetchResponse.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
    const cookieStore = await cookies()
    const fetchNoteByIdResponse = await nextServer.get<Note>(`/notes/${id}`, {
        headers: {
            Cookie:cookieStore.toString()
        }
    })

    return fetchNoteByIdResponse.data;
}