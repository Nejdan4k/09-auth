import axios, { AxiosInstance } from 'axios';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://notehub-public.goit.study/api';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});