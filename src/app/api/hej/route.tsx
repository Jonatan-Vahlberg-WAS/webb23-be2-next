import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, options: any) {
  const url = new URL(request.url);
  const { searchParams } = url;
  const name = searchParams.get("name");
  console.log("REQUEST -> url -> search -> name", name);
  if (!name) {
    return NextResponse.json(
      {
        message: "Name is required",
      },
      {
        status: 400,
      }
    );
  }
  return NextResponse.json({
    message: `Hej mitt namn är ${name} :)`,
  });
}
