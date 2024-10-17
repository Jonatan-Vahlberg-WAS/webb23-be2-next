import { BookData } from "@/types/book";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const books: BookData[] = await request.json();
    const storedBooks = await prisma.book.findMany();
    const distinctBooks = books.filter((a1) => {
      return storedBooks.every(
        (a2) => a1.title !== a2.title && a1.authorId !== a2.authorId
      );
    });
    if (distinctBooks.length === 0) {
      return NextResponse.json({
        count: 0,
      });
    }
    const response = await prisma.book.createMany({
      data: distinctBooks.map((book) => ({
        title: book.title,
        authorId: book.authorId,
        cover: book.cover,
        categories: book.categories
      })),
    });

    return NextResponse.json(response);
  } catch (error: any) {
    console.warn("Error importing books", error);
    return NextResponse.json(
      {
        message: "Error importing books",
      },
      {
        status: 400,
      }
    );
  }
}
