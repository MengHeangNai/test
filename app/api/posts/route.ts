// app/api/posts/[id]/route.ts
import { prisma } from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');
        const userId = searchParams.get('userId');

        let post = null;

        if (id) {
            post = await prisma.blogPost.findUnique({
                where: {
                    id: id as string,
                },
            });
        } else if (userId) {
            post = await prisma.blogPost.findMany({
                where: {
                    authorId: userId as string,
                },
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
        } else {
            post = await prisma.blogPost.findMany({
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
        }

        if (!post) {
            return NextResponse.json({ post: [] }, {
                headers: {
                    'Cache-Control': 'public, s-max-age=3600, stale-while-revalidate=86400',
                    'Content-Type': 'application/json',
                }
            });
        }

        return NextResponse.json({
            post,
        }, {
            headers: {
                'Cache-Control': 'public, s-max-age=3600, stale-while-revalidate=86400',
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.error("Post fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Content-Type, Authorization",
        },
    });
}