import PageTitle from "@/app/components/PageTitle";
import { Parser } from "html-to-react";

type Post = {
    title: string;
    author: string;
    date: string;
    content: string;
    category: string;
}

// display all content of selected Blog Post
export default async function Post({ params }: { params: { id: string }}) {
    const { id } = await params;

    // fetch selected blog post from external API
    const res: Response = await fetch(`https://vercel-blog-api-eta.vercel.app/api/v1/posts/${id}`);

    // convert response json to a Post object
    const post: Post = await res.json();

    //console.log(res);

    // not found error handler
    if (!res.ok) {
        return (
            <h1>Post Not Found</h1>
        );
    }

    // display blog post
    return (
        <main>
            <PageTitle title="Blog Post" />
            <h1>{post.title}</h1>
            <h2>By {post.author} on {new Date(post.date).toLocaleDateString()}</h2>
            <article>
                {Parser().parse(post.content)}
            </article>
        </main>
    );
}