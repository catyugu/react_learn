import { useState } from "react";
export default function CommentForm() {
    const [comment, setComment] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(comment);
        setComment("");
    };
    return (
        <div>
            <form>
                <label>Your Comment</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={handleSubmit}>    
                    Post Comment</button>
            </form>
        </div>
    );
}