import { ImSpinner10 } from "react-icons/im";
import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ type }) => {
  return (
    <div
      className={`${
        type === "full"
          ? `${classes.spinner__boxfull}`
          : `${classes.spinner__box}`
      }`}
    >
      <ImSpinner10 className={classes.spinner} />
    </div>
  );
};
export default LoadingSpinner;
