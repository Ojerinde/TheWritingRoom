import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GetItemFromLocalStorage,
  SetItemToLocalStorage,
} from "../../lib/Validations";
import { AppContext } from "../../store/AppContext";

import Form from "./Form";
import classes from "./Login.module.css";

const Login = () => {
  const [error, setError] = useState({ message: "", hasError: false });
  const { updateLoggedInState } = useContext(AppContext);
  const navigate = useNavigate();
  const signInHandler = async (formData) => {
    const allUsers = GetItemFromLocalStorage("users");
    const user = allUsers.find((user) => user.email === formData.email);
    if (!user) {
      setError({ message: "User does not exists", hasError: true });
      setTimeout(() => {
        setError({ message: "", hasError: false });
      }, 5000);
    } else if (user.password !== formData.password) {
      setError({ message: "Incorrect Password", hasError: true });
      setTimeout(() => {
        setError({ message: "", hasError: false });
      }, 5000);
    } else {
      updateLoggedInState(true);
      SetItemToLocalStorage("isLoggedIn", { isLoggedin: true });
      navigate("/posts");
    }
  };

  return (
    <>
      <div className={classes.login} data-testid="login__page">
        <h1 className={classes.h1}>Welcome back!</h1>
        <Form onSubmit={signInHandler} error={error} />

        <p className={classes.p}>
          Do not have an account?
          <Link to="/signup" className={classes.a}>
            Create now
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
