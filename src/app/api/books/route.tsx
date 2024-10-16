import { NextRequest, NextResponse } from "next/server";

import { getQueries } from "@/helpers/apiHelpers";
import { PrismaClient } from "@prisma/client";
import { BookData } from "@/types/book";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  //search query filter
  const [q, _with] = getQueries(request.url, ["q", "with"]);
  const withAuthor = _with === "author";
  const include = withAuthor ? { include: { author: true } } : {};

  if (q) {
    //@ts-ignore
    const books = await prisma.book.findMany({
      where: {
        title: {
          contains: q,
          mode: "insensitive",
        },
      },
      ...include,
    });
    return NextResponse.json(books);
  }
  
  //@ts-ignore
  const books = await prisma.book.findMany({
    ...include,
  });
  return NextResponse.json(books);
}

export async function POST(request: NextRequest) {
  try {
    const body: BookData = await request.json();
    let [hasErrors, errors] = [false, {}]; // bookValidator(body);
    if (hasErrors) {
      return NextResponse.json(
        {
          errors,
        },
        { status: 400 }
      );
    }
    const book = await prisma.book.create({
      data: {
        title: body.title,
        authorId: body.authorId,
      },
      include: {
        author: true,
      },
    });
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
