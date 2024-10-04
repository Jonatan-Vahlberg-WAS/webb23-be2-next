import { NextResponse, NextRequest } from "next/server";

import authorValidator from "@/utils/validators/authorValidator";
import { Author, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, options: APIOptions) {
  const id = options.params.id;

  const author: Author | null = await prisma.author.findUnique({
    where: {
      id: id,
    },
    include: {
      books: true
    }
  });

  if (!author) {
    return NextResponse.json(
      {
        message: "Author not found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(author);
}

export async function PUT(request: NextRequest, options: APIOptions) {
  const id = options.params.id;
  let body: Author | null = null;
  try {
    body = await request.json();
    if (!body) {
      throw new Error();
    }
    const [hasErrors, errors] = authorValidator(body, id);
    if (hasErrors) {
      return NextResponse.json(
        {
          errors,
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.warn("Error updating author: ", error.message);

    return NextResponse.json(
      {
        message: "A valid 'Author' object has to be sent",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const updatedAuthor = await prisma.author.update({
      where: {
        id,
      },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        dateOfBirth: body.dateOfBirth,
      },
    });
    return NextResponse.json(updatedAuthor);
  } catch (error: any) {
    console.error("Error updating author", error.message);
    NextResponse.json(
      {
        message: "Author not found",
      },
      { status: 404 }
    );
  }
}

export async function DELETE(request: NextRequest, options: APIOptions) {
  const id = options.params.id;
  try {
    await prisma.author.delete({
      where: {
        id,
      },
    });
    return new Response(null, { status: 204 });
  } catch (error: any) {
    console.log("error deleting author", error.message);
    return NextResponse.json(
      {
        message: "Author not found",
      },
      { status: 404 }
    );
  }
}
