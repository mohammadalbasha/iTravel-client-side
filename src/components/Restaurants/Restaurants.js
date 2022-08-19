import { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Restaurants.module.scss";
//import { useNavigate } from 'react-router-dom'; react router 6 

import Spinner from "../Spinner/spinner";
import Error from "../Spinner/error";
import LocationContext from "../../store/location-context";
import useHttp from "../../hooks/use-http";
import { useEffect } from "react";
import { useContext } from "react";

const Restaurants = () => {
  //use array of states instead for like.

  //const navigate = useNavigate(); react router 6 

  const [isFavorite, setIsFavorite] = useState(false);
  const [restaurants, setRestaurants] = useState();

  const [FilteredRestaurants, setFilteredRestaurants] = useState(restaurants); 
  const locationCtx = useContext(LocationContext);
  const {isLoading, error, success, sendRequest : getRestaurants} = useHttp();

  const cuisines= [
    'Lebanese',
    'Mediterranean',
    'Middle Eastern',
    'Vegetarian Friendly',
    'Halal',
    'Cafe',
    'Central European',
    'European',
    'Turkish',
    'German',
    'American',


  ]

  useEffect(() => {
    const url = 'https://itravel-yymm.herokuapp.com/restaurants/getRestaurants';
    const values = {
        country : locationCtx.csc.country,
        city : locationCtx.csc.state
    }
    const responseHandler = (restaurants) => {
        setRestaurants(restaurants);
        setFilteredRestaurants(restaurants);
    };
    getRestaurants({
        url,
        method: 'POST',
        body: values
    }, responseHandler);

  }, [locationCtx.csc]);


  const filterHandler = (value) => {
    let filterdRestaurants = restaurants.filter (restaurant => {
        var bool = false;
        if (restaurant.cuisine){
            for (let i = 0 ; i < restaurant.cuisine.length ; i++){
                if (restaurant.cuisine[i] == value){
                    bool = true;
                    break;
                }
            }
        }
        
        if (restaurant.dietary_restrictions){
            for (let i = 0 ; i < restaurant.dietary_restrictions.length ; i++){
                if (restaurant.dietary_restrictions[i] == value){
                    bool = true;
                    break;
                }
            }
        }
        
        return bool;
    });
    setFilteredRestaurants(filterdRestaurants);
  }


  const favoriteHandler = () => {
    console.log("hello");
    isFavorite ? setIsFavorite(false) : setIsFavorite(true);
    //add to favorites
  };

  return (
    <div>
      <div className={classes.restaurants__header}>
        <h3 className={classes.restaurants__header__title}>
          Find your table for any occasion
        </h3>
      </div>

      <div className={classes.restaurants__search}>
        <p className={classes.restaurants__search__paragraph}>
          Explore Restaurants near to <span>{locationCtx.csc.country},{locationCtx.csc.state}</span>:
        </p>
      </div>
      <div className={classes.restaurants__filters}>
          <div className={classes.restaurants__filters__group}>
            <label className={classes.restaurants__filters__label}
            htmlFor="filter"
            >
              Filter:
            </label>
            <select
                id="filter"
                name="filter"
                className={classes.restaurants__filters__input}
                defaultValue={"default"}
                required
                //ref={experienceTypeInputRef}
              >
                <option value="default" disabled>
                  Please select
                </option>
               {
                cuisines.map((cuisine, i) => {
                  return (
                    <option onClick={() => filterHandler(cuisine)} value={cuisine}>{cuisine}</option>
                  )
                })
               }
              </select>
          
          </div>

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
  FilteredRestaurants && (

    <div className={classes.restaurants}>    
    {
      FilteredRestaurants.map (restaurant => {
        return (
          
      <div className={classes.restaurant}>
      <img
        src={restaurant.images ? restaurant.images.small.url : ''}
        alt="restaurant picture"
        className={classes.restaurant__img}
      />
      <svg
        className={classes.restaurant__like}
        onClick={favoriteHandler}
        style={{ fill: isFavorite ? "#f40000" : "#fff" }}
      >
        <use xlinkHref="images/sprite.svg#icon-heart1"></use>
      </svg>
      <h5 className={classes.restaurant__name}>{restaurant.name}</h5>
      <div className={classes.restaurant__location}>
        <svg>
          <use xlinkHref="images/sprite.svg#icon-location"></use>
        </svg>
        <p>{restaurant.address}</p>
      </div>
      <div className={classes.restaurant__stars}>
        <svg>
          <use xlinkHref="images/sprite.svg#icon-star"></use>
        </svg>
        <p>{restaurant.rating}</p>
      </div>
      <div className={classes.restaurant__rank}>
        <svg>
          <use xlinkHref="images/sprite.svg#icon-trophy"></use>
        </svg>
        <p>{restaurant.ranking}</p>
      </div>
      <div className={classes.restaurant__website}>
        <svg>
          <use xlinkHref="images/sprite.svg#icon-globe"></use>
        </svg>
        <a href={restaurant.website} className={classes.restaurant__link}>
          Visit Website
        </a>
      </div>
      {/* <Link //to="/restaurant-info" 
      onClick={() => {
        navigate('/restaurant-info',  passing data across pages in react router 6 
        {
            state: {...restaurant}
        });
}

      }
      className={classes.restaurant__btn}>
        Show more
      </Link> */}
      <Link to={{
                  pathname : "/restaurant-info",
                  state : {...restaurant}
                }}
      
      className={classes.restaurant__btn}>
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
  );
};

export default Restaurants;
