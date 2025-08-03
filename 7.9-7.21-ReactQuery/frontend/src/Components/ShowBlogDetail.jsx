import { useLikePost } from "../hooks/useLikePost";
import ShowComments from "./ShowComments";

const ShowBlogDetails = ({ blog }) => {

  const likePostMutation = useLikePost();

  const likeButton = blogId => {

    const handleLike = () => {
      likePostMutation.mutate(blogId, {
        onError: (error) => {
          console.error('Error liking blog:', error);
        }
      });
    };

    return (<button className="btn btn-primary" onClick={handleLike}>like</button>);
  };

  return (
    <div>
        <h2>{blog.title} {blog.author}</h2>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
        <div>{blog.likes} likes {likeButton(blog.id)}</div>
        <div>added by {blog.user?.name}</div>
        <ShowComments comments={blog.comments} />
    </div>
  )
};

export default ShowBlogDetails;