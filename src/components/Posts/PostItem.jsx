import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";

const PostItem = ({ title, author, body }) => {
  const navigate = useNavigate();
  const fullPostHandler = () => {
    navigate(0);
  };
  return (
    <li>
      <p>
        <h2 className="post-title">{title}</h2>
        <p className="post-author">{author}</p>
        <p className="post-body">{`${body}`.split(".")[0]}.</p>
      </p>
      <p>
        <Button className="post-button" onClick={fullPostHandler}>
          See full post
        </Button>
      </p>
    </li>
  );
};
export default PostItem;
