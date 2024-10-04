import { NextRequest, NextResponse } from "next/server";

import { getQueries } from "@/helpers/apiHelpers";
import authorValidator from "@/utils/validators/authorValidator";
import { Author, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
  result: {
    author: {
      fullName: {
        needs: { firstName: true, lastName: true},
        compute(author){
          return `${author.firstName} ${author.lastName}`
        }
      }
    }
  }
})

export async function GET(request: NextRequest) {
  const [q] = getQueries(request.url, ["q"]);

  let authors: Author[] = []
  if (q) {
     authors = await prisma.author.findMany({
      where: {
        firstName: {
          contains: q,
          mode: "insensitive"
        }
     }
  })
  }
  else {
    authors = await prisma.author.findMany();
  }

  return NextResponse.json(authors);
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
    const newAuthor = await prisma.author.create({
      data: body
    })

    return NextResponse.json(newAuthor);
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
