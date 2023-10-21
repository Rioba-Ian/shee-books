import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z, ZodError } from "zod";

export async function GET(request: Request) {
    const collections = await prisma?.collection.findMany({
        include: {
            books: true,
        },
    });

    return NextResponse.json(collections, { status: 200 });
}

export async function POST(request: Request) {
    try {
        const addCollectionSchema = z.object({
            title: z.string().min(1, "Name is required.").max(255),
            books: z.array(
                z.object({
                    bookId_collectionId: z.object({
                        bookId: z.string().uuid(),
                        collectionId: z.string().uuid(),
                    })
                })
            ),
        });

        const body = await request.json();
        const validatedBody = addCollectionSchema.parse(body);

        const createdCollection = await prisma?.collection.create({
            data: {
                title: validatedBody.title,
                books: {
                    connect: validatedBody.books
                },
            },
        });

        return NextResponse.json(createdCollection, { status: 201 });
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.errors.map((err) => err.message);
            console.log(error.errors);

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
    const deleteCollectionSchema = z.object({
        id: z.string().uuid(),
    });

    const body = await request.json();
    const validatedBody = deleteCollectionSchema.parse(body);

    const deletedCollection = await prisma?.collection.delete({
        where: {
            id: validatedBody.id,
        },
    });

    return NextResponse.json(deletedCollection, { status: 200 });
}