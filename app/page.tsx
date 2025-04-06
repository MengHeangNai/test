import { BlogPost } from "@/components/general/BlogPost";

export const revalidate = 60;

export default async function Index() {

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Latest posts
      </h1>
      <BlogPost />
    </div>
  );
}