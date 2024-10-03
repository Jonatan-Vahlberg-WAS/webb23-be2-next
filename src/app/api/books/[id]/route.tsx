import { NextResponse, NextRequest } from "next/server";

import books from "@/data/books.json";

export async function GET(request: NextRequest, options: APIOptions) {
  const id = options.params.id;
  const localBooks: Book[] = [...books];
  const book = localBooks.find((book) => book.id === Number(id));

  if (!book) {
    return NextResponse.json(
      {
        message: "Book not found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(book);
}

//! PUT
//TODO: Get book if it exsits
//TODO: validate incoming data
//TODO: update the book
//TODO: Return updated book
