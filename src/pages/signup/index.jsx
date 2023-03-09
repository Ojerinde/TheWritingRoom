import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { AddUserToLocalStorage } from "../../lib/Validations";

import Form from "./Form";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const { isLoading, error, success, fetchRequest: fetchUsers } = useFetch();
  const signUpHandler = async (formData) => {
    const getUsers = (responseBody) => {
      AddUserToLocalStorage("users", responseBody);
    };
    fetchUsers(
      {
        url: "https://jsonplaceholder.typicode.com/users",
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
        errorMessage: "Signing Up failed",
      },
      getUsers
    );
  };

  return (
    <>
      <div className={classes.login}>
        <h1 className={classes.h1}>Hello!</h1>
        <Form
          onSubmit={signUpHandler}
          isLoading={isLoading}
          error={error}
          success={success}
        />
        <p className={classes.p}>
          Already have an account?
          <Link to="/login" className={classes.a}>
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignUp;
