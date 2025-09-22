// set structure of blog post data
interface Post {
    id: number;
    title: string;
}

export default async function Blog() {
    // use fetch API to get blog data from Vercel sample blog API
    const data: Response = await fetch('https://api.vercel.app/blog');

    // convert API json to array of Post objects (defined above)
    const posts: Post[] = await data.json();

    // display a page and show the blog post data we received
    return (
        <main>
            <h1>Blog</h1>
            <ul className="list-none p-4 space-y-2">
                {posts.map((post) => (
                    <li key={post.id} className="bg-white p-4 rounded shadow">{post.title}</li>
                ))}
            </ul>
        </main>
    )
}