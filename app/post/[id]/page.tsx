import React from 'react';
import PostItem from './components/PostItem';

type Params = Promise<{ id: string }>

async function PostIdPage({ params }: { params: Params }) {
    const { id } = await params;

    return (
        <PostItem id={id} />
    )

}

export default PostIdPage
