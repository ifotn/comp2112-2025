type Post = {
    id: number;
    title: string;
    author: string;
    date: string;
    content: string;
    category: string;
}

// display all content of selected Blog Post
export default async function Post({ params }: { params: { id: number }}) {
    const { id } = await params;

    // fetch selected blog post from external API
    const res: Response = await fetch(`https://api.vercel.app/blog/${id}`);

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
            <h1>{post.title}</h1>
            <h2>By {post.author} on {post.date}</h2>
            <article>
                {post.content}
            </article>
        </main>
    );
}