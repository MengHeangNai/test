import handleSubmit from "@/app/action";
import SubmitButton from "@/app/components/general/SubmitButton";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function CreateBlogRoute() {
  return (
    <div>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>Create a new post to share with the world</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="flex flex-col gap-4">

            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input name="title" type="text" placeholder="Title" required />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Content</Label>
              <Textarea name="content" placeholder="Content" required />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Image</Label>
              <Input name="imageUrl" type='url' required placeholder="Image Url" />
            </div>

            {/* <Button className={buttonVariants()} type="submit">Create Post</Button> */}
            <SubmitButton />

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
