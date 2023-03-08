import Button from "../UI/Button";
import Input from "../UI/Input/Input";

const CommentBox = ({ onClose }) => {
  return (
    <div className="comment__box">
      <Input
        type="text"
        field="textarea"
        className="comment__box--input"
        placeholder="What is your take on the article?"
      />
      <div className="comment__box--buttonbox">
        <Button onClick={onClose} className="comment__box--button">
          Close
        </Button>
        <Button className="comment__box--button">Add</Button>
      </div>
    </div>
  );
};
export default CommentBox;
