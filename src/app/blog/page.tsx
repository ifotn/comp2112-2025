'use client';

import Link from "next/link";
import PageTitle from "../components/PageTitle";
import { useCounter } from "../context/GlobalContext";
import { useEffect, useState } from "react";

// set structure of blog post data
interface Post {
    _id: number;
    title: string;
}

export default function Blog() {
    // check global context for username - is user authenticated?
    const { username } = useCounter();

    // now use env var for api domain
    const apiDomain: string = process.env.NEXT_PUBLIC_API_DOMAIN!;

    // set up posts array
    const [posts, setPosts] = useState<Post[]>([]);

    const getBlogPosts = async() => {
        const response: Response = await fetch(`${apiDomain}/posts`);

        // convert API json to array of Post objects (defined above)
        const data = await response.json();
        setPosts(data);
    }

    // invoke fetch from api
    useEffect(() => {
        getBlogPosts();
    })

    // display a page and show the blog post data we received
    return (
        <main>
            <PageTitle title="Blog" />
            <h1>Blog</h1>
            {username && 
                <Link href="/blog/create-post" className="newLink">Create a New Blog Post</Link>
            }
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