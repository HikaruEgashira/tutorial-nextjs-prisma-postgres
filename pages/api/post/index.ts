import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

interface PostData {
    title: string;
    content?: string;
}

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { title, content }: PostData = req.body;

    const session = await getSession({ req });
    const result = await prisma.post.create({
        data: {
            title: title,
            content: content,
            author: { connect: { email: session?.user?.email } },
        },
    });
    res.json(result);
}
