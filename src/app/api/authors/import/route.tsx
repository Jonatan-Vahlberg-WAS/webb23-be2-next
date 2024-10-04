import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const authors: AuthorData[] = await request.json();
    const storedAuthors = await prisma.author.findMany();
    const distinctAuthors = authors.filter((a1) => {
      return storedAuthors.every(
        (a2) =>
          a1.firstName !== a2.firstName &&
          a1.lastName !== a2.lastName &&
          a1.dateOfBirth !== a2.dateOfBirth
      );
    });
    if(distinctAuthors.length === 0) {
        return NextResponse.json({
            count: 0
        })
    }
    const response = await prisma.author.createMany({
      data: distinctAuthors.map(author => ({
        firstName: author.firstName,
        lastName: author.lastName,
        dateOfBirth: author.dateOfBirth
      })),
    });

    return NextResponse.json(response);
  } catch (error: any) {
    console.warn("Error importing authors", error);
    return NextResponse.json(
      {
        message: "Error importing authors",
      },
      {
        status: 400,
      }
    );
  }
}
