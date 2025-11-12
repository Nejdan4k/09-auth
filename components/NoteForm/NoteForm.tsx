"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, ChangeEvent, FormEvent } from "react";
import { createNote } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import css from "./NoteForm.module.css";

export default function NoteForm() {
  const router = useRouter();
  const qc = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDraft({ [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await mutation.mutateAsync({
        title: draft.title,
        content: draft.content,
        tag: draft.tag,
      });
      clearDraft();        // очистити draft лише після успішного створення
      router.back();       // повернутися на попередню сторінку
    } catch (err) {
      console.error("Failed to create note:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back(); // draft НЕ очищаємо — так вимагає ТЗ
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={draft.title}
          onChange={handleChange}
          className={css.input}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={draft.content}
          onChange={handleChange}
          className={css.textarea}
          rows={6}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
  id="tag"
  name="tag"
  value={draft.tag}
  onChange={handleChange}
  className={css.select}
>
  <option value="Work">Work</option>
  <option value="Personal">Personal</option>
  <option value="Todo">Todo</option>
  <option value="Meeting">Meeting</option>
  <option value="Shopping">Shopping</option>
</select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}