import { NextResponse } from "next/server"
import { z, ZodError } from "zod"
import prisma from "@/lib/prisma"





export async function GET(request: Request) {
    const books = await prisma?.book.findMany({
        include: {
            author: true,
            genres: true
        }
    })

    return NextResponse.json(books, { status: 200 })
}

export async function POST(request: Request) {
    try {
        const genres = await prisma?.genre.findMany({})

        const genreIds = genres?.map(genre => genre.id)

        const addBookSchema = z.object({
            title: z.string().min(1, 'Title is required.').max(255),
            description: z.string().min(1, 'Description is required.').optional(),
            isbn: z.number().max(9999999999, 'ISBN must be less than or equal to 9999999999.').optional(),
            year_pub: z.number().optional(),
            images: z.array(
                z.string()
            ),
            authorId: z.string().uuid(),
            genreId: z.string().uuid().refine((value) => genreIds?.includes(value), 'Invalid genre ID.'),
        })


        const body = await request.json()
        const validatedBody = addBookSchema.parse(body)


        const createdBook = await prisma?.book.create({
            data: {
                title: validatedBody.title,
                description: validatedBody.description,
                isbn: validatedBody.isbn,
                year_pub: validatedBody.year_pub,
                images: validatedBody.images,
                authorId: validatedBody.authorId,
                genreId: validatedBody.genreId
            }
        })

        return NextResponse.json(createdBook, { status: 201 })

    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.errors.map(err => err.message)
            console.log(errorMessages);

            return NextResponse.json({ message: errorMessages }, { status: 400 })
        } else {
            console.log(error);
            return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 })
        }

    }

}

export async function DELETE(request: Request) {
    const { id } = await request.json()

    if (!id) return NextResponse.json({ message: 'Id is required' }, { status: 400 })

    const deletedBook = await prisma?.book.delete({
        where: {
            id: id
        }
    })

    return NextResponse.json({ message: `Book ${id} deleted.` }, { status: 200 })
}