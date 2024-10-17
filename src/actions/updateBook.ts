"use server";

import { BookData } from "@/types/book";
import { Book } from "@prisma/client";
import { revalidateTag } from "next/cache";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function updateBook(id: string, bookData: BookData ,token: string) {
  const url = new URL(`${BASE_URL}/api/books/${id}`);

  try {
    const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(bookData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
      throw new Error("Unable to update book");
    }
    const data: Book = await response.json();
    revalidateTag("getBooks");
    revalidateTag(`getBook-${id}`);
    return data;
  } catch (error: any) {
    console.warn("Error updating book (action)", error)
    return null;
  }
}
