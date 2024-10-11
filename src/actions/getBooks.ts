"server only";

import { BookWithAuthor } from "@/types/book";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function getBooks(q?: string): Promise<BookWithAuthor[]> {
  const url = new URL(`${BASE_URL}/api/books?with=author${q ? `&q=${q}`: ""}`);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Unable to get books");
    }
    const books: BookWithAuthor[] = await response.json();
    return books;
  } catch (error: any) {
    console.warn("Error fetching books (action)", error.message);
    return [];
  }
}
