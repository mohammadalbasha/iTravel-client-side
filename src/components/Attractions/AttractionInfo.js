import classes from "./AttractionInfo.module.scss";
import { useState } from "react";
import MapSection from "../Map/Map";
import "react-slideshow-image/dist/styles.css";
//import { useHistory } from "react-router-dom";

const AttractionInfo = (props) => {
  const [isFavorite, setIsFavorite] = useState(true);
  const [isTourPlan, setisTourPlan] = useState(true);
  //const history = useHistory();

  const favoriteHandler = () => {
    console.log("hello");
    isFavorite ? setIsFavorite(false) : setIsFavorite(true);
    //add to favorites
  };


  const addAsTourPlanHandler = () => {
    console.log("hello");
    if(isTourPlan){
//      history.push("/add-to-tour-plan");
      setisTourPlan(false);
    } else {
      setisTourPlan(true);
      //must delete this place from tour plans here
    }
  };

 

  return (
    <>
      <section className={classes.attractionInfo}>
        <div className={classes.attractionInfo__head}>
          <div className={classes.attractionInfo__title}>
            <div className={classes.attractionInfo__title__stick}>&nbsp;</div>
            <span className={classes.attractionInfo__title__header}>
              {props.name}
            </span>
          </div>

          <h3 className={classes.attractionInfo__header}>
            General information:
          </h3>
          <ul className={classes.attractionInfo__head__list}>
            <li className={classes.attractionInfo__head__list__item}>
              <svg className={classes.attractionInfo__head__list__item__icon}>
                <use xlinkHref="images/sprite.svg#icon-office"></use>
              </svg>
              <h3 className={classes.attractionInfo__head__list__item__header}>
                Attraction type:
              </h3>
              <span className={classes.attractionInfo__head__list__item__text}>
                {props.category}
              </span>
            </li>
            <li className={classes.attractionInfo__head__list__item}>
              <svg className={classes.attractionInfo__head__list__item__icon}>
                <use xlinkHref="images/sprite.svg#icon-globe"></use>
              </svg>
              <h3 className={classes.attractionInfo__head__list__item__header}>
                Website:
              </h3>
              <a
                href={props.website}
                className={classes.attractionInfo__head__list__item__text}
              >
                Click here
              </a>
            </li>
            <li className={classes.attractionInfo__head__list__item}>
              <svg className={classes.attractionInfo__head__list__item__icon}>
                <use xlinkHref="images/sprite.svg#icon-address"></use>
              </svg>
              <h3 className={classes.attractionInfo__head__list__item__header}>
                State District:
              </h3>
              <span className={classes.attractionInfo__head__list__item__text}>
                {props.state_district}
              </span>
            </li>
            <li className={classes.attractionInfo__head__list__item}>
              <svg className={classes.attractionInfo__head__list__item__icon}>
                <use xlinkHref="images/sprite.svg#icon-location2"></use>
              </svg>
              <h3 className={classes.attractionInfo__head__list__item__header}>
                Address:
              </h3>
              <span className={classes.attractionInfo__head__list__item__text}>
                {props.address}
              </span>
            </li>
          </ul>
        </div>

        <div className={classes.attractionInfo__body}>
          <div className={classes.attractionInfo__body__btns}>
            <div
              className={classes.attractionInfo__body__favorites}
              onClick={favoriteHandler}
              style={{
                backgroundColor: isFavorite ? "transparent" : "#2ba04c",
              }}
            >
              <svg
                className={classes.attractionInfo__body__favorites__icon}
                style={{ color: isFavorite ? "#777" : "white" }}
              >
                <use xlinkHref="images/sprite.svg#icon-bookmarks"></use>
              </svg>
              <span style={{ color: isFavorite ? "#777" : "white" }}>
                {isFavorite ? " Add to favorites" : " Remove from favorites "}
              </span>
            </div>

            <div
              className={classes.attractionInfo__body__favorites}
              onClick={addAsTourPlanHandler}
              style={{
                backgroundColor: isTourPlan ? "transparent" : "#2ba04c",
                textDecoration: 'none'
              }}
            >
             
              <svg
                className={classes.attractionInfo__body__favorites__icon}
                style={{ color: isTourPlan ? "#777" : "white" }}
              >
                <use
                  xlinkHref={`images/sprite.svg#icon-circle-with-${
                    isTourPlan ? "plus" : "minus"
                  }`}
                ></use>
              </svg>
              <span style={{ color: isTourPlan ? "#777" : "white" }}>
                {isTourPlan ? " Add as tour plan" : " Remove from tour plans "}
              </span>
            </div>
          </div>

          <h3 className={classes.attractionInfo__header}>Categories:</h3>
          
          <ul className={classes.attractionInfo__body__list}>
            <li className={classes.attractionInfo__body__list__item}>
            building
            </li>
            {props.categories.map((category) => {
              return (
                <li className={classes.attractionInfo__body__list__item}>
                    {category}
                </li>
              )
            })
            }
            </ul>

          <h3 className={classes.attractionInfo__header}>Contacts:</h3>
          <ul className={classes.attractionInfo__body__list}>
            <li className={classes.attractionInfo__head__list__item}>
              <svg className={classes.attractionInfo__head__list__item__icon}>
                <use xlinkHref="images/sprite.svg#icon-old-phone"></use>
              </svg>
              <h3 className={classes.attractionInfo__head__list__item__header}>
                Phone:
              </h3>
              <span className={classes.attractionInfo__head__list__item__text}>
                {props.phone? props.phone : 'Not Available'}
              </span>
            </li>

            <li className={classes.attractionInfo__head__list__item}>
              <svg className={classes.attractionInfo__head__list__item__icon}>
                <use xlinkHref="images/sprite.svg#icon-mail"></use>
              </svg>
              <h3 className={classes.attractionInfo__head__list__item__header}>
                Email:
              </h3>
              <span className={classes.attractionInfo__head__list__item__text}>
                {props.email? props.email : 'Not Available'}
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className={classes.location}>
        <h3
          className={`${classes.attractionInfo__header} ${classes["attractionInfo__header--sub"]}`}
        >
          Location:
        </h3>
        <MapSection location={{lat:props.location.latitude, lng : props.location.longitude}} zoomLevel={17} />
      </section>
    </>
  );
};

export default AttractionInfo;
