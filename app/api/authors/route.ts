import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const createAuthorSchema = z.object({
    first_name: z.string().min(1, 'Name is required.').max(255),
    last_name: z.string().min(1, 'Last Name is required.').max(255)
})

export async function GET(request: Request) {
    const authors = await prisma?.author.findMany({
        include: {
            books: true
        }
    })
    return NextResponse.json(authors, { status: 200 })
}


export async function POST(request: Request) {
    const body = await request.json()
    const author = createAuthorSchema.parse(body)

    const newAuthor = await prisma?.author.create({
        data: {
            first_name: author.first_name,
            last_name: author.last_name
        }
    })

    return NextResponse.json(newAuthor, { status: 201 })
}

export async function DELETE(request: Request) {
    const { id } = await request.json()

    if (!id) return NextResponse.json({ message: 'Id is required' }, { status: 400 })

    const deletedAuthor = await prisma?.author.delete({
        where: {
            id: id
        }
    })

    return NextResponse.json({ message: `Author ${id} deleted.` }, { status: 200 })
}

export async function PUT(request: Request) {
    const { id, first_name, last_name } = await request.json()

    if (!id) return NextResponse.json({ message: 'Id is required' }, { status: 400 })

    const updatedAuthor = await prisma?.author.update({
        where: {
            id: id
        },
        data: {
            first_name: first_name,
            last_name: last_name
        }
    })

    return NextResponse.json(updatedAuthor, { status: 200 })
}