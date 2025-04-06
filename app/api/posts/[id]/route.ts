// app/api/posts/[id]/route.ts
import { prisma } from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    // Await the params object
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    try {
        const post = await prisma.blogPost.findUnique({
            where: {
                id: id as string,
            },
        });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return Response.json(post, {
            headers: {
                "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Post fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
    }
}