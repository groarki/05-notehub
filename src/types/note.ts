export interface Note {
    id: number,
    title: string,
    content: string,
    createdAt: string,    
    updatedAt: string,
    tag: Tags,
}

export interface createNoteValues {
    title: string
    content: string
    tag: Tags
}

export type Tags = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo"