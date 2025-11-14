import css from './CreateNote.module.css';
import CreateNoteClient from './CreateNote.client';

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <CreateNoteClient /> {/* 👈 тут раніше був <NoteForm /> */}
      </div>
    </main>
  );
}
