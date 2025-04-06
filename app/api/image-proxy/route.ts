// app/api/image-proxy/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = request.nextUrl.searchParams.get("url");

    if (!url) {
        return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
    }

    try {
        const imageResponse = await fetch(url);

        if (!imageResponse.ok) {
            return NextResponse.json({ error: "Failed to fetch image" }, { status: imageResponse.status });
        }

        // Get the image data as an array buffer
        const imageData = await imageResponse.arrayBuffer();

        // Get the content type from the original response
        const contentType = imageResponse.headers.get("content-type") || "image/*";

        // Create a new response with the image data and appropriate headers
        return new NextResponse(imageData, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=86400" // Cache for 1 day
            }
        });
    } catch (error) {
        console.error("Image proxy error:", error);
        return NextResponse.json({ error: "Failed to proxy image" }, { status: 500 });
    }
}