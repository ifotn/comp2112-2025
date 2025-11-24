// components/BlogList.js
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Post {
  _id: number;
  title: string;
}

const BlogList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
      try {
        const response = await fetch(`${apiDomain}/posts`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setPosts(result);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('Failed to load blog posts');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (posts.length === 0) {
    return <div>No blog posts available</div>;
  }

  return (
    <section>
      <ul className="list-none p-4 space-y-2">
        {posts.map((post) => (
          <li key={post._id} className="bg-white p-4 rounded shadow">
            <Link href={`/blog/${post._id}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BlogList;
