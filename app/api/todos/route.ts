// app/api/todos/route.ts
import { prisma } from '@/app/utils/db';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '10';

    if (!userId) {
        return Response.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        const pageNumber = parseInt(page, 10);
        const limit = parseInt(pageSize, 10);
        const skip = (pageNumber - 1) * limit;

        const todos = await prisma.todos.findMany({
            where: {
                authorId: userId,
                status: status as any,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: limit,
            skip,
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        const totalCount = await prisma.todos.count({
            where: {
                authorId: userId,
                status: status as any,
            },
        });

        return Response.json({
            todos,
            pagination: {
                total: totalCount,
                page: pageNumber,
                pageSize: limit,
                pageCount: Math.ceil(totalCount / limit),
            }
        });
    } catch (error) {
        console.error('Failed to fetch todos:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Get the ID from route params if using dynamic routes
        const id = params?.id;

        // Get the data from request body instead of URL params
        const { status } = await request.json();

        if (!id || !status) {
            return Response.json({ error: 'ID and status are required' }, { status: 400 });
        }

        const todo = await prisma.todos.update({
            where: {
                id,
            },
            data: {
                status: status as any,
            },
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return Response.json({ todo });
    } catch (error) {
        console.error('Failed to update todo:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}