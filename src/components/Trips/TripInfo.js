import classes from "./TripInfo.module.scss";
import { useState, useEffect, useContext } from "react";
import MapSection from "../Map/Map";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Link, useParams } from "react-router-dom";

import Spinner from "../Spinner/spinner";
import Error from "../Spinner/error";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";

import InterestedPeopleList from "../InterestedPeopleList/InterestedPeopleList";
import Modal from "../Modal/Modal";
import Backdrop from "../Modal/Backdrop";

const TripInfo = () => {
  const [isFavorite, setIsFavorite] = useState(true);
  const [isInterested, setIsInterested] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const authCtx = useContext(AuthContext);
  const {isLoading, success, error, sendRequest : getTrip} = useHttp();

  
  
  const params = useParams();

  const [trip, setTrip] = useState();

  
  useEffect(() => {
    
    const url = `https://itravel-yymm.herokuapp.com/trips/getTrip/${params.tripId}`;
    const responseHandler = (trip) => {
      setTrip(trip);
    };
    getTrip({url}, responseHandler);
  }, []);

  
  useEffect(() => {
    if (!trip)
      return ;
    if (trip.interestedUsers){
      for (let i = 0 ; i < trip.interestedUsers.length ; i++){
        if (authCtx.profile && trip.interestedUsers[i]._id === authCtx.profile._id){
          setIsInterested(true);
          break;
        }
      }
    }
  }, [trip, authCtx.profile])

  

  const editMyPostHandler = () => {
    console.log("hello from edit");
  };

  const deleteMyPostHandler = () => {
    console.log("hello from delete");
  };


  const favoriteHandler = () => {
    console.log("hello");
    isFavorite ? setIsFavorite(false) : setIsFavorite(true);
    //add to favorites
  };


  const {error : errorInterested, sendRequest : addInterestedUser} = useHttp();
  const interestedHandler = () => {
    if (isInterested ) return;
    const url2 = `https://itravel-yymm.herokuapp.com/trips/addInterestedUser/${params.tripId}`;
    const responseHandler2 = () => {
      setIsInterested(true);
    };
  
    addInterestedUser({url : url2, method: 'POST'}, responseHandler2);
  
  }


  return (
    <>
    
    {showModal && <Backdrop  setShowModal={setShowModal}/>}
      {showModal && <Modal  setShowModal={setShowModal}>
       <InterestedPeopleList title = {'Users Interested in this Trip'}  users = {trip ? trip.interestedUsers : []} />
      </Modal>
       }
      
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
  trip && (
    <>
    <section className={classes.tripInfo}>

    <div className={classes.tripInfo__head}>
          <div className={classes.tripInfo__title}>
            <div className={classes.tripInfo__title__stick}>&nbsp;</div>
            <span className={classes.tripInfo__title__header}>
              {trip.generalInformations.tripName}
            </span>
          </div>

          <h3 className={classes.tripInfo__header}>General information:</h3>
          <ul className={classes.tripInfo__head__list}>
            <li className={classes.tripInfo__head__list__item}>
              <svg className={classes.tripInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-users"></use>
              </svg>
              <h3 className={classes.tripInfo__head__list__item__header}>
                Capacity:
              </h3>
              <span className={classes.tripInfo__head__list__item__text}>
                {trip.generalInformations.capacity} <span>people</span>
              </span>
            </li>
            <li className={classes.tripInfo__head__list__item}>
              <svg className={classes.tripInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-hour-glass"></use>
              </svg>
              <h3 className={classes.tripInfo__head__list__item__header}>
                Duration:
              </h3>
              <span className={classes.tripInfo__head__list__item__text}>
                {trip.generalInformations.duration}
              </span>
            </li>
            <li className={classes.tripInfo__head__list__item}>
              <svg className={classes.tripInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-truck"></use>
              </svg>
              <h3 className={classes.tripInfo__head__list__item__header}>
                Transportation:
              </h3>
              <span className={classes.tripInfo__head__list__item__text}>
                {trip.generalInformations.transportations}
              </span>
            </li>
            <li className={classes.tripInfo__head__list__item}>
              <svg className={classes.tripInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-location2"></use>
              </svg>
              <h3 className={classes.tripInfo__head__list__item__header}>
                Launch State:
              </h3>
              <span className={classes.tripInfo__head__list__item__text}>
              {trip.location.launchCity}
              </span>
            </li>
            <li className={classes.tripInfo__head__list__item}>
              <svg className={classes.tripInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-address"></use>
              </svg>
              <h3 className={classes.tripInfo__head__list__item__header}>
               Destination State: 
              </h3>
              <span className={classes.tripInfo__head__list__item__text}>
                {trip.location.destinationCity}
              </span>
            </li>
            <li className={classes.tripInfo__head__list__item}>
              <svg className={classes.tripInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-location2"></use>
              </svg>
              <h3 className={classes.tripInfo__head__list__item__header}>
                Launch Place:
              </h3>
              <span className={classes.tripInfo__head__list__item__text}>
              {trip.location.launchPlace}
              </span>
            </li>
            <li className={classes.tripInfo__head__list__item}>
              <svg className={classes.tripInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-address"></use>
              </svg>
              <h3 className={classes.tripInfo__head__list__item__header}>
               Destination Place: 
              </h3>
              <span className={classes.tripInfo__head__list__item__text}>
                {trip.location.destinationPlace}
              </span>
            </li>
            <li
              className={classes.tripInfo__head__list__item}
              style={{ margin: "2rem 0" }}
            >
              {/* <Link
                to="/add-trip"
                onClick={editMyPostHandler}
                className={`${"btn"} ${"btn__launcher"} ${"btn__launcher--country"} ${"btn__launcher--solid"}`}
                style={{
                  backgroundColor: isMyPost ? "#2ba04c" : "#777",
                  pointerEvents: isMyPost ? "yes" : "none",
                  border: isMyPost ? "#2ba04c" : "#777"
                }}
              >
                Edit
              </Link>
              غ
              <Link
                to="/trips"
                onClick={deleteMyPostHandler}
                className={`${"btn"} ${"btn__launcher"} ${"btn__launcher--country"} ${"btn__launcher--solid"}`}
                style={{
                  backgroundColor: isMyPost ? "#f40" : "#777",
                  pointerEvents: isMyPost ? "yes" : "none",
                  border: isMyPost ? "#f40" : "#777"
                }}
              >
                Delete
              </Link> */}
            </li>
          </ul>
        </div>

        <div className={classes.tripInfo__body}>
          <div className={classes.tripInfo__body__btns}>
            <div
              className={classes.tripInfo__body__favorites}
              onClick={favoriteHandler}
              style={{
                backgroundColor: isFavorite ? "transparent" : "#2ba04c",
              }}
            >
              <svg
                className={classes.tripInfo__body__favorites__icon}
                style={{ color: isFavorite ? "#777" : "white" }}
              >
                <use xlinkHref="/images/sprite.svg#icon-bookmarks"></use>
              </svg>
              <span style={{ color: isFavorite ? "#777" : "white" }}>
                {isFavorite ? " Add to favorites" : " Remove from favorites "}
              </span>
            </div>

            <div
              className={classes.tripInfo__body__favorites}
              onClick={interestedHandler}
              style={{
                backgroundColor: isInterested ? "transparent" : "#2ba04c",
              }}
            >
              <svg
                className={classes.tripInfo__body__favorites__icon}
                style={{ color: isInterested ? "#777" : "white" }}
              >
                <use
                  xlinkHref={`/images/sprite.svg#icon-user-${
                    !isInterested ? "plus" : ""
                  }`}
                ></use>
              </svg>
              <span style={{ color: isInterested ? "#777" : "white" }}>
                {isInterested ? "Interesred" : "mark As Interesred"}
              </span>
            </div>
            <div
            //  to="/interested-people-list"
              onClick={() => setShowModal(true)}
              className={classes.tripInfo__body__link}
              title="Show People interested"
            >
              <svg className={classes["tripInfo__body__favorites__icon--link"]}>
                <use xlinkHref="/images/sprite.svg#icon-users"></use>
              </svg>
            </div>
          </div>

          <h3 className={classes.tripInfo__header}>Pricing & Dates:</h3>
          <ul className={classes.tripInfo__body__list}>
            <li className={classes.tripInfo__head__list__item}>
              <svg className={classes.tripInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-price-tag"></use>
              </svg>
              <h3 className={classes.tripInfo__head__list__item__header}>
                Price:
              </h3>
              <span className={classes.tripInfo__head__list__item__text}>
                {trip.price.cost} {trip.price.currency} /person
              </span>
            </li>
            <li className={classes.tripInfo__head__list__item}>
              <svg className={classes.tripInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-calendar1"></use>
              </svg>
              <h3 className={classes.tripInfo__head__list__item__header}>
                Date:
              </h3>
              <span className={classes.tripInfo__head__list__item__text}>
                {trip.generalInformations.launchDate} - {trip.generalInformations.returnDate}
              </span>
            </li>
          </ul>

          <h3 className={classes.tripInfo__header}>Contact Trip Leader:</h3>
          <ul className={classes.tripInfo__body__list}>
            <li className={classes.tripInfo__head__list__item}>
              <svg className={classes.tripInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-old-phone"></use>
              </svg>
              <h3 className={classes.tripInfo__head__list__item__header}>
                Phone:
              </h3>
              <span className={classes.tripInfo__head__list__item__text}>
                {trip.contact.phoneNumber}
              </span>
            </li>

            <li className={classes.tripInfo__head__list__item}>
              <svg className={classes.tripInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-mail"></use>
              </svg>
              <h3 className={classes.tripInfo__head__list__item__header}>
                Email:
              </h3>
              <span className={classes.tripInfo__head__list__item__text}>
                {trip.contact.email}
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className={classes.description}>
        <h3
          className={`${classes.tripInfo__header} ${classes["tripInfo__header--sub"]}`}
        >
          Description:
        </h3>
        <p className={classes.description__text}>
          {trip.description}
        </p>
      </section>

      <section className={classes.gallery}>
        <h3
          className={`${classes.tripInfo__header} ${classes["tripInfo__header--sub"]}`}
        >
          Gallery:
        </h3>
        {
          trip.images && (
            <Slide style={{ margin: "0 9rem", marginBottom: "2rem" }}>
          {trip.images.map((slideImage, index) => (
            <div className="each-slide" key={index}>
              <div
                style={{
                  backgroundImage: `url(${slideImage})`,
                  height: "90vh",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
          ))}
        </Slide>
          )
        }
      </section>

      <section className={classes.stations}>
        <h3
          className={`${classes.tripInfo__header} ${classes["tripInfo__header--sub"]}`}
        >
          Stations:
        </h3>
        <ul className={classes.stations__list}>
        
{
  trip.location.stations.map(station => {
    return (
      <li className={classes.stations__list__item}>
      {station}
    </li>
    )
  })
}        
        </ul>
      </section>
      <section className={classes.stations}>
        <h3
          className={`${classes.tripInfo__header} ${classes["tripInfo__header--sub"]}`}
        >
          Features:
        </h3>
        <ul className={classes.stations__list}>
        
{
  trip.features.map(feature => {
    return (
      <li className={classes.stations__list__item}>
      {feature}
    </li>
    )
  })
}        
        </ul>
      </section>
      </>

  )
}
    
      {/* <section className={classes.location}>
        <h3
          className={`${classes.tripInfo__header} ${classes["tripInfo__header--sub"]}`}
        >
          Location:
        </h3>
        <MapSection location={location} zoomLevel={17} />
      </section>
     */}
    </>
  );
};

export default TripInfo;
