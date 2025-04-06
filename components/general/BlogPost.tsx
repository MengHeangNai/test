'use client'
import { useFetchPost } from "@/hooks/post.query"
import BlogPostCard from "./BlogPostCard"
import React from "react"

export function BlogPost() {

    const { data: posts } = useFetchPost();

    if (!posts) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((item: any) => (
                <BlogPostCard data={item} key={item.id} />
            ))}
        </div>
    )
}