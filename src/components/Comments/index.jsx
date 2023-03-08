import CommentItem from "./CommentItem";


const Comments = ({ comments }) => {
  return (
    <ul className="">
      {comments?.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </ul>
  );
};
export default Comments;
