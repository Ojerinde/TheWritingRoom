import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import LandingPage from "./pages/landingpage";
import MyPostsHome from "./pages/myposts";
import MyPosts from "./pages/myposts/MyPosts";
import AddNewPost from "./pages/myposts/AddPost";
import PostDetails from "./pages/myposts/PostDetails";
import PostsHome from "./pages/home";
import NotFound from "./pages/404/NotFound";
import {
  GetItemFromLocalStorage,
  SetItemToLocalStorage,
} from "./lib/Validations";

// Dynamic Imports (Lazy - loading)
const Home = lazy(() => import("./pages/home/Home"));

// Error Boundary FallbackComponent: This is the function that will be called whenever the errorboundary component caught an error
const ErrorFallback = (props) => {
  return (
    <div role="alert" className="boundary__error">
      <p>Something went wrong!</p>
      <pre>{props.error.message}</pre>
      <button onClick={props.resetErrorBoundary}>Restart app</button>
    </div>
  );
};

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const users = GetItemFromLocalStorage("users");
    if (!users) {
      SetItemToLocalStorage("users", [
        {
          firstname: "Ojerinde",
          lastname: "Joel",
          email: "joelojerinde@gmail.com",
          password: "Password@123",
          confirmpassword: "Password@123",
        },
      ]);
    }
  }, []);
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        navigate("/");
      }}
    >
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Nexted Route */}
          <Route path="/posts" element={<PostsHome />}>
            <Route path="" element={<Home />} />
            <Route path=":postId" element={<PostsHome />}>
              <Route path="" element={<PostDetails />} />
              <Route path="edit" element={<AddNewPost />} />
            </Route>
          </Route>

          {/* Nexted Route */}
          <Route path="/myposts" element={<MyPostsHome />}>
            <Route path="" element={<MyPosts />} />
            <Route path="addpost" element={<AddNewPost />} />
            <Route path=":postId" element={<PostsHome />}>
              <Route path="" element={<PostDetails />} />
              <Route path="edit" element={<AddNewPost />} />
            </Route>
          </Route>

          {/* Routes that will be matched if none of tthe route(s) is matched */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};
export default App;
