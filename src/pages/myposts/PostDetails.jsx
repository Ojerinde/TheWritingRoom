import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Comments from "../../components/Comments";
import CommentBox from "../../components/Comments/CommentBox";
import { BsPersonCircle } from "react-icons/bs";
import { AiFillEdit, AiFillDelete, AiOutlineComment } from "react-icons/ai";
import { BsArrow90DegLeft } from "react-icons/bs";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
const comments = [
  {
    id: 1,
    author: "John Doe",
    date: "2023-03-06",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis justo eget risus efficitur lobortis at non ligula. Nam consequat, dolor sed tristique fermentum.",
  },
  {
    id: 2,
    author: "Jane Smith",
    date: "2023-03-07",
    body: "Pellentesque in bibendum tortor, sit amet consequat odio. Cras non nulla sit amet velit feugiat pretium. Nulla et neque eget lacus commodo suscipit at sed sapien.",
  },
  {
    id: 3,
    author: "Bob Johnson",
    date: "2023-03-08",
    body: "Phasellus vel mi a lorem aliquet rutrum. Etiam sit amet mi vel mauris congue posuere vel id orci. Aliquam ac nisi eu ante fringilla viverra ut vel arcu.",
  },
];
const PostDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const postId = params.postId;

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState(false);
  const [remove, setDelete] = useState(false);
  const [edit, setEdit] = useState(false);

  const backHandler = () => {
    navigate("/posts");
  };
  const closeCommentBox = () => {
    setShowCommentBox(false);
  };

  return (
    <>
      <Navigation />
      <section className="post__details">
        <div className="post__details--backiconbox">
          <BsArrow90DegLeft
            className="post__details--backicon"
            onClick={backHandler}
          />
        </div>
        <div className="post__body">
          <div className="post__details--header">
            <BsPersonCircle className="post__details--img" />
            <h3 className="post__details--h3">Ojerinde Joel</h3>
          </div>
          <h1 className="post__details--h1">
            {" "}
            Lorem ipsum dolor sit amet consectetur{" "}
          </h1>
          <article className="post__details--article">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            dolore dolorem nisi molestias ea fuga iusto sit, molestiae natus, at
            iste quia et similique! Reprehenderit voluptatibus assumenda eum qui
            esse?
          </article>
          <div className="post__details--footer">
            <div
              onClick={() => setShowCommentBox(true)}
              className="post__details--iconbox"
            >
              {comment && <p className="post__details--iconname">Comment</p>}
              <AiOutlineComment
                className="post__details--icon post__details--icon__1"
                onMouseEnter={() => setComment(true)}
                onMouseLeave={() => setComment(false)}
              />
            </div>
            <div className="post__details--iconbox">
              {" "}
              {edit && <p className="post__details--iconname">Edit</p>}
              <AiFillEdit
                className="post__details--icon post__details--icon__2"
                onMouseEnter={() => setEdit(true)}
                onMouseLeave={() => setEdit(false)}
                onClick={() => navigate(`${pathname}/edit`)}
              />
            </div>
            <div className="post__details--iconbox">
              {remove && <p className="post__details--iconname">Delete</p>}
              <AiFillDelete
                className="post__details--icon post__details--icon__3"
                onMouseEnter={() => setDelete(true)}
                onMouseLeave={() => setDelete(false)}
              />
            </div>
          </div>
        </div>
        {showCommentBox && (
          <div className="post__comment--box">
            <CommentBox onClose={closeCommentBox} />
          </div>
        )}
        <div className="post__comment--list">
          <Comments comments={comments} postId={postId} />
        </div>
      </section>
      <Footer />
    </>
  );
};
export default PostDetails;
