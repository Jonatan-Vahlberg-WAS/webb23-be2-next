"server only";

import { Author } from "@prisma/client";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function getAuthors(): Promise<Author[]> {
  const url = new URL(`${BASE_URL}/api/authors`);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Unable to get authors");
    }
    const authors: Author[] = await response.json();
    return authors;
  } catch (error: any) {
    console.warn("Error fetching authors (action)", error.message);
    return [];
  }
}
