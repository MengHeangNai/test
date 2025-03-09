import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "../utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import BlogPostCard from "../../components/general/BlogPostCard";

async function getData(userId: any) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = await prisma.blogPost.findMany({
    where: {
      authorId: userId
    },
    orderBy: {
      createdAt: 'desc'
    },
  });
  return data;
}


export default async function Dashboard() {

  const { getUser, getIdToken, getAccessToken } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2>Your blog Articles </h2>
        <Link className={buttonVariants()} href={'/dashboard/create'}>Create Post</Link>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((post: any) => (
          <BlogPostCard data={post} key={post?.id} />
        ))}
      </div>
    </div>
  );
}
