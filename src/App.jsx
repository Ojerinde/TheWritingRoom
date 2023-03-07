import { lazy, Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import LandingPage from "./pages/landingpage";
import MyPosts from "./pages/myposts";

// Dynamic Imports (Lazy - loading)
const Home = lazy(() => import("./pages/home"));

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
          <Route path="/home" element={<Home />} />
          <Route path="/myposts" element={<MyPosts />} />

          {/* <Route path="/home" element={<AppHome />}>
            <Route path="" element={<Home />} />
            <Route path=":id" element={<RepoDetails />} />
          </Route> */}
          {/* Routes that will be matched if none of tthe route(s) is matched */}
          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};
export default App;
