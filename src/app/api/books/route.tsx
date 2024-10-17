import { NextRequest, NextResponse } from "next/server";

import { getQueries } from "@/helpers/apiHelpers";
import { PrismaClient } from "@prisma/client";
import { BookData } from "@/types/book";
import bookValidator from "@/utils/validators/bookValidator";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  //search query filter
  const [q, _with, author, _orderBy, category] = getQueries(request.url, [
    "q",
    "with",
    "author",
    "orderBy",
    "category"
  ]);

  const withAuthor = _with === "author";
  const include = withAuthor ? { include: { author: true } } : {};

  let where: { [key: string]: any } = {};
  let orderBy: { [key: string]: any } = {};

  if (q) {
    where.title = {
      contains: q,
      mode: "insensitive",
    };
  }

  if(category) {
    where.categories = {
      has: category
    }
  }

  if (author) {
    where.authorId = author;
  }

  if (_orderBy) {
    orderBy.title = _orderBy;
  }

  //@ts-ignore
  const books = await prisma.book.findMany({
    where,
    orderBy,
    ...include,
  });
  return NextResponse.json(books);
}

export async function POST(request: NextRequest) {
  try {
    await prisma.book.deleteMany({});
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
    const book = await prisma.book.create({
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
