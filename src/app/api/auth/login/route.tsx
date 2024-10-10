import { UserLoginData } from "@/types/user";
import { userLoginValidator } from "@/utils/validators/userValidator";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body: UserLoginData = await request.json();
    const [hasErrors, errors] = userLoginValidator(body);
    if (hasErrors) {
      return NextResponse.json(
        {
          errors,
        },
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: body.email.toLowerCase()
      },
    });

    const passwordIsSame = body.password === user.password;
    if (!passwordIsSame) {
      throw new Error("Password missmatch");
    }

    return NextResponse.json({
      user,
    });
  } catch (error: any) {
    console.log("Error: failed to login", error.message);
    return NextResponse.json(
      {
        message: "user matching credentials not found",
      },
      { status: 400 }
    );
  }
}
