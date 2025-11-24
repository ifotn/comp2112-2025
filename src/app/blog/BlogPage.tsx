'use client';

import Link from "next/link";
import PageTitle from "../components/PageTitle";
import BlogList from "../components/BlogList";
import { Suspense } from 'react';
import { useCounter } from "../context/GlobalContext";


export default function BlogPage() {
    const { username } = useCounter();

    return (
        <main>
            <PageTitle title="Blog" />
            <h1>Blog</h1>
            {username && 
            <Link href="/blog/create-post" className="newLink">Create a New Blog Post</Link>
            }
                
            <Suspense fallback={<h4>Loading blog posts...</h4>}>
                <BlogList />
            </Suspense>
        </main>
    )
}