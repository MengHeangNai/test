// app/api/posts/[id]/route.ts
import { prisma } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const post = await prisma.blogPost.findUnique({
            where: {
                id: params.id,
            },
        });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error("Post fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
    }
}