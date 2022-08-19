import classes from "./Launcher.module.scss";
import "../../../styles/mixins.scss";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

const Launcher = () => {
  return (
    <div className={classes.launcher}>
      <div className={classes.launcher__header}>
        <img
          src="itravel-icon.png"
          alt="Logo White"
          className={classes.launcher__header__logo}
        />

        <ul className={classes.launcher__header__nav}>
          <li>
            <HashLink
              smooth
              to="#works"
              className={classes.launcher__header__nav__element}
            >
              How it Works
            </HashLink>
          </li>
          <li>
            <HashLink
              smooth
              to="#aboutus"
              className={classes.launcher__header__nav__element}
            >
              About Us
            </HashLink>
          </li>
          <li>
            <HashLink
              smooth
              to="#download"
              className={classes.launcher__header__nav__element}
            >
              Download Our App
            </HashLink>
          </li>
          <li>
            <HashLink
              smooth
              to="#sign-up"
              className={classes.launcher__header__nav__element}
            >
              Sign up
            </HashLink>
          </li>
        </ul>
      </div>

      <div className={classes["launcher__text-box"]}>
        <h1>
          “Traveling – it leaves you speechless,
          <br />
          then turns you into a storyteller”
        </h1>
        <Link
          to="/signup"
          className={`${"btn"} ${"btn__launcher"} ${"btn__launcher--solid"}`}
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className={`${"btn"} ${"btn__launcher"} ${"btn__launcher--empty"}`}
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Launcher;
