"use server";

import { redirect } from "next/navigation"

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function createBook(formData: FormData): Promise<void> {
  const url = new URL(`${BASE_URL}/api/books`);

  const bookData = {
    title: formData.get("title"),
    authorId: formData.get("authorId")
  }

  formData.forEach(value => (
    console.log(value.toString())
  ))

  try {
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(bookData)
    });

    if (!response.ok) {
      throw new Error("Unable to create book");
    }
    
    return
  } catch (error: any) {
    console.warn("Error creating book (action)", error)
    return
  }
}
