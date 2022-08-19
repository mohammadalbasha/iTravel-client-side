import { useContext, useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./MainNavigation.module.scss";
import "../../styles/mixins.scss";


const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  //const isLoggedIn = authCtx.isLoggedIn;
  const [isNavActive, setIsNavActive] = useState(false);
  const backdropRef = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isNavActive && backdropRef.current && !backdropRef.current.contains(e.target)) {
        setIsNavActive(false);
      }
    };

    document.addEventListener("click", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [isNavActive]);

  const logoutHandler = () => {
    authCtx.logout();
  };

  const navSwitchHandler = () => {
    isNavActive ? setIsNavActive(false) : setIsNavActive(true);
  };

  return (
    <nav className={classes.nav}>
      <button
        className={`${classes.nav__btn} ${classes["nav__btn--open"]}`}
        onClick={navSwitchHandler}
      >
        <i className="fas fa-bars"></i>
      </button>
      <div
        className={`${classes.nav__slider} ${classes["nav__slider--black"]} ${
          isNavActive ? classes.visible : ""
        }`}
        ref={backdropRef}
      >
        <div
          className={`${classes.nav__slider} ${classes["nav__slider--green"]} ${
            isNavActive ? classes.visible : ""
          }`}
        >
          <div
            className={`${classes.nav__slider} ${
              classes["nav__slider--white"]
            } ${isNavActive ? classes.visible : ""}`}
          >
            <button
              className={`${classes.nav__btn} ${classes["nav__btn--close"]}`}
              onClick={navSwitchHandler}
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="logoWithHeader">
              <img
                src="/itravel-icon.png"
                alt="itravel Logo"
                className="logoWithHeader__image"
              />
              <h3>iTravel</h3>
            </div>

            <ul className={classes.nav__list}>
              <li className={classes.nav__list__item}>
                <NavLink
                  to="/dashboard"
                  className={classes.nav__list__item__link}
                  onClick={navSwitchHandler}
                >
                  <svg className={classes.nav__list__item__icon}>
                    <use xlinkHref="/images/sprite.svg#icon-blackboard"></use>
                  </svg>
                  <span>Dashboard</span>
                </NavLink>
              </li>

              <li className={classes.nav__list__item}>
                <NavLink
                  to="/main"
                  className={classes.nav__list__item__link}
                  onClick={navSwitchHandler}
                >
                  <svg className={classes.nav__list__item__icon}>
                    <use xlinkHref="/images/sprite.svg#icon-home"></use>
                  </svg>
                  <span>Home</span>
                </NavLink>
              </li>

              <li className={classes.nav__list__item}>
                <NavLink
                  to="/select-trip-option"
                  className={classes.nav__list__item__link}
                  onClick={navSwitchHandler}
                >
                  <svg className={classes.nav__list__item__icon}>
                    <use xlinkHref="/images/sprite.svg#icon-map1"></use>
                  </svg>
                  <span>Trips</span>
                </NavLink>
              </li>

              <li className={classes.nav__list__item}>
                <NavLink
                  to="/hotels"
                  className={classes.nav__list__item__link}
                  onClick={navSwitchHandler}
                >
                  <svg className={classes.nav__list__item__icon}>
                    <use xlinkHref="/images/sprite.svg#icon-office"></use>
                  </svg>
                  <span>Hotels</span>
                </NavLink>
              </li>

              <li className={classes.nav__list__item}>
                <NavLink
                  to="/select-stay-option"
                  className={classes.nav__list__item__link}
                  onClick={navSwitchHandler}
                >
                  <svg className={classes.nav__list__item__icon}>
                    <use xlinkHref="/images/sprite.svg#icon-home2"></use>
                  </svg>
                  <span>Stays</span>
                </NavLink>
              </li>

              <li className={classes.nav__list__item}>
                <NavLink
                  to="/restaurants"
                  className={classes.nav__list__item__link}
                  onClick={navSwitchHandler}
                >
                  <svg className={classes.nav__list__item__icon}>
                    <use xlinkHref="/images/sprite.svg#icon-spoon-knife"></use>
                  </svg>
                  <span>Restaurants</span>
                </NavLink>
              </li>

              <li className={classes.nav__list__item}>
                <NavLink
                  to="/select-attractions-category"
                  className={classes.nav__list__item__link}
                  onClick={navSwitchHandler}
                >
                  <svg className={classes.nav__list__item__icon}>
                    <use xlinkHref="/images/sprite.svg#icon-tree"></use>
                  </svg>
                  <span>Attractions</span>
                </NavLink>
              </li>

              <li className={classes.nav__list__item}>
                <NavLink
                  to="/countries"
                  className={classes.nav__list__item__link}
                  onClick={navSwitchHandler}
                >
                  <svg className={classes.nav__list__item__icon}>
                    <use xlinkHref="/images/sprite.svg#icon-earth"></use>
                  </svg>
                  <span>Countries</span>
                </NavLink>
              </li>

              <li className={classes.nav__list__item}>
                <NavLink
                  to="/select-tour-plan-option"
                  className={classes.nav__list__item__link}
                  onClick={navSwitchHandler}
                >
                  <svg className={classes.nav__list__item__icon}>
                    <use xlinkHref="/images/sprite.svg#icon-tree1"></use>
                  </svg>
                  <span>Tour Plans</span>
                </NavLink>
              </li>


              <li className={classes.nav__list__item}>
                <NavLink
                  to="/select-partner-option"
                  className={classes.nav__list__item__link}
                  onClick={navSwitchHandler}
                >
                  <svg className={classes.nav__list__item__icon}>
                    <use xlinkHref="/images/sprite.svg#icon-slideshare"></use>
                  </svg>
                  <span>Partners</span>
                </NavLink>
              </li>


              <li className={classes.nav__list__item}>
                <NavLink
                  to="/select-advice-and-experience-option"
                  className={classes.nav__list__item__link}
                  onClick={navSwitchHandler}
                >
                  <svg className={classes.nav__list__item__icon}>
                    <use xlinkHref="/images/sprite.svg#icon-light-bulb"></use>
                  </svg>
                  <span>Advices & Experiences</span>
                </NavLink>
              </li>

              <li className={classes.nav__list__item}>
                <NavLink
                  to="/favorites"
                  className={classes.nav__list__item__link}
                  onClick={navSwitchHandler}
                >
                  <svg className={classes.nav__list__item__icon}>
                    <use xlinkHref="/images/sprite.svg#icon-bookmarks"></use>
                  </svg>
                  <span>Favorites</span>
                </NavLink>
              </li>
              <li className={classes.nav__list__item}>
                <NavLink
                  to="/my-account"
                  className={classes.nav__list__item__link}
                  onClick={navSwitchHandler}
                >
                  <svg className={classes.nav__list__item__icon}>
                    <use xlinkHref="/images/sprite.svg#icon-user"></use>
                  </svg>
                  <span>My account</span>
                </NavLink>
              </li>

              <li className={classes.nav__list__item}>
                <NavLink
                  to="/contactus"
                  className={classes.nav__list__item__link}
                  onClick={navSwitchHandler}
                >
                  <svg className={classes.nav__list__item__icon}>
                    <use xlinkHref="/images/sprite.svg#icon-phone"></use>
                  </svg>
                  <span>Contact us</span>
                </NavLink>
              </li>

              <li className={classes.nav__list__item}>
                <NavLink
                  to="/aboutus"
                  className={classes.nav__list__item__link}
                  onClick={navSwitchHandler}
                >
                  <svg className={classes.nav__list__item__icon}>
                    <use xlinkHref="/images/sprite.svg#icon-bullhorn"></use>
                  </svg>
                  <span>About Us</span>
                </NavLink>
              </li>

              <li className={classes.nav__list__item}>
                <NavLink
                  to="/"
                  className={classes.nav__list__item__link}
                  onClick={logoutHandler}
                >
                  <svg className={classes.nav__list__item__icon}>
                    <use xlinkHref="/images/sprite.svg#icon-exit"></use>
                  </svg>
                  <span>Log out</span>
                </NavLink>
              </li>
            </ul>
            <div className={classes.nav__legal} id="on-nav">
              © 2022 by iTravel, All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
