import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/utils/jwt";

const UNSAFE_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE', 'GET'];

export async function middleware(request: NextRequest) {
    console.log('middleware called');
    if (UNSAFE_METHODS.includes(request.method)) {
        const authorization = request.headers.get('Authorization');
        if (!authorization) {
            return NextResponse.json({
                message: 'Unauthorized'
            }, {
                status: 401
            });
        }

        try {
            const token = authorization.replace('Bearer ', '');
            const payload = await verifyJWT(token);
            if(payload == null) {
                throw new Error('Invalid token');
            }
            const headers = new Headers(request.headers);
            headers.set('userId', payload.userId);

            return NextResponse.next({
                headers: headers
            });

        } catch (e) {
            return NextResponse.json({
                message: 'Unauthorized'
            }, {
                status: 401
            });
        }
    }

    return NextResponse.next();

}

export const config = {
    matcher: [
        '/api/authors/',
        '/api/authors',
    ],
};