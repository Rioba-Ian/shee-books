import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const createGenreSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255),
})

export async function GET(request: Request) {
    const genres = await prisma?.genre.findMany()

    return NextResponse.json(genres, { status: 200 })
}

export async function POST(request: Request) {
    const body = await request.json()
    const validatedBody = createGenreSchema.parse(body)

    const createdGenre = await prisma?.genre.create({
        data: validatedBody
    })

    return NextResponse.json(createdGenre, { status: 201 })
}


export async function DELETE(request: Request) {
    const { id } = await request.json()

    if (!id) return NextResponse.json({ message: 'Id is required' }, { status: 400 })

    const deletedGenre = await prisma?.genre.delete({
        where: {
            id: id
        }
    })

    return NextResponse.json({ message: `Genre ${id} deleted` }, { status: 200 })
}

export async function PUT(request: Request) {
    const { id, title } = await request.json()

    if (!id || !title) return NextResponse.json({ message: 'Id and title are required' }, { status: 400 })

    const udpatedGenre = await prisma?.genre.update({
        where: {
            id: id
        },
        data: {
            title: title
        }
    })

    return NextResponse.json(udpatedGenre, { status: 200 })
}