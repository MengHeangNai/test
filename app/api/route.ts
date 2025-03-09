import { NextResponse, NextRequest } from "next/server"

export const GET = () => {
    return NextResponse.json({ message: "Hello World" })
}

export const POST = async (req: NextRequest) => {
    const body = await req.json()
    return NextResponse.json({ message: `Hello ${body.name}` })
}

export const PUT = async (req: NextRequest) => {
    const body = await req.json()
    return NextResponse.json({ message: `Hello ${body.name}` })
}

export const DELETE = async (req: NextRequest) => {
    const body = await req.json()
    return NextResponse.json({ message: `Hello ${body.name}` })
}

