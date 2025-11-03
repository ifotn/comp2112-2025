import Link from "next/link";
import PageTitle from "../components/PageTitle";

// set structure of blog post data
interface Post {
    _id: number;
    title: string;
}

export default async function Blog() {
    // use fetch API to get blog data from Vercel sample blog API
    // const data: Response = await fetch('https://api.vercel.app/blog');

    // switch to Rich's demo blog so we can also make new Blog Posts
    //const data: Response = await fetch('https://vercel-blog-api-eta.vercel.app/api/v1/posts');

    // now use env var for api domain
    const apiDomain: string = process.env.NEXT_PUBLIC_API_DOMAIN!;
    const data: Response = await fetch(`${apiDomain}/posts`);

    // convert API json to array of Post objects (defined above)
    const posts: Post[] = await data.json();

    // display a page and show the blog post data we received
    return (
        <main>
            <PageTitle title="Blog" />
            <h1>Blog</h1>
            <Link href="/blog/create-post" className="newLink">Create a New Blog Post</Link>
            <ul className="list-none p-4 space-y-2">
                {posts.map((post) => (
                    <li key={post._id} className="bg-white p-4 rounded shadow">
                        <Link href={`/blog/${post._id}`}>
                            {post.title}
                        </Link>                     
                    </li>
                ))}
            </ul>
        </main>
    )
}