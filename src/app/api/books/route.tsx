import { NextResponse, NextRequest } from "next/server";

import books from "@/data/books.json";
import bookValidator from "@/utils/validators/bookValidator";

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
    const body: NewBookData = await request.json();
    let [hasErrors, errors] = bookValidator(body)
    if(hasErrors) {
      return NextResponse.json({
        errors,
      }, { status: 400 })
    }
    const book: NewBook = { //! SIMULATED DB CALL
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
