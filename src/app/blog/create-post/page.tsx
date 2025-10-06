'use client';

// import { useState } from "react";
import { useForm } from "react-hook-form";

interface PostFormData {
    title: string;
    content: string;
}

export default function CreatePost() {
    // form input handling.  register: for binding form inputs
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }} = useForm<PostFormData>();

    const onSubmit = (data: PostFormData) => {
        console.log(`Submitted: ${data}`);
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
                    <textarea {...register("content", { required: "Content is required" })}></textarea>
                    {errors.content && <span className="error">{errors.content.message}</span>}
                </fieldset>
                <button>Save</button>
            </form>
        </main>
    )
}