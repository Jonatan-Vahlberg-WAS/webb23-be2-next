import * as Jose from 'jose';


type JWTPayload = {
    userId: string;
    [key: string]: any;
}

// Ensure the environment variable is available
const secret = process.env.JWT_SECRET;
if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set");
}

// Convert the secret into a Uint8Array
const encodedSecret = new TextEncoder().encode(secret);

export async function signJWT(payload: JWTPayload): Promise<string> {
    const response = await new Jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1y')
        .sign(encodedSecret);

    return response;
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await Jose.jwtVerify(token, encodedSecret);
        return payload as JWTPayload;
    } catch (e) {
        return null;
    }
}
