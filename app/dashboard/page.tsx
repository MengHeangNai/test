import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import BlogItem from "./conponeents/BlogItem";


export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2>Your blog Articles </h2>
        <Link className={buttonVariants()} href={'/dashboard/create'}>Create Post</Link>
      </div>
      <BlogItem userId={user?.id} />
    </div>
  );
}
