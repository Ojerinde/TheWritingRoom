import { useState } from "react";
import { BsArrow90DegLeft } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

import Navigation from "../../components/Navigation/Navigation";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input/Input";

const AddNewPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const backHandler = () => {
    const lastIndex = pathname.lastIndexOf("/");
    console.log(pathname.slice(0, lastIndex));
    navigate(pathname.slice(0, lastIndex));
  };
  const titleOnChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const bodyOnChangeHandler = (e) => {
    setBody(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Navigation />
      <div className="new__post--iconbox">
        <BsArrow90DegLeft className="new__post--icon" onClick={backHandler} />
      </div>
      <Card className="new__post--card">
        <form onSubmit={submitHandler}>
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
            <Button type="submit" className="new__post--button">
              Add!
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};
export default AddNewPost;
