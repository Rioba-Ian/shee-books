import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id

    const collection = await prisma?.collection.findUnique({
        where: {
            id
        }
    })

    if (!collection) return NextResponse.json({ message: 'collection not found' }, { status: 404 })

    return NextResponse.json(collection, { status: 200 })
}