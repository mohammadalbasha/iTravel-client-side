import { Link } from "react-router-dom";
import classes from "./Header.module.scss";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import LocationContext from "../../store/location-context";


const Header = () => {
  const authCtx = useContext(AuthContext);
  const locationCtx = useContext(LocationContext);
 
  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <header className={classes.header}>
      <Link
        to="/main"
        className={`${"logoWithHeader"} ${"logoWithHeader--mainHeader"}`}
      >
        <img
          src="/itravel-icon.png"
          alt="itravel Logo"
          className={`${"logoWithHeader__image"} ${"logoWithHeader__image--mainHeader"}`}
        />
        <h3>iTravel</h3>
      </Link>
      <div className={classes.header__user}>
        <Link
          to="/countries"
          className={classes.header__user__link}
          title="Country"
        >
          <img
            src={locationCtx.flag}
            alt="country's flag"
            className={classes.header__user__link__flag}
          />
        </Link>

        <Link
          to="/favorites"
          className={classes.header__user__link}
          title="Languages"
        >
          <svg className={classes.header__user__link__icon}>
            <use xlinkHref="/images/sprite.svg#icon-earth"></use>
          </svg>
        </Link>

        <Link
          to="/favorites"
          className={classes.header__user__link}
          title="Bookmarks"
        >
          <svg className={classes.header__user__link__icon}>
            <use xlinkHref="/images/sprite.svg#icon-bookmarks"></use>
          </svg>
        </Link>

        <Link
          to="/"
          className={classes.header__user__link}
          title="Log out"
          onClick={logoutHandler}
        >
          <svg className={classes.header__user__link__icon}>
            <use xlinkHref="/images/sprite.svg#icon-exit"></use>
          </svg>
        </Link>

        <Link to="/my-account" className={classes.header__user__link}>
          <img
            src={authCtx.profile.imageUrl? authCtx.profile.imageUrl : "/images/userImage.png"}
            alt="User Photo"
            title="User Profile"
            className={`${classes.header__user__link__photo} ${classes["header__user__photo--border"]}`}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
