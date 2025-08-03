import { Display } from './Display';

const CreateBlogForm = ({ handleNewBlog, visible }) => {
  return visible ? (
    <form onSubmit={handleNewBlog}>
      <Display tag="h2" text="Create new" />
      <div>
        title:
        <input type="text" name="title" placeholder="title" />
      </div>
      <div>
        author:
        <input type="text" name="author" placeholder="author" />
      </div>
      <div>
        url:
        <input type="text" name="url" placeholder="url" />
      </div>
      <button type="submit">create</button>
    </form>
  ) : null;
};

export default CreateBlogForm;
