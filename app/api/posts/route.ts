// app/api/posts/[id]/route.ts
import { prisma } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const post = await prisma.blogPost.findMany({
            select: {
                title: true,
                content: true,
                imageUrl: true,
                authorImage: true,
                authorName: true,
                id: true,
                createdAt: true,
                authorId: true,
                updatedAt: true
            },
            orderBy: {
                createdAt: 'desc'
            },
        });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({
            post,
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.error("Post fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
    }
}