import { useRef } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input/Input";

const CommentBox = ({ onClose, onAdd }) => {
  const bodyRef = useRef("");
  const emailRef = useRef("");

  const addCommentHandler = () => {
    const body = bodyRef.current.value;
    const email = emailRef.current.value;
    onAdd({ email, body });
  };
  return (
    <div className="comment__box">
      <Input
        type="text"
        field="textarea"
        placeholder="What is your take on the article?"
        ref={bodyRef}
      />
      <div className="comment__box--buttonbox">
        <Input
          type="email"
          className="comment__box--input"
          placeholder="What is your email?"
          ref={emailRef}
        />
        <Button onClick={onClose} className="comment__box--button">
          Close
        </Button>
        <Button className="comment__box--button" onClick={addCommentHandler}>
          Add
        </Button>
      </div>
    </div>
  );
};
export default CommentBox;
