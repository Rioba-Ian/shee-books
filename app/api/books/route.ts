import { NextResponse } from "next/server";
import { string, z, ZodError } from "zod";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    const books = await prisma?.book.findMany({
        include: {
            genres: true,
        },
    });

    return NextResponse.json(books, { status: 200 });
}

export async function POST(request: Request) {
    try {
        const genres = await prisma?.genre.findMany({});

        const genreIds = genres?.map((genre) => genre.id);

        const collections = await prisma.collection.findMany({});

        const collectionIds = collections?.map((collection) => collection.id);

        const addBookSchema = z.object({
            title: z.string().min(1, "Title is required.").max(255),
            description: z.string().min(1, "Description is required.").optional(),
            author: z.string().min(1, "Author is required.").max(255),
            year_pub: z.number().optional(),
            images: z.array(z.string()),
            genreId: z
                .string()
                .uuid()
                .refine((value) => genreIds?.includes(value), "Invalid genre ID."),
            collectionIds: z.array(
                z.object({
                    bookId_collectionId: z.object({
                        bookId: z.string().uuid(),
                        collectionId: z.string().uuid()
                    })
                })
            )
        });

        const body = await request.json();
        const validatedBody = addBookSchema.parse(body);

        const createdBook = await prisma?.book.create({
            data: {
                title: validatedBody.title,
                description: validatedBody.description,
                author: validatedBody.author,
                year_pub: validatedBody.year_pub,
                images: validatedBody.images,
                genreId: validatedBody.genreId,
                collections: {
                    connect: validatedBody.collectionIds
                },
            },
        });

        return NextResponse.json(createdBook, { status: 201 });
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.errors.map((err) => err.message);
            console.log(errorMessages);

            return NextResponse.json({ message: errorMessages }, { status: 400 });
        } else {
            console.log(error);
            return NextResponse.json(
                { message: "Something went wrong." },
                { status: 500 }
            );
        }
    }
}

export async function DELETE(request: Request) {
    const { id } = await request.json();

    if (!id)
        return NextResponse.json({ message: "Id is required" }, { status: 400 });

    const deletedBook = await prisma?.book.delete({
        where: {
            id: id,
        },
    });

    return NextResponse.json({ message: `Book ${id} deleted.` }, { status: 200 });
}
