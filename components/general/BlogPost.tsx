'use client'
import { useFetchPost } from "@/hooks/post.query"
import BlogPostCard from "./BlogPostCard"
import React from "react"

export function BlogPost() {

    const { data } = useFetchPost();

    if (!data || !data.post) {
        return <div>Loading...</div>;
    }

    const posts = data.post;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((item: any) => (
                <BlogPostCard data={item} key={item.id} />
            ))}
        </div>
    )
}