import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id

    const author = await prisma?.author.findUnique({
        where: {
            id
        },
        include: {
            books: true
        }
    })

    if (!author) return NextResponse.json({ message: 'Author not found' }, { status: 404 })

    return NextResponse.json(author, { status: 200 })
}