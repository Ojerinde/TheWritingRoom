import Navigation from "../../components/Navigation/Navigation";
import AllPosts from "../../components/AllPosts";
import Button from "../../components/UI/Button";
import { BsArrow90DegLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const MyPosts = () => {
  const navigate = useNavigate();
  const backHandler = () => {
    navigate("/posts");
  };
  const addNewPostHandler = () => {
    navigate("/myposts/addpost");
  };
  return (
    <>
      <Navigation />
      <div className="my__posts">
        <BsArrow90DegLeft className="my__posts--icon" onClick={backHandler} />
        <Button className="my__posts--button" onClick={addNewPostHandler}>
          Add New
        </Button>
      </div>
      <AllPosts />
    </>
  );
};
export default MyPosts;
