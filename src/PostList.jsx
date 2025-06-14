import { useState, useEffect } from "react";
export default function PostList(){
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try{
            fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
                setLoading(false);
            });
        } catch(e) {
            setError(e);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    else if (error) {
        return <div>Error: {error.message}</div>;
    }
    else if (posts.length === 0){
        return <div>No posts found</div>;
    }
    return (
        <div>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}
                        style={{fontWeight: post.id<5 ? 'bold' : 'normal'}}
                    >
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}