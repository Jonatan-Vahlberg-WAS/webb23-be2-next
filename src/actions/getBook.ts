"server only";

import { BookWithAuthor } from "@/types/book";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";


export async function getBook(id: string): Promise<BookWithAuthor | null> {
  const url = new URL(`${BASE_URL}/api/books/${id}`);
  try {
    const response = await fetch(url, {
      next: {
        tags: [`getBook-${id}`],
      }
    });

    if (!response.ok) {
      throw new Error("Unable to get book");
    }
    const book: BookWithAuthor = await response.json();
    return book;
  } catch (error: any) {
    console.warn("Error fetching book (action)", error.message);
    return null;
  }
}
