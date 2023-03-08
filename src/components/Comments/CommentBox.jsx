import Button from "../UI/Button";
import Input from "../UI/Input/Input";

const CommentBox = () => {
  return (
    <div>
      <Input type="text" field="textarea" className="comment__box--input" />
      <Button>Close</Button>
      <Button>Add</Button>
    </div>
  );
};
export default CommentBox;
