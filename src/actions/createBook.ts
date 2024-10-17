"use server";

import { BookData } from "@/types/book";
import { Book } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function createBook(bookData: BookData ,token: string) {
  const url = new URL(`${BASE_URL}/api/books`);

  try {
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
      throw new Error("Unable to create book");
    }
    const data: Book = await response.json();
    revalidateTag("getBooks"); // revalidate the getBooks cache so booklist is updated
    return data;
  } catch (error: any) {
    console.warn("Error creating book (action)", error)
    return null;
  }
}
