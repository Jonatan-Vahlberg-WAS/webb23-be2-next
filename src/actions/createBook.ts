"use server";

import { BookData } from "@/types/book";
import { Book } from "@prisma/client";
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
    
    return await response.json() as Book;
  } catch (error: any) {
    console.warn("Error creating book (action)", error)
    return null;
  }
}
