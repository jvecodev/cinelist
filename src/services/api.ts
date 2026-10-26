import axios from 'axios';

// TVMaze: API publica, sem chave. Docs: https://www.tvmaze.com/api
export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? 'https://api.tvmaze.com',
  timeout: 15000,
});