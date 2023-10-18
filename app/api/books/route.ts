import { z } from "zod"

const addBookSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255),
    description: z.string().min(1, 'Description is required.').optional(),
    isbn: z.number().optional(),
    date_pub: z.date().optional(),
    images: z.array(
        z.string().optional()
    ),
    authorId: z.string().uuid().optional(),
    genreId: z.string().uuid().optional(),
})

export async function POST(request: Request) {
    const body = await request.json()
    const validatedBody = addBookSchema.parse(body)
}