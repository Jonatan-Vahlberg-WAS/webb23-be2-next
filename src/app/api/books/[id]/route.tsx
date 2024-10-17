import { NextRequest, NextResponse } from "next/server";


import bookValidator from "@/utils/validators/bookValidator";
import { Book, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, options: APIOptions) {
  const id = options.params.id;

  try {
    const book: Book | null = await prisma.book.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });

    if (!book) {
      throw new Error("Book not found");
    }
    return NextResponse.json(book);
  } catch (error: any) {
    console.warn("Error getting book: ", error.message);

    return NextResponse.json(
      {
        message: "Book not found",
      },
      { status: 404 }
    );
  }
}


export async function PUT(request: NextRequest, options: APIOptions) {
  const id = options.params.id;
  let body: Book | null = null;
  try {
    body = await request.json();
    if (!body) {
      throw new Error();
    }
    const [hasErrors, errors] = bookValidator(body, id);
    if (hasErrors) {
      return NextResponse.json(
        {
          errors,
        },
        { status: 400 }
      );
    }
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

  try {
    const updatedBook = await prisma.book.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        authorId: body.authorId,
        cover: body.cover,
        categories: body.categories,
      },
      include: {
        author: true,
      },
    });
    return NextResponse.json(updatedBook);
  } catch (error: any) {
    console.error("Error updating book 2", error);
    return NextResponse.json(
      {
        message: "Book not found",
      },
      { status: 404 }
    );
  }
}
export async function DELETE(request: NextRequest, options: APIOptions) {
  const id = options.params.id;
  try {
    await prisma.book.delete({
      where: {
        id,
      },
    });
    return new Response(null, { status: 204 });
  } catch (error: any) {
    console.warn("error deleting book", error.message);
    return NextResponse.json(
      {
        message: "Book not found",
      },
      { status: 404 }
    );
  }
}
