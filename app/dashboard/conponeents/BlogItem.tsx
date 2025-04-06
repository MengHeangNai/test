'use client'
import BlogPostCard from '@/components/general/BlogPostCard'
import { useFetchPostByUserId } from '@/hooks/post.query'
import React from 'react'
import Loading from '../loading'

function BlogItem({ userId }: { userId: string }) {
    const { data, isLoading } = useFetchPostByUserId(userId)

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.map((post: any) => (
                <BlogPostCard data={post} key={post?.id} />
            ))}
        </div>
    )
}

export default BlogItem