import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Pagination from "../Pagination/Pagination";
import Error from "../UI/Error";
import PostItem from "./PostItem";

const AllPosts = ({ title, isLoading, error, allPosts, postsPerPage }) => {
  const [start, setStart] = useState(0);
  const end = start + postsPerPage;
  const changePageHandler = (newPage) => {
    setStart((pag) => newPage * postsPerPage - postsPerPage);
  };
  return (
    <div>
      {!isLoading && !allPosts && <LoadingSpinner type="full" />}
      {!isLoading && error?.hasError && <Error message={error?.message} />}
      {allPosts.length > 0 && (
        <>
          <h3 className="post-list-title">{title}</h3>
          <ul className="post-list">
            {allPosts.slice(start, end).map((post, index) => (
              <PostItem
                key={index}
                id={post.id}
                userId={post.userId}
                title={post.title}
                body={post.body}
              />
            ))}
          </ul>
        </>
      )}
      {allPosts.length > 0 && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={allPosts.length}
          onChange={changePageHandler}
        />
      )}
    </div>
  );
};
export default AllPosts;
