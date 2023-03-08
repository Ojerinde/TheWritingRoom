import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import PostItem from "./PostItem";

const dummyData = [
  {
    id: 1,
    title: "The Art of War",
    author: "Sun Tzu",
    body: "The supreme art of war is to subdue the enemy without fighting.",
  },
  {
    id: 9,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    body: "You never really understand a person until you consider things from his point of view...Until you climb inside of his skin and walk around in it.",
  },
  {
    id: 2,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    body: "I'm quite illiterate, but I read a lot.",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    body: "I'm quite illiterate, but I read a lot.",
    id: 3,
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    body: "I'm quite illiterate, but I read a lot.",
    id: 4,
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    body: "I'm quite illiterate, but I read a lot.",
  },
  {
    id: 6,

    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    body: "I'm quite illiterate, but I read a lot.",
  },
  {
    id: 7,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    body: "I'm quite illiterate, but I read a lot.",
  },
  {
    id: 8,
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
            id={post.id}
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
