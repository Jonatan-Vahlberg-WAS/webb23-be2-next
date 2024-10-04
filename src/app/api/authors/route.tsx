import { NextRequest, NextResponse } from "next/server";

import authors from "@/data/authors.json";

import { getQueries, lowercaseCompare } from "@/helpers/apiHelpers";
import authorValidator from "@/utils/validators/authorValidator";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient

export async function GET(request: NextRequest) {
  const [q] = getQueries(request.url, ["q"]);
  let filteredAuthors = [...authors]; //! DB call

  const _authors = await prismaClient.author.findMany()
  console.log("authors from db", _authors)

  if (q) {
    filteredAuthors = filteredAuthors.filter((author) =>
      lowercaseCompare(`${author.firstName} ${author.lastName}`, q)
    );
  }

  return NextResponse.json(filteredAuthors);
}

export async function POST(request: NextRequest) {
  try {
    const body: AuthorData = await request.json();
    const [hasErrors, errors] = authorValidator(body);
    if (hasErrors) {
      return NextResponse.json(
        {
          errors,
        },
        { status: 400 }
      );
    }
    const _newAuthor = await prismaClient.author.create({
      data: body
    })
    console.log("new author", _newAuthor)
    const author: Author = {
      ...body,
      id: 1,
    };
    return NextResponse.json(author);
  } catch (error: any) {
    console.warn("Error creating author", error);
    return NextResponse.json(
      {
        message: "A valid 'AuthorData' object has to be sent",
      },
      {
        status: 400,
      }
    );
  }
}
