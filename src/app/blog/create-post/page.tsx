'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import SimpleWysiwyg from 'react-simple-wysiwyg';

interface PostFormData {
    title: string;
    content: string;
}

interface SimpleWysiwygChangeEvent {
    target: { 
        value: string;
    }
}

export default function CreatePost() {
    // used for redirecting
    const router = useRouter();

    // state var to store blog post content
    const [content, setContent] = useState<string>('');

    // change handler for rte
    const handleContentChange = (event: SimpleWysiwygChangeEvent) => {
        setContent(event.target.value);
    }

    // form input handling.  register: for binding form inputs
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }} = useForm<PostFormData>();

    const onSubmit = async (data: PostFormData) => {
        console.log(`Submitted: ${data}`);

        try {
            // get current timestamp
            const postDate: string = new Date().toLocaleDateString();

            // make POST request to Rich's blog api
            const res: Response = await fetch('https://vercel-blog-api-eta.vercel.app/api/v1/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: data.title,
                    content: content,  // now includes html markup from rte
                    username: 'your-email-here@georgiancollege.ca',
                    date: postDate
                })
            });

            // api response that comes back
            const apiRes: Response = await res.json();
            console.log(apiRes);

            // no error => redirect to blog
            router.push('/blog');
        }
        catch (error: unknown) {
            console.log(error);
        }
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
                    {/* <textarea {...register("content", { required: "Content is required" })}></textarea> */}
                    <SimpleWysiwyg value={content} className="rte" onChange={handleContentChange} />
                    {errors.content && <span className="error">{errors.content.message}</span>}
                </fieldset>
                <button>Save</button>
            </form>
        </main>
    )
}