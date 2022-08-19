import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from './Stays.module.scss';

import useHttp from "../../hooks/use-http";
import LocationContext from "../../store/location-context";

import Spinner from "../Spinner/spinner";
import Error from "../Spinner/error";
const dummyStays = [
  {
      "property": {
          "propertyName": "stay",
          "propertyType": "sweet",
          "rooms": "2",
          "floor": "first"
      },
      "location": {
          "country": "Syria",
          "city": "Damascus",
          "area": "kalamon",
          "address": "yabrud/40th street",
          "facingDirection": "adel saad school"
      },
      "price": {
          "rentalPrice": "300"
      },
      "contact": {
          "phoneNumber": "0998765432",
          "email": "hamoudy00128@hotmail.com"
      },
      "_id": "62ba4031fcd2ad491c0ced1b",
      "features": [],
      "description": "furnished appartment , warm in winter cold in summer , nice view , tv , fridge , water cooler ",
      "images": [
          "https://res.cloudinary.com/dn9mwwr0j/image/upload/v1656373275/images/1656373266918bluck.jpg.jpg",
          "https://res.cloudinary.com/dn9mwwr0j/image/upload/v1656373297/images/1656373268434112380.jpg.jpg",
          "https://res.cloudinary.com/dn9mwwr0j/image/upload/v1656373291/images/16563732856721234.png.png"
      ],
      "contactRenewal": "conrenw",
      "__v": 0
  }
]

const Stays = () => {
  //use array of states instead for like.
  const [isFavorite, setIsFavorite] = useState(false);
  const [stays, setStays] = useState();
  const {isLoading, success, error, sendRequest: getStays} = useHttp();
  const locationCtx = useContext(LocationContext);
  
  useEffect(() => {

    const responseHandler = (staysData) => {
      console.log(staysData)
      setStays(staysData);
    };

    const country = locationCtx.csc.country;
    const state = locationCtx.csc.state;

    const url = `https://itravel-yymm.herokuapp.com/stays/getStays?country=${country}&city=${state}`;
    getStays ({url}, responseHandler);

  }, []);
  console.log(stays);

  const displayMyPostsHandler = () => {
    console.log("hello");
    //filter results to my posts
  };
  const favoriteHandler = () => {
    console.log("hello");
    isFavorite ? setIsFavorite(false) : setIsFavorite(true);
    //add to favorites
  };
  


  return <div>
    <div className={classes.stays__header}>
        <h3 className={classes.stays__header__title}>
          Find your fresh start 
        </h3>
        <span className={classes['stays__header__title--sub']}>(Houses and apartments for rent)</span>
      </div>

      <div className={classes.stays__search}>
        <p className={classes.stays__search__paragraph}>
          Explore houses in <span>{locationCtx.csc.country},{locationCtx.csc.state}</span>:
        </p>
        {/* <button
          type="button"
          className="btn btn__hero  btn__hero--login btn__hero--submit"
          style={{ marginRight: "5rem", width: '14rem', fontSize: '1.2rem', cursor:'pointer'}}
          onClick={displayMyPostsHandler}
        >
          View my Posts
        </button> */}
      </div>
      {
        isLoading && (
          <Spinner/>
        )
      }
      {
        error && (
          <Error>
          {error}
             </Error>
        )
      }
      {
        stays && (
          <div className={classes.stays}>

          {
            stays.map (stay => {
              return (
                <div className={classes.stay}>
            <img
              src={stay.images[0]}
              alt="house picture"
              className={classes.stay__img}
            />
            <svg
              className={classes.stay__like}
              onClick={favoriteHandler}
              style={{ fill: isFavorite ? "#f40000" : "#fff" }}
            >
              <use xlinkHref="images/sprite.svg#icon-heart1"></use>
            </svg>
            <h5 className={classes.stay__name}>{stay.property.propertyName}</h5>
            <div className={classes.stay__location}>
              <svg>
                <use xlinkHref="images/sprite.svg#icon-location"></use>
              </svg>
              <p>{stay.location.city}</p>
            </div>
            <div className={classes.stay__rooms}>
              <svg>
                <use xlinkHref="images/sprite.svg#icon-home3"></use>
              </svg>
              <p>{stay.property.rooms}</p>
            </div>
  
            <div className={classes.stay__area}>
              <svg>
                <use xlinkHref="images/sprite.svg#icon-enlarge"></use>
              </svg>
              <p>{stay.location.area} m<sup>2</sup></p>
            </div>
            <div className={classes.stay__price}>
              <svg>
                <use xlinkHref="images/sprite.svg#icon-price-tag"></use>
              </svg>
              <p>{stay.price.rentalPrice}</p>
            </div>
            <Link to={`/stay-info/${stay._id}`} className={classes.stay__btn}>
              Show more
            </Link>
          </div>
              )
            })
          }
          
        </div>
   
        )
      }
  </div>
};

export default Stays;