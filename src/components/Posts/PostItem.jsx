const PostItem = ({ title, author, body }) => {
  return (
    <li>
      <h2 className="post-title">{title}</h2>
      <p className="post-author">{author}</p>
      <p className="post-body">{body}</p>
    </li>
  );
};
export default PostItem;
