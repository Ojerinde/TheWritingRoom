import React, { useCallback, useState } from "react";

export const AppContext = React.createContext({
  isLoggedIn: false,
  allPosts: [],
  userPosts: [],
  updateLoggedInState: (data) => {},
  updateAllPostState: (posts) => {},
  updateUserPostState: (posts) => {},
});

const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLogggedIn] = useState(false);
  const [allPosts, setAllPost] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  const updateLoggedInState = useCallback((data) => {
    setIsLogggedIn(data);
  }, []);

  const updateAllPostState = useCallback((posts) => {
    setAllPost(posts);
  }, []);
  const updateUserPostState = useCallback((posts) => {
    setUserPosts(posts);
  }, []);

  const data = {
    isLoggedIn,
    allPosts,
    userPosts,
    updateLoggedInState,
    updateAllPostState,
    updateUserPostState,
  };
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};
export default AppContextProvider;
