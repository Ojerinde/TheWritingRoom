import { useLocation, useNavigate } from "react-router-dom";
import Button from "../UI/Button";

const PostItem = ({ id, title, author, body }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);
  const fullPostHandler = () => {
    navigate(`${pathname}/` + id);
  };
  return (
    <li>
      <div>
        <h2 className="post-title">{title}</h2>
        <p className="post-author">{author}</p>
        <p className="post-body">{`${body}`.split(".")[0]}.</p>
      </div>
      <p>
        <Button className="post-button" onClick={fullPostHandler}>
          See full post
        </Button>
      </p>
    </li>
  );
};
export default PostItem;
