'use client'

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useFetchPostById } from '@/hooks/post.query';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

function PostItem({ id }: { id: string }) {
    const { data, isLoading } = useFetchPostById(id);

    if (isLoading) {
        return <div className='flex justify-center items-center h-screen'>Loading...</div>
    }

    return (
        <div className='max-w-3xl mx-auto pt-8 px-4'>
            <Link className={buttonVariants({ variant: "secondary" })} href='/'>Back to Posts</Link>

            <div className='mb-8 mt-6'>
                <h1 className='text-3xl font-bold tracking-tight mb-4'>{data.title}</h1>
                <div className='flex items-center space-x-4'>
                    <div className='flex items-center space-x-2'>
                        <div className='relative size-10 overflow-hidden rounded-full'>
                            <Image src={`/api/image-proxy?url=${encodeURIComponent(data.authorImage)}` || data.authorImage} alt={data.authorName} fill sizes="(max-width: 768px) 100vw, 48px" className='object-cover' />
                        </div>
                        <p className=' font-medium  '>{data.authorName}</p>
                    </div>

                    <p className='text-sm text-gray-500'>
                        {data.createdAt ? new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit',
                        }).format(new Date(data.createdAt)) : 'Invalid date'}
                    </p>

                </div>
            </div>

            <div className='relative h-[400px] w-full mb-8 overflow-hidden rounded-lg'>
                <Image
                    src={`/api/image-proxy?url=${encodeURIComponent(data.imageUrl)}` || data.imageUrl}
                    alt={data.title}
                    fill
                    className='object-cover'
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                />
            </div>

            <Card>
                <CardContent>
                    <p className='text-gray-700 '>{data.content}</p>
                </CardContent>
            </Card>

            <div className='h-[50px]' />
        </div>
    )
}

export default PostItem
