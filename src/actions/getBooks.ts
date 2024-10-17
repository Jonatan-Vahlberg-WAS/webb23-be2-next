"server only";

import { BookWithAuthor } from "@/types/book";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

type Queries = {
  q?: string;
  category?: string;
  [key: string]: string | undefined;
};

export async function getBooks(queries: Queries): Promise<BookWithAuthor[]> {
  const url = new URL(`${BASE_URL}/api/books?with=author`);
  Object.keys(queries).forEach((key) => {
    if (queries[key]) {
      url.searchParams.append(key, queries[key] as string);
    }
  });
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
