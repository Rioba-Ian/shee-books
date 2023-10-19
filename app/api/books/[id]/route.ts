import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id

    const book = await prisma?.book.findUnique({
        where: {
            id
        },
        include: {
            genres: true
        }
    })

    if (!book) return NextResponse.json({ message: 'Book not found' }, { status: 404 })

    return NextResponse.json(book, { status: 200 })
}