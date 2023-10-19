import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id

    const genre = await prisma?.genre.findUnique({
        where: {
            id
        }
    })

    if (!genre) return NextResponse.json({ message: 'Genre not found' }, { status: 404 })

    return NextResponse.json(genre, { status: 200 })
}