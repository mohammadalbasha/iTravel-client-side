import { Link } from "react-router-dom";
import classes from "./StaysOptions.module.scss";

const StaysOptions = () => {
  return (
    <div className={classes.staysOptions}>
      <Link to="/add-stay" className={classes.staysOptions__realtor}>
        <span className={classes.staysOptions__realtor__text}>Realtor</span>
        <span className={classes["staysOptions__realtor__text--sub"]}>
          Do you have a real estate for rent? What are you waiting for!! Hit
          enter and fill the form
        </span>
      </Link>

      <Link to="/stays" className={classes.staysOptions__customer}>
        <span className={classes.staysOptions__customer__text}>Customer</span>
        <span className={classes["staysOptions__customer__text--sub"]}>
          Tired of fake rental ads?? You just came to the right place where we
          offer thousands of rental offers. Hit enter and choose your
          appropriate flat.
        </span>
      </Link>
    </div>
  );
};

export default StaysOptions;
