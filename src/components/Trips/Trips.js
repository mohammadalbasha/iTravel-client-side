import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import classes from './Trips.module.scss';
import LocationContext from "../../store/location-context";
import { Country, State, City }  from 'country-state-city';
import useHttp from "../../hooks/use-http";

import Spinner from "../Spinner/spinner";
import Error from "../Spinner/error";

const Trips = () => {
  //use array of states instead for like.
  const [isFavorite, setIsFavorite] = useState(false);
  const LocationCtx = useContext(LocationContext);
  const [country, setCountry] = useState({});

  const {isLoading, error, success, sendRequest : getTrips} = useHttp();

  const [trips, setTrips] = useState();

  const [launchState, setLaunchState] = useState();
  const [destiantionState, setDestinationState] = useState();
  
  const launchStateHandler = (state) => {
    setLaunchState(state);
  }
  const destinationStateHandler = (state) => {
    setDestinationState(state);
  }

  useEffect(() => {
          
      Country.getAllCountries().map(country => {
        if (country.name == LocationCtx.csc.country){
          setCountry(country);
        }
      })
  
  }, [LocationCtx.csc]) ;

  
  const searchFilterRef = useRef();


  const submitHandler = (event) => {
    event.preventDefault();
    const country = LocationCtx.csc.country;
    const searchFilter = searchFilterRef.current.value;
    const url = `https://itravel-yymm.herokuapp.com/trips/getTrips?country=${country}&launchCity=${launchState}&destinationCity=${destiantionState}&searchFilter=${searchFilter}`
    const responseHandler = (trips) => {
      setTrips(trips);
    }
    getTrips({url},responseHandler);
  } 

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
    <div className={classes.trips__header}>
        <h3 className={classes.trips__header__title}>
          Find your fresh trip 
        </h3>
      </div>

      <div className={classes.trips__search}>
        <p className={classes.trips__search__paragraph}>
          Explore trips in <span>{LocationCtx.csc.country}</span>:
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
      <div className={classes.trips__filters}>
          <div className={classes.trips__filters__group}>
            <label className={classes.trips__filters__label}
            htmlFor="launchState"
            >
              Launch State:
            </label>
            <select
                id="launchState"
                name="launchState"
                className={classes.trips__filters__input}
                defaultValue={"default"}
                required
                //ref={experienceTypeInputRef}
              >
                <option value="default" disabled>
                  Please select
                </option>
               {country  && 
                State.getStatesOfCountry(country.isoCode).map((state, i) => {
                  return (
                    <option onClick={() => launchStateHandler(state.name)} value={state.name}>{state.name}</option>
                  )
                })
               }
              </select>
          
          </div>

          <div className={classes.trips__filters__group}>
            <label className={classes.trips__filters__label}
            htmlFor="destinationState"
            >
              Destination City:
            </label>
            <select
                id="destinationState"
                name="destiantionState"
                className={classes.trips__filters__input}
                defaultValue={"default"}
                required
                //ref={experienceTypeInputRef}
              >
                <option value="default" disabled>
                  Please select
                </option>
               {country && 
                State.getStatesOfCountry(country.isoCode).map((state, i) => {
                  return (
                    <option onClick={() => destinationStateHandler(state.name)} value={state.name}>{state.name}</option>
                  )
                })
               }
              </select>
          
          </div>

 
<div className={classes.trips__filters__group}>
            <label className={classes.trips__filters__label}
            htmlFor="searchFilter"
            >
              Search filter:
            </label>
            <input
                id="searchFilter"
                name="searchFilter"
                type="text"
                className={classes.trips__filters__input}
                ref={searchFilterRef}
                />
                
              
          
          </div>
          
          <button onClick={submitHandler} className={classes.trips__filters__submit}>
            submit
          </button>


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
        trips && (
          <div className={classes.trips}>
            {
              trips.map(trip => {
                return (
                  <div className={classes.trip}>
                  <img
                    src={trip.images[0]}
                    alt="trip picture"
                    className={classes.trip__img}
                  />
                  <svg
                    className={classes.trip__like}
                    onClick={favoriteHandler}
                    style={{ fill: isFavorite ? "#f40000" : "#fff" }}
                  >
                    <use xlinkHref="images/sprite.svg#icon-heart1"></use>
                  </svg>
                  <h5 className={classes.trip__name}>{trip.generalInformations.tripName}</h5>
                  <div className={classes.trip__location}>
                    <svg>
                      <use xlinkHref="images/sprite.svg#icon-location"></use>
                    </svg>
                    <p>{trip.location.destinationCity},{trip.location.destiantionCity}</p>
                  </div>
                  <div className={classes.trip__rooms}>
                    <svg>
                      <use xlinkHref="images/sprite.svg#icon-truck"></use>
                    </svg>
                    <p>{trip.generalInformations.transportations}</p>
                  </div>
        
                  <div className={classes.trip__area}>
                    <svg>
                      <use xlinkHref="images/sprite.svg#icon-hour-glass1"></use>
                    </svg>
                    <p>{trip.generalInformations.duration}</p>
                  </div>
                  <div className={classes.trip__price}>
                    <svg>
                      <use xlinkHref="images/sprite.svg#icon-coin-dollar"></use>
                    </svg>
                    <p>{trip.price.cost} {trip.price.currency}</p>
                  </div>
                  <Link to={`/trip-info/${trip._id}`} className={classes.trip__btn}>
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

export default Trips;