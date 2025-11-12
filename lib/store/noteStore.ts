import { create } from "zustand";
import { persist } from "zustand/middleware";

type NoteTag = "Work" | "Personal" | "Todo" | "Meeting" | "Shopping";

interface Draft {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteStore {
  draft: Draft;
  setDraft: (note: Partial<Draft>) => void;
  clearDraft: () => void;
}

const initialDraft: Draft = {
  title: "",
  content: "",
  tag: "Todo", // виправлено: було "Work"
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({ draft: { ...state.draft, ...note } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft-storage",
      partialize: (state) => ({ draft: state.draft }), //  зберігається лише draft
    }
  )
);