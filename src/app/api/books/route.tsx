import { NextResponse, NextRequest } from "next/server";

import books from "@/data/books.json";
import authors from "@/data/authors.json";
import bookValidator from "@/utils/validators/bookValidator";
import { includeAuthor } from "@/helpers/bookHelpers";

function lowercaseCompare(str: String = "", match: string) {
  return str.toLowerCase().includes(match.toLowerCase());
}

export async function GET(request: NextRequest) {
  let filteredBooks: (Book | BookWithAuthor)[] = [...books]; //! SIMULATED DB CALL

  //search query filter
  const searchParams = new URL(request.url).searchParams;
  const q = searchParams.get("q");
  const withAuthor = searchParams.get("with") === "author"

  if(withAuthor) {
    filteredBooks = filteredBooks.map(book => {
      return includeAuthor(book, authors)
    })
  }

  if (q) {
    filteredBooks = filteredBooks.filter(
      (book) => {
        let matches = (
          lowercaseCompare(book.title, q) ||
          lowercaseCompare(book.summary, q)
        )
        if(!matches && withAuthor && typeof book.author !== "number"){
          const authorName = `${book.author.firstName} ${book.author.lastName}`
          matches = lowercaseCompare(authorName, q)
        }
        return matches
      }
    );
  }

  return NextResponse.json(filteredBooks);
}

export async function POST(request: NextRequest) {
  try {
    const body: BookData = await request.json();
    let [hasErrors, errors] = bookValidator(body);
    if (hasErrors) {
      return NextResponse.json(
        {
          errors,
        },
        { status: 400 }
      );
    }
    const book: Book = {
      //! SIMULATED DB CALL
      ...body,
      id: 1,
    };
    return NextResponse.json(book, { status: 201 });
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
