import Navigation from "../../components/Navigation/Navigation";
import AllPosts from "../../components/AllPosts";
import Button from "../../components/UI/Button";
import { BsArrow90DegLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useContext, useEffect } from "react";
import { AppContext } from "../../store/AppContext";
import {
  GetItemFromLocalStorage,
  SetItemToLocalStorage,
} from "../../lib/Validations";

const postsPerPage = 5;
const MyPosts = () => {
  const navigate = useNavigate();
  const backHandler = () => {
    navigate("/posts");
  };
  const addNewPostHandler = () => {
    navigate("/myposts/addpost");
  };
  const { isLoading, error, fetchRequest: fetchUserPosts } = useFetch();
  const { userPosts, updateUserPostState } = useContext(AppContext);

  useEffect(() => {
    const userposts = GetItemFromLocalStorage("userposts");
    if (userposts.length === 0) {
      const getPosts = (responseBody) => {
        SetItemToLocalStorage("userposts", responseBody);
        updateUserPostState(responseBody);
      };

      fetchUserPosts(
        {
          url: "https://jsonplaceholder.typicode.com/users/1/posts",
          errorMessage: "Failed to fetch User Posts",
        },
        getPosts
      );
    } else {
      SetItemToLocalStorage("userposts", userposts);
      updateUserPostState(userposts);
    }
  }, [fetchUserPosts, updateUserPostState]);

  return (
    <>
      <Navigation />
      <div className="my__posts">
        <BsArrow90DegLeft className="my__posts--icon" onClick={backHandler} />
        <Button className="my__posts--button" onClick={addNewPostHandler}>
          Add New
        </Button>
      </div>
      <AllPosts
        isLoading={isLoading}
        error={error}
        title="User Posts"
        allPosts={userPosts}
        postsPerPage={postsPerPage}
      />
    </>
  );
};
export default MyPosts;
