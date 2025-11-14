import axios, { type AxiosError } from 'axios';

export const api = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
});

// 👇 ТУТ ОНОВЛЮЄМО ТИП
export type ApiError = AxiosError<{ error?: string }>;
