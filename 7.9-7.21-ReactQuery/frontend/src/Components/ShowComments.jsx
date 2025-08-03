import { useAddComment } from "../hooks/useAddComment";
import { useParams } from "react-router-dom";

const ShowComments = ( { comments } ) => {
  const { mutate: addComment } = useAddComment();
  const { id } = useParams();

  const handleAddComment = (content) => {
    content.preventDefault();
    const commentContent = content.target[0].value;
    content.target[0].value = '';
    if (!commentContent) return;

    const newComment = {
      blogId: id,
      comment: commentContent,
    };

    addComment(newComment);
  };

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={(content) => handleAddComment(content)}>
        <input type="text" placeholder="Add a comment" required />
        <button type="submit">add comment</button>
      </form>
      <ul className="list-group">
        {comments.map(comment => (
          <li className="list-group-item" key={comment._id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default ShowComments;