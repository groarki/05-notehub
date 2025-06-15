import axios from "axios";
import type { Note, createNoteValues } from "../types/note";

interface fetchNotes {
    notes: Note[],
    totalPages: number,
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api"
const token = import.meta.env.VITE_TOKEN

export async function fetchNotes(page: number, perPage: number, searchQuery: string) {
    const res = await axios.get<fetchNotes>("/notes", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page,
            perPage,
            ...(searchQuery && { search: searchQuery }),
        }
    }) 
    return res.data
}

export async function createNote(newTodo: createNoteValues) {
    const res = await axios.post<Note>("/notes", newTodo, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export async function deleteNote(id: number) {
    const res = await axios.delete<Note>(`/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
   return res.data
}