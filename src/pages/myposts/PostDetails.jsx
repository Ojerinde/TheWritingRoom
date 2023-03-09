import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Comments from "../../components/Comments";
import CommentBox from "../../components/Comments/CommentBox";
import { BsPersonCircle } from "react-icons/bs";
import { AiFillEdit, AiFillDelete, AiOutlineComment } from "react-icons/ai";
import { BsArrow90DegLeft } from "react-icons/bs";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import { AppContext } from "../../store/AppContext";
import useFetch from "../../hooks/useFetch";
import {
  AddItemToLocalStorage,
  DeleteLocalStorageItem,
  GetItemFromLocalStorage,
  SetItemToLocalStorage,
} from "../../lib/Validations";

const PostDetails = () => {
  const {
    updateAllPostState,
    updateUserPostState,
    fetchRequest: fetchComments,
  } = useFetch();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const postId = params.postId;

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState(false);
  const [remove, setDelete] = useState(false);
  const [edit, setEdit] = useState(false);

  const [comments, setComments] = useState([]);

  const { userPosts, allPosts } = useContext(AppContext);
  const lastIndex = pathname?.lastIndexOf("/");
  const path = pathname?.slice(0, lastIndex);

  const selectedPosts = path === "/myposts" ? userPosts : allPosts;
  const post = selectedPosts?.find((pos) => {
    return pos.id === +postId;
  });
  const backHandler = () => {
    console.log("Triggered");
    navigate(path);
  };

  const closeCommentBox = () => {
    setShowCommentBox(false);
  };

  const editHandler = () => {
    navigate(`${pathname}/edit`);
    SetItemToLocalStorage("edit", post);
  };
  const deleteHandler = () => {
    // eslint-disable-next-line no-restricted-globals
    const areYouSure = confirm("Are you sure?");
    if (!areYouSure) return;
    const getResponse = (responseBody) => {
      backHandler();
      if (path === "/posts") {
        DeleteLocalStorageItem("posts", +postId);
        const updatedPosts = GetItemFromLocalStorage("posts");
        updateAllPostState(updatedPosts);
      }
      if (path === "/myposts") {
        DeleteLocalStorageItem("userposts", +postId);
        const updatedPosts = GetItemFromLocalStorage("userposts");
        updateUserPostState(updatedPosts);
        backHandler();
      }
    };
    fetchComments(
      {
        url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
        method: "DELETE",
        errorMessage: "Failed to delete",
      },
      getResponse
    );
  };

  const addCommentHandler = (input) => {
    const comment = {
      body: input.body,
      email: input.email,
      postId: postId,
    };
    const getComments = (responseBody) => {
      AddItemToLocalStorage(`comments${postId}`, responseBody);
      const updatedComments = GetItemFromLocalStorage(`comments${postId}`);
      setComments(updatedComments);
      setShowCommentBox(false);
    };
    fetchComments(
      {
        url: `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        method: "POST",
        body: comment,
        headers: {
          "Content-Type": "application/json",
        },
        errorMessage: "Failed to add comment",
      },
      getComments
    );
  };

  useEffect(() => {
    const initialComment = GetItemFromLocalStorage(`comments${postId}`);
    if (!initialComment) {
      const getComments = (responseBody) => {
        setComments(responseBody);
        SetItemToLocalStorage(`comments${postId}`, responseBody);
      };
      fetchComments(
        {
          url: `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
          errorMessage: "Failed to fetch comments",
        },
        getComments
      );
    } else {
      SetItemToLocalStorage(`comments${postId}`, comments);
      setComments(initialComment);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchComments, postId]);
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
            <h3 className="post__details--h3">
              User Id: {post?.userId} ; Post Id: {+postId}
            </h3>
          </div>
          <h1 className="post__details--h1">{post?.title}</h1>
          <article className="post__details--article">{post?.body}</article>
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
                onClick={editHandler}
              />
            </div>
            <div className="post__details--iconbox">
              {remove && <p className="post__details--iconname">Delete</p>}
              <AiFillDelete
                className="post__details--icon post__details--icon__3"
                onMouseEnter={() => setDelete(true)}
                onMouseLeave={() => setDelete(false)}
                onClick={deleteHandler}
              />
            </div>
          </div>
        </div>
        {showCommentBox && (
          <div className="post__comment--box">
            <CommentBox onClose={closeCommentBox} onAdd={addCommentHandler} />
          </div>
        )}
        <div className="post__comment--list">
          <Comments comments={comments} />
        </div>
      </section>
      <Footer />
    </>
  );
};
export default PostDetails;
