'use client';
import PageTitle from "@/app/components/PageTitle";
import { Parser } from "html-to-react";
import { useCounter } from "@/app/context/GlobalContext";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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
    const { username } = useCounter();
    const [canDelete, setCanDelete] = useState<boolean>(false);
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);

    const getPost = async() => {
        try {
             const res: Response = await fetch(`${apiDomain}/posts/${id}`);
            const fetchedPost: Post = await res.json();

            // convert response json to a Post object
            setPost(fetchedPost);

            // if user logged in, did they make this post?
            if (username == fetchedPost.author) {
                setCanDelete(true);
            }
        }
        catch (error) {
            console.log(error);
        }  
        finally {
            // this runs at the end of the attempt, regardless of the result
            // done with api fetch attempt, no longer loading so can hide that message
            setLoading(false);  
        }
    }
    
    useEffect(() => {
        getPost();
    },[id]);  // run this any time the value of id changes

    const deletePost = async() => {
        if (confirm('Delete this post?')) {
            const res: Response = await fetch(`${apiDomain}/posts/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (res.ok) {
                router.push('/blog');
            }
            else {
                console.log(await res.json());
            }
        }
    }

    // loading message until fetch attempt completed
    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }

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
            {canDelete && 
                <button onClick={deletePost}>Delete</button>
            }
        </main>
    );
}