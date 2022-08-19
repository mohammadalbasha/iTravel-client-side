import React, {useState} from 'react';
import { Link } from "react-router-dom";

import classes from "./Attraction.module.scss";

const Attraction = (props) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const favoriteHandler = () => {
        console.log("hello");
        isFavorite ? setIsFavorite(false) : setIsFavorite(true);
        //add to favorites
      };

    return (
        <div className={classes.attraction}>
          <svg
            className={classes.attraction__like}
            onClick={favoriteHandler}
            style={{ fill: isFavorite ? "#f40000" : "#4fba6f" }}
          >
            <use xlinkHref="/images/sprite.svg#icon-heart1"></use>
          </svg>
          <Link 
                to={{
                  pathname : "/add-to-tour-plan",
                  state : {
                    name : props.name,
                    category : props.category,
                    state_district : props.state_district,
                    address : props.address
                  }
                }}
                // passing data across pages in react router 6 
          //       onClick={() => {
          //         navigate('/restaurant-info',  passing data across pages in react router 6 
          //         {
          //             state: {...restaurant}
          //         });
          // }
          
          //       }
                title="add to a tour plan" className={classes.attraction__link}>
            <svg className={classes.attraction__link__add}>
              <use xlinkHref="/images/sprite.svg#icon-circle-with-plus"></use>
            </svg>
          </Link>

          <h5 className={classes.attraction__name}>{props.name}</h5>
          <div className={classes.attraction__location}>
            <svg>
              <use xlinkHref="/images/sprite.svg#icon-location"></use>
            </svg>
            <p>{props.city}</p>
          </div>
          <div className={classes.attraction__location}>
            <svg>
              <use xlinkHref="/images/sprite.svg#icon-location"></use>
            </svg>
            <p>{props.state_district? props.state_district : ''}</p>
          </div>
          <div className={classes.attraction__stars}>
            <svg>
              <use xlinkHref="/images/sprite.svg#icon-star"></use>
            </svg>
            <p>{props.categories[0]? props.categories[0] : props.category}</p>
          </div>
          <div className={classes.attraction__stars}>
            <svg>
              <use xlinkHref="/images/sprite.svg#icon-star"></use>
            </svg>
            <p>{props.categories[1]? props.categories[1] : props.category}</p>
          </div>
          <div className={classes.attraction__website}>
            <svg>
              <use xlinkHref="/images/sprite.svg#icon-globe"></use>
            </svg>
            <a href={props.website} className={classes.attraction__link}>
            {props.website? 'Visit Website' : 'Not Available'}
            </a>
          </div>
          {/* <Link to="/attraction-info" className={classes.attraction__btn}>
            Show more
          </Link> */}
          <button className={classes.attraction__btn}
                  onClick={() => props.showInfoHandler({name : 'قصر تشرين'})}>
            Show more
          </button>
        </div>
    )
}

export default Attraction;