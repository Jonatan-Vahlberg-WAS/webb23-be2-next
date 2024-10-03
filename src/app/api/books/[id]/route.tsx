import { NextResponse, NextRequest } from "next/server";

import books from "@/data/books.json";
import authors from "@/data/authors.json";

import bookValidator from "@/utils/validators/bookValidator";
import { includeAuthor } from "@/helpers/bookHelpers";

export async function GET(request: NextRequest, options: APIOptions) {
  const id = options.params.id;
  const localBooks: Book[] = [...books];
  const book = localBooks.find((book) => book.id === Number(id)); //! SIMULATED DB CALL

  if (!book) {
    return NextResponse.json(
      {
        message: "Book not found",
      },
      { status: 404 }
    );
  }

  const bookWithAuthor = includeAuthor(book, authors)

  return NextResponse.json(bookWithAuthor);
}

export async function PUT(request: NextRequest, options: APIOptions) {
  const id = options.params.id;
  const localBooks: Book[] = [...books];
  const bookIndex = localBooks.findIndex((book) => book.id === Number(id)); //! SIMULATED DB CALL

  if (bookIndex === -1) {
    return NextResponse.json(
      {
        message: "Book not found",
      },
      { status: 404 }
    );
  }

  // Validate data
  try {
    const body: Book = await request.json();
    const [hasErrors, errors] = bookValidator(body, Number(id));
    if (hasErrors) {
      return NextResponse.json(
        {
          errors,
        },
        { status: 400 }
      );
    }
    const updatedBook: Book = {
      ...localBooks[bookIndex],
      ...body,
    };
    const updatedBookWithAuthor = includeAuthor(updatedBook, authors)
    return NextResponse.json(updatedBookWithAuthor);
  } catch (error: any) {
    console.warn("Error updating book: ", error.message);

    return NextResponse.json(
      {
        message: "A valid 'Book' object has to be sent",
      },
      {
        status: 400,
      }
    );
  }
}

export async function DELETE(request: NextRequest, options: APIOptions) {
  const id = options.params.id;
  const localBooks: Book[] = [...books];
  const bookIndex = localBooks.findIndex((book) => book.id === Number(id)); //! SIMULATED DB CALL

  if (bookIndex === -1) {
    return NextResponse.json(
      {
        message: "Book not found",
      },
      { status: 404 }
    );
  }
  localBooks.splice(bookIndex, 1);

  return new Response(null, { status: 204 });
}
