import { useParams } from "react-router-dom";
import { useState } from "react";
import Comments from "../../components/Comments";
import CommentBox from "../../components/Comments/CommentBox";

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
  const [showCommentBox, setShowCommentBox] = useState(false);
  const params = useParams();
  const postId = params.postId;
  console.log(postId);
  return (
    <section className="post__details">
      <div>
        <div className="post__details--header">
          <img src="#" alt="Author" className="post__details--img" />
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
          <button id="delete">Delete</button>
          <button id="edit">Edit</button>
          <button id="edit" onClick={() => setShowCommentBox(true)}>
            Comment
          </button>
        </div>
      </div>
      {showCommentBox && (
        <div className="post__details--comment">
          <CommentBox />
        </div>
      )}
      <div className="post__details--list">
        <Comments comments={comments} />
      </div>
    </section>
  );
};
export default PostDetails;
