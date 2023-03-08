const CommentItem = ({ author, body, date, id }) => {
  return (
    <li className="comment-item">
      <div className="comment-header">
        <h3 className="comment-author">{author}</h3>
        <p className="comment-date">{date}</p>
      </div>
      <div className="comment-body">
        <p className="comment-text">{body}</p>
      </div>
    </li>
  );
};
export default CommentItem;
