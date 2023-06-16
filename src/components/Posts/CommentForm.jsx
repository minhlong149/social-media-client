import React, {useState} from "react";

const CommentForm = ({submitComment}) => {
    const [content, setContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        submitComment({content});
        setContent('');
    }
    return (
     <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        class="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1 "
        placeholder="Your comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button class="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded" type="submit">Submit</button>
    </form>
    )
};
export default CommentForm;