import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import PostItem from "./PostItem";

const dummyData = [
  {
    title: "The Art of War",
    author: "Sun Tzu",
    body: "The supreme art of war is to subdue the enemy without fighting.",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    body: "You never really understand a person until you consider things from his point of view...Until you climb inside of his skin and walk around in it.",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    body: "I'm quite illiterate, but I read a lot.",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    body: "I'm quite illiterate, but I read a lot.",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    body: "I'm quite illiterate, but I read a lot.",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    body: "I'm quite illiterate, but I read a lot.",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    body: "I'm quite illiterate, but I read a lot.",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    body: "I'm quite illiterate, but I read a lot.",
  },
];

const postsPerPage = 3;
const AllPosts = () => {
  const [start, setStart] = useState(0);
  const end = start + postsPerPage;

  const changePageHandler = (newPage) => {
    setStart((pag) => newPage * postsPerPage - postsPerPage);
  };
  return (
    <div>
      <ul className="post-list">
        {dummyData.slice(start, end).map((post, index) => (
          <PostItem
            key={index}
            author={post.author}
            title={post.title}
            body={post.body}
          />
        ))}
      </ul>
      {dummyData.length > 0 && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={dummyData.length}
          onChange={changePageHandler}
        />
      )}
    </div>
  );
};
export default AllPosts;
