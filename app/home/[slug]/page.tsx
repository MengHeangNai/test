import Image from "next/image";

type Params = Promise<{ slug: string }>

export default async function HomeRoute({ params }: { params: Params }) {

  const { slug } = await params;

  return (
    <div>
      <p>
        Hello from home pages {slug}
      </p>
    </div>
  );
}
