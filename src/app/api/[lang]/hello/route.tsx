import { NextResponse } from "next/server";

export async function GET(request: any, options: APIOptions) {
    const url = new URL(request.url);
    const { searchParams } = url;
    const name = searchParams.get("name");
    const lang = options.params.lang
    let message = "Hello world"
    let status = 200
    if(lang === "sv") {
        message = `Hej mitt namn är ${name}`
    }
    else if(lang === "es") {
        message = "Not Implemented: Spanish support is not available yet."
        status = 501
    }
    return NextResponse.json({ message }, { status })
}