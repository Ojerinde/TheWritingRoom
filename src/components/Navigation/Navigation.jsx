import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import logo from "../../assets/favicon-2.png";
// import useFetch from "../../hooks/useFetch";

const Navigation = () => {
  const navigate = useNavigate();
  const isLoggedIn = true;

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
  });

  return (
    <header className="navigation__container">
      <nav className="main__header" id="nav">
        <div
          className="logo"
          onClick={() => {
            navigate("/home");
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
            {isLoggedIn ? (
              <Link to="/">Logout</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
