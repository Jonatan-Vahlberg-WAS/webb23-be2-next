import { UserRegistrationData } from "@/types/user";
import { PrismaClient, User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();


export async function POST(request:NextRequest) {
    try {
        const body: UserRegistrationData = await request.json()
        //TODO validate fields
        const user: User = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        })
        return NextResponse.json(user, { status: 201 })
    } catch (error: any) {
        return NextResponse.json(
            {
              message: "A valid 'user registration' object has to be sent",
            },
            {
              status: 400,
            }
          );
    }
    return NextResponse.json({
        message: "Unimplemented"
    }, { status: 501})
}