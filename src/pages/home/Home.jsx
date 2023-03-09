import Navigation from "../../components/Navigation/Navigation";
import AllPosts from "../../components/AllPosts";
import { useContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import {
  GetItemFromLocalStorage,
  SetItemToLocalStorage,
} from "../../lib/Validations";
import { AppContext } from "../../store/AppContext";

const postsPerPage = 10;
const Home = () => {
  const { isLoading, error, fetchRequest: fetchPosts } = useFetch();
  const { allPosts, updateAllPostState } = useContext(AppContext);
  useEffect(() => {
    const posts = GetItemFromLocalStorage("posts");
    if (posts.length === 0) {
      const getPosts = (responseBody) => {
        SetItemToLocalStorage("posts", responseBody);
        updateAllPostState(responseBody);
      };
      fetchPosts(
        {
          url: "https://jsonplaceholder.typicode.com/posts",
          errorMessage: "Failed to fetch Posts",
        },
        getPosts
      );
    } else {
      SetItemToLocalStorage("posts", posts);
      updateAllPostState(posts);
    }
  }, [fetchPosts, updateAllPostState]);
  return (
    <>
      <Navigation />
      <AllPosts
        isLoading={isLoading}
        error={error}
        title="All Posts"
        allPosts={allPosts}
        postsPerPage={postsPerPage}
      />
    </>
  );
};
export default Home;
