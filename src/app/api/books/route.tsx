import { NextResponse, NextRequest } from "next/server";

import books from "@/data/books.json";

function lowercaseCompare(str: String = "", match: string) {
  return str.toLowerCase().includes(match.toLowerCase())
}

export async function GET(request: NextRequest) {
  let filteredBooks: NewBook[] = [...books] //! SIMULATED DB CALL

  //search query filter
  const searchParams = new URL(request.url).searchParams;
  const q = searchParams.get("q")

  if(q) {
    console.log("q -> ", q)
    filteredBooks = filteredBooks.filter(book => (
      lowercaseCompare(book.title, q) ||
      lowercaseCompare(book.author, q) ||
      lowercaseCompare(book.summary, q)
    ))
  }

  
  return NextResponse.json(filteredBooks)
}

export async function POST(request: NextRequest) {
  try {
    const body: BookData = await request.json();
    const book: Book = { //! SIMULATED DB CALL
      ...body,
      id: 1,
    };
    return NextResponse.json(book);
  } catch (error: any) {
    console.warn("Error creating book: ", error.message);
    return NextResponse.json(
      {
        message: "A valid 'BookData' object has to be sent",
      },
      {
        status: 400,
      }
    );
  }
}
