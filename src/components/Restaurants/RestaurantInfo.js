import classes from "./RestaurantInfo.module.scss";
import { useState } from "react";
import MapSection from "../Map/Map";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useLocation } from 'react-router-dom';
import { useRef } from "react";


const RestaurantInfo = () => {
  const { state } = useLocation();
  const restaurant = useRef({...state}).current;
  
  const [isFavorite, setIsFavorite] = useState(true);
  const favoriteHandler = () => {
    console.log("hello");
    isFavorite ? setIsFavorite(false) : setIsFavorite(true);
    //add to favorites
  };

  const location = {
    lat: restaurant.latitude,
    lng: restaurant.longitude,
  };

  const slideImages = [
    {
      url: "images/slide_11.jpg",
    },
    {
      url: "images/slide_11.jpg",
    },
    {
      url: "images/slide_13.jpg",
    },
  ];

  return (
    <>
      <section className={classes.restaurantInfo}>
        <div className={classes.restaurantInfo__head}>
          <div className={classes.restaurantInfo__title}>
            <div className={classes.restaurantInfo__title__stick}>&nbsp;</div>
            <span className={classes.restaurantInfo__title__header}>
              {restaurant.name}
            </span>
          </div>

          <h3 className={classes.restaurantInfo__header}>Information:</h3>
          <ul className={classes.restaurantInfo__head__list}>
            <li className={classes.restaurantInfo__head__list__item}>
              <svg className={classes.restaurantInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-star"></use>
              </svg>
              <h3 className={classes.restaurantInfo__head__list__item__header}>
                Stars:
              </h3>
              <span className={classes.restaurantInfo__head__list__item__text}>
                {restaurant.rating}
              </span>
            </li>
            <li className={classes.restaurantInfo__head__list__item}>
              <svg className={classes.restaurantInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-old-phone"></use>
              </svg>
              <h3 className={classes.restaurantInfo__head__list__item__header}>
                Phone:
              </h3>
              <span className={classes.restaurantInfo__head__list__item__text}>
                {restaurant.phone}
              </span>
            </li>

            <li className={classes.restaurantInfo__head__list__item}>
              <svg className={classes.restaurantInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-mail"></use>
              </svg>
              <h3 className={classes.restaurantInfo__head__list__item__header}>
                Email:
              </h3>
              <span className={classes.restaurantInfo__head__list__item__text}>
                {restaurant.email}
              </span>
            </li>
            <li className={classes.restaurantInfo__head__list__item}>
              <svg className={classes.restaurantInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-globe"></use>
              </svg>
              <h3 className={classes.restaurantInfo__head__list__item__header}>
                Website:
              </h3>
              <a
                href={restaurant.website}
                className={classes.restaurantInfo__head__list__item__text}
              >
                Click here
              </a>
            </li>
            <li className={classes.restaurantInfo__head__list__item}>
              <svg className={classes.restaurantInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-address"></use>
              </svg>
              <h3 className={classes.restaurantInfo__head__list__item__header}>
                Address:
              </h3>
              <span className={classes.restaurantInfo__head__list__item__text}>
               {restaurant.address}
              </span>
            </li>
          </ul>
        </div>

        <div className={classes.restaurantInfo__body}>
          <div
            className={classes.restaurantInfo__body__favorites}
            onClick={favoriteHandler}
            style={{ backgroundColor: isFavorite ? "transparent" : "#2ba04c" }}
          >
            <svg
              className={classes.restaurantInfo__body__favorites__icon}
              style={{ color: isFavorite ? "#777" : "white" }}
            >
              <use xlinkHref="/images/sprite.svg#icon-bookmarks"></use>
            </svg>
            <span style={{ color: isFavorite ? "#777" : "white" }}>
              {isFavorite ? " Add to favorites" : " Remove from favorites "}
            </span>
          </div>

          <h3 className={classes.restaurantInfo__header}>Cuisine:</h3>
          <ul className={classes.restaurantInfo__body__list}>
            {restaurant.cuisine && restaurant.cuisine.map(el => {
              return (
<li className={classes.restaurantInfo__body__list__item}>
              {el}
            </li>
              )
            })}
            
            
            
            </ul>

          <h3 className={classes.restaurantInfo__header}>
            Dietary Restrictions:
          </h3>

          <ul className={classes.restaurantInfo__body__list}>
            
            {restaurant.dietary_restrictions && restaurant.dietary_restrictions.map(el => {
              return (
                <li className={classes.restaurantInfo__body__list__item}>
                {el}
              </li>
              )
            })}
            
           
         
          </ul>
        </div>
      </section>

      <section className={classes.gallery}>
        <h3
          className={`${classes.restaurantInfo__header} ${classes["restaurantInfo__header--sub"]}`}
        >
          Gallery:
        </h3>
        <div style={{ margin: "0 9rem", marginBottom: "2rem" }}>
          {/* {restaurant.images && restaurant.images.map((slideImage, index) => (
            <div className="each-slide" key={index}>
              <div
                style={{
                  backgroundImage: `url(${slideImage.large.url})`,
                  height: "90vh",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
          ))} */}
{restaurant.images && 
  <div className="each-slide" key={1} >
              <div
                style={{
                  backgroundImage: `url(${restaurant.images.large.url})`,
                  height: "70vh",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>

}
        </div>
      </section>

      <section className={classes.location}>
        <h3
          className={`${classes.restaurantInfo__header} ${classes["restaurantInfo__header--sub"]}`}
        >
          Location:
        </h3>
        <MapSection location={location} zoomLevel={17} />
      </section>
    </>
  );
};

export default RestaurantInfo;
