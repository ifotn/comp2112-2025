'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import SimpleWysiwyg from 'react-simple-wysiwyg';
import { useCounter } from "@/app/context/GlobalContext";

interface PostFormData {
    title: string;
    content: string;
}

// define a handler Event type for the SimpleWysiwyg editor
interface SimpleWysiwygChangeEvent {
    target: {
        value: string
    }
}

export default function CreatePost() {
    // state var for blog post content
    const [content, setContent] = useState<string>('');

    // used for redirecting
    const router = useRouter();

    // access global username to automatically set it for new blog post
    const { username } = useCounter();

    

    // form input handling.  register: for binding form inputs
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }} = useForm<PostFormData>();

    // rte change event handler
    const handleContentChange = (event: SimpleWysiwygChangeEvent) => {
        setContent(event.target.value);
    }

    const onSubmit = async (data: PostFormData) => {
        //console.log(`username: ${username}`);
        //console.log(`Submitted: ${data}`);

        try {
            // get current timestamp
            const postDate: string = new Date().toLocaleDateString();

            // make POST request to Rich's blog api
            //const res: Response = await fetch('https://vercel-blog-api-eta.vercel.app/api/v1/posts', {
            
            // use env var for api domain
            const apiDomain: string = process.env.NEXT_PUBLIC_API_DOMAIN!;
            const res: Response = await fetch(`${apiDomain}/posts`, {    
            //const res: Response = await fetch(`/api/blog/create-post`, {    
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: data.title,
                    content: content,  // now read content from state var which may now include html tags
                    author: username,
                    date: postDate
                }),
                credentials: 'include' // send jwt for verification to api
            });

            // api response that comes back
            const apiRes: Response = await res.json();
            console.log(apiRes);

            if (res.status == 401) {
                console.log('Unauthorized');
                return;
            }
            // no error => redirect to blog
            router.push('/blog');
        }
        catch (error: unknown) {
            console.log(error);
        }
    }

    // auth control => redirect to login if user is anonymous
    if (!username) {
        router.push('/auth/login');
        //return;
    }

    return (
        <main>
            <h1>New Blog Post</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <label htmlFor="title">Title: *</label>
                    <input {...register("title", { required: "Title is required" })} />
                    {errors.title && <span className="error">{errors.title.message}</span>}
                </fieldset>
                <fieldset>
                    <label htmlFor="content">Content: *</label>
                    <SimpleWysiwyg value={content} onChange={handleContentChange} className="rte" />
                    {/* <textarea {...register("content", { required: "Content is required" })}></textarea> */}
                    {errors.content && <span className="error">{errors.content.message}</span>}
                </fieldset>
                <button>Save</button>
            </form>
        </main>
    )
}