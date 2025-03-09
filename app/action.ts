'use server';

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function handleSubmit(formData: FormData) {

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/register");
    }

    const title = formData.get("title");
    const content = formData.get("content");
    const imageUrl = formData.get("imageUrl");

    await prisma.blogPost.create({
        data: {
            title: title as string,
            content: content as string,
            imageUrl: imageUrl as string,
            authorId: user.id,
            authorImage: user.picture as string,
            authorName: user.given_name as string,
        }
    }).then((res) => {
        console.log('Post created', res);
    }).catch((err) => {
        console.log('Error creating post', err);
    });

    revalidatePath('/')
    return redirect("/dashboard");
}