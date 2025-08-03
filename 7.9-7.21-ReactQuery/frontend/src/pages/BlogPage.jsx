import { useParams } from "react-router-dom";
import { useBlogPosts } from "../hooks/useBlogPosts";
import ShowBlogDetails from "../components/ShowBlogDetail";

const BlogPage = () => {

  const { id } = useParams();
  const { data: blogPosts, isLoading, isError } = useBlogPosts();
  
  if (isLoading) {
      return <div>Loading...</div>;
    }
    
  if (isError) {
        return <div>Error loading blog post</div>;
    }
    
  const blog = blogPosts.find(post => post.id === id);


  return blog ? (
    <div>
      <ShowBlogDetails blog={blog} />
    </div>
  ) : (
    <div>
      <h2>Blog not found</h2>
    </div>
  );
};

export default BlogPage;
