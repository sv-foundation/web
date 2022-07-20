const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
export const API = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || '';

export type Tag = {
  name: string;
  slug: string
};
