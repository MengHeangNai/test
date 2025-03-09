import { Suspense } from "react";
import BlogPostCard from "../components/general/BlogPostCard";
import { prisma } from "./utils/db";
import { BlogPostsGrid } from "../components/general/BlogPostsGrid";

export const revalidate = 60;

const getData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = await prisma.blogPost.findMany({
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
    }
  });
  return data
}

export default async function Index() {
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Latest posts
      </h1>
      <Suspense fallback={<BlogPostsGrid />}>
        {BlogPost(1)}
      </Suspense>
    </div>
  );
}

async function BlogPost(userId: any) {
  const data = await getData()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <BlogPostCard data={item} key={item.id} />
      ))}
    </div>
  )
}
