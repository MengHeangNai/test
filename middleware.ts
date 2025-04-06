import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default withAuth(
    async function middleware(req: any) { },
    {
        publicPaths: ["/"],
    }
);

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const publicPaths = [
        '/'  // Add other public API routes if needed
    ];

    const isPublicPath = publicPaths.some(publicPath =>
        path.startsWith(publicPath)
    );

    if (isPublicPath) {
        return NextResponse.next();
    }

    const token = request.cookies.get('auth-token')?.value || '';

    if (!token && !isPublicPath) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/api/posts',
        '/api/image-proxy',
    ],
}
