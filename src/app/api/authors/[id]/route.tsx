import { NextResponse, NextRequest } from "next/server";

import authors from "@/data/authors.json";

import authorValidator from "@/utils/validators/authorValidator";

export async function GET(request: NextRequest, options: APIOptions) {
  const id = options.params.id;
  const localAuthors: Author[] = [...authors];
  const author = localAuthors.find((author) => author.id === Number(id)); //! SIMULATED DB CALL

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
  const localAuthors: Author[] = [...authors];
  const authorIndex = localAuthors.findIndex(
    (author) => author.id === Number(id)
  ); //! SIMULATED DB CALL

  if (authorIndex === -1) {
    return NextResponse.json(
      {
        message: "Author not found",
      },
      { status: 404 }
    );
  }

  // Validate data
  try {
    const body: Author = await request.json();
    const [hasErrors, errors] = authorValidator(body, Number(id));
    if (hasErrors) {
      return NextResponse.json(
        {
          errors,
        },
        { status: 400 }
      );
    }
    const updatedAuthor: Author = {
      ...localAuthors[authorIndex],
      ...body,
    };
    return NextResponse.json(updatedAuthor);
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
}

export async function DELETE(request: NextRequest, options: APIOptions) {
  const id = options.params.id;
  const localAuthors: Author[] = [...authors];
  const authorIndex = localAuthors.findIndex(
    (author) => author.id === Number(id)
  ); //! SIMULATED DB CALL

  if (authorIndex === -1) {
    return NextResponse.json(
      {
        message: "Author not found",
      },
      { status: 404 }
    );
  }
  localAuthors.splice(authorIndex, 1);

  return new Response(null, { status: 204 });
}
