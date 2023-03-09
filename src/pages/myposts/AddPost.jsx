import { useContext, useEffect, useState } from "react";
import { BsArrow90DegLeft } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

import Navigation from "../../components/Navigation/Navigation";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input/Input";
import useFetch from "../../hooks/useFetch";
import {
  AddItemToLocalStorage,
  GetItemFromLocalStorage,
  RemoveItemFromLocalStorage,
  SetItemToLocalStorage,
  UpdateLocalStorageItem,
} from "../../lib/Validations";
import { AppContext } from "../../store/AppContext";

const AddNewPost = () => {
  const [update, setUpdate] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { fetchRequest: fetchPosts } = useFetch();
  const { updateAllPostState, updateUserPostState } = useContext(AppContext);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const newPath = pathname.slice(1);
  const firstIndex = newPath.indexOf("/");
  const path = `/${newPath}`.slice(0, firstIndex + 1);

  const backHandler = () => {
    const lastIndex = pathname.lastIndexOf("/");
    navigate(pathname.slice(0, lastIndex));
  };
  const titleOnChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const bodyOnChangeHandler = (e) => {
    setBody(e.target.value);
  };
  const addPostHandler = async (e) => {
    e.preventDefault();

    const post = {
      body: body,
      title: title,
      userId: 1,
    };

    const getPosts = (responseBody) => {
      AddItemToLocalStorage("posts", responseBody);
      AddItemToLocalStorage("userposts", responseBody);
      const updatedPosts = GetItemFromLocalStorage("posts");
      const updatedUserPosts = GetItemFromLocalStorage("userposts");
      updateAllPostState(updatedPosts);
      updateUserPostState(updatedUserPosts);
      backHandler();
    };

    fetchPosts(
      {
        url: `https://jsonplaceholder.typicode.com/users/1/posts`,
        method: "POST",
        body: post,
        headers: {
          "Content-Type": "application/json",
        },
        errorMessage: "Failed to post article",
      },
      getPosts
    );
  };
  const updatePostHandler = (e) => {
    e.preventDefault();
    const editContent = GetItemFromLocalStorage("edit");
    const getResponse = (responseBody) => {
      if (path === "/posts") {
        UpdateLocalStorageItem("posts", {
          ...responseBody,
          id: editContent.id,
        });
        const updatedPosts = GetItemFromLocalStorage("posts");
        SetItemToLocalStorage("posts", updatedPosts);
        updateAllPostState(updatedPosts);
      }
      if (path === "/myposts") {
        UpdateLocalStorageItem("userposts", {
          ...responseBody,
          id: editContent.id,
        });
        const updatedPosts = GetItemFromLocalStorage("userposts");
        updateUserPostState(updatedPosts);
      }

      RemoveItemFromLocalStorage("edit");
      backHandler();
    };
    fetchPosts(
      {
        url: `https://jsonplaceholder.typicode.com/posts/${editContent.userId}`,
        method: "PUT",
        body: {
          id: editContent.id,
          title: title,
          body: body,
          userId: editContent.userId,
        },
        headers: {
          "Content-Type": "application/json",
        },
        errorMessage: "Failed to update article",
      },
      getResponse
    );
  };

  useEffect(() => {
    const editContent = GetItemFromLocalStorage("edit");
    if (editContent) {
      setTitle(editContent.title);
      setBody(editContent.body);
      setUpdate(true);
    }
  }, []);

  return (
    <>
      <Navigation />
      <div className="new__post--iconbox">
        <BsArrow90DegLeft className="new__post--icon" onClick={backHandler} />
      </div>
      <Card className="new__post--card">
        <form>
          <Input
            label="Title"
            type="text"
            placeholder="What is your article title"
            name="title"
            onChange={titleOnChangeHandler}
            value={title}
          />
          <Input
            field="textarea"
            label="Body"
            type="text"
            placeholder="Type your post body here..."
            name="body"
            value={body}
            onChange={bodyOnChangeHandler}
          />

          <div className="new__post--box">
            {update ? (
              <Button
                type="submit"
                className="new__post--button"
                onClick={updatePostHandler}
              >
                Update!
              </Button>
            ) : (
              <Button
                type="submit"
                className="new__post--button"
                onClick={addPostHandler}
              >
                Add!
              </Button>
            )}
          </div>
        </form>
      </Card>
    </>
  );
};
export default AddNewPost;
