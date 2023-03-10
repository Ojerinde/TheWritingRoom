import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
// import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import logo from "../../assets/favicon-2.png";
import { AppContext } from "../../store/AppContext";
import {
  GetItemFromLocalStorage,
  SetItemToLocalStorage,
} from "../../lib/Validations";
// import useFetch from "../../hooks/useFetch";

const Navigation = () => {
  const navigate = useNavigate();
  const { isLoggedIn, updateLoggedInState } = useContext(AppContext);
  const loggedIn = GetItemFromLocalStorage("isLoggedIn");

  useEffect(() => {
    // Sticky navigation
    const nav = document.querySelector("#nav");
    const header = document.querySelector(".navigation__container");

    const stickyNav = function (entries) {
      const [entry] = entries;
      if (!entry.isIntersecting) nav.classList.add(`sticky`);
      else nav.classList.remove(`sticky`);
    };

    const headerObserver = new IntersectionObserver(stickyNav, {
      root: null,
      threshold: 0,
    });

    headerObserver.observe(header);
  }, []);

  const logOutHandler = () => {
    updateLoggedInState(false);
    SetItemToLocalStorage("isLoggedIn", { isLoggedin: false });
  };
  const logInHandler = () => {
    updateLoggedInState(true);
  };

  return (
    <header className="navigation__container" id="header">
      <nav className="main__header" id="nav">
        <div
          className="logo"
          onClick={() => {
            navigate("/posts");
          }}
        >
          <img src={logo} alt="Joe's Blog" />
          <h3>Joe's Blog</h3>
        </div>
        <ul>
          <li>
            <NavLink
              to="/myposts"
              className={({ isActive }) => (isActive ? "header__active" : "")}
            >
              My Posts
            </NavLink>
          </li>
          <li>
            {isLoggedIn || loggedIn.isLoggedin ? (
              <Link to="/" onClick={logOutHandler}>
                Logout
              </Link>
            ) : (
              <Link to="/login" onClick={logInHandler}>
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
