import { NextResponse, NextRequest } from "next/server";

const books: Book[] = [
    {
      author: "George Orwell",
      title: "1984",
      id: 1
    },
    {
      author: "Harper Lee",
      title: "To Kill a Mockingbird",
      id: 2
    },
    {
      author: "J.R.R. Tolkien",
      title: "The Lord of the Rings",
      id: 3
    }
  ];

  //TODO: get all above books
  //TODO: 2 accept 'q' query to filter books on title and author part of string

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
