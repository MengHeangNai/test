import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url'); // should be `url` not `imageUrl`

    if (!url) {
        return NextResponse.json({ error: 'Missing "url" query parameter' }, { status: 400 });
    }

    const response = await fetch(url);

    const contentType = response.headers.get('content-type') || '';

    if (!contentType.startsWith('image/')) {
        return NextResponse.json({ error: 'The requested resource is not an image' }, { status: 400 });
    }

    const buffer = await response.arrayBuffer();

    return new NextResponse(Buffer.from(buffer), {
        headers: {
            'Content-Type': contentType,
        },
    });
}
