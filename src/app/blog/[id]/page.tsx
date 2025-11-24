'use client';
import PageTitle from "@/app/components/PageTitle";
import { Parser } from "html-to-react";
import { useCounter } from "@/app/context/GlobalContext";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Post = {
    title: string;
    author: string;
    date: string;
    content: string;
    category: string;
}

// display all content of selected Blog Post
export default function Post() {
    // class vars
    const params = useParams<{ id: string }>();
    const { id } = params;
    const apiDomain: string = process.env.NEXT_PUBLIC_API_DOMAIN!;
    const [post, setPost] = useState<Post | null>(null);

    const getPost = async() => {
        const res: Response = await fetch(`${apiDomain}/posts/${id}`);

        // convert response json to a Post object
        setPost(await res.json());
    }
    
    useEffect(() => {
        getPost();
    },[id]);  // run this any time the value of id changes

    //console.log(res);

    // not found error handler
    if (!post) {
        return (
            <h1>Post Not Found</h1>
        );
    }

    // display blog post
    return (
        <main>
            <PageTitle title="Blog Post" />
            <h1>{post!.title}</h1>
            <h2>By {post!.author} on {new Date(post!.date).toLocaleDateString()}</h2>
            <article>
                {Parser().parse(post!.content)}
            </article>
        </main>
    );
}