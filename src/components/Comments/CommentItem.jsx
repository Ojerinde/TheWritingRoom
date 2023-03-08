const CommentItem = ({ author, body, id }) => {
  return (
    <li className="comment__item">
      <div className="comment__author">{author}</div>
      <div className="comment__text">{body}</div>
    </li>
  );
};
export default CommentItem;
