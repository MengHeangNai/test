import TodoTable from "@/components/general/TodoTable";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const dynamic = 'force-dynamic';

export default async function TodoPage() {

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id) {
        return <div className="text-center mt-10">Please log in to view or create todos.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <TodoTable userId={user.id} />
        </div>
    );
}
