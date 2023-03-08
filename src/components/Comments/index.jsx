import CommentItem from "./CommentItem";

const Comments = ({ comments }) => {
  return (
    <ul className="comment__list">
      {comments?.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </ul>
  );
};
export default Comments;
