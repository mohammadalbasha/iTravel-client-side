import classes from "./StayInfo.module.scss";
import { useEffect, useState, useContext } from "react";
import MapSection from "../Map/Map";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Link } from "react-router-dom";

import Spinner from "../Spinner/spinner";
import Error from "../Spinner/error";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";
import { useParams } from "react-router-dom";

import InterestedPeopleList from "../InterestedPeopleList/InterestedPeopleList";
import Modal from "../Modal/Modal";
import Backdrop from "../Modal/Backdrop";

// const Modal = (props) => {
//   return (
//     <div className={classes.modal}>
//       <InterestedPeopleList title={props.title} users={props.users} setShowModal={props.setShowModal}/>
//     </div>
//   )
// }


const StayInfo = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(true);
  const [isMyPost, setIsMyPost] = useState(false);
  const [isInterested, setIsInterested] = useState(false);

  const authCtx = useContext(AuthContext);

  const params = useParams();
  const stayId = params.stayId;

  const {isLoading, success, error, sendRequest : getStay} = useHttp();
  
  const [stay, setStay] = useState();


  useEffect(() => {
    
    const url = `https://itravel-yymm.herokuapp.com/stays/getStay/${stayId}`;
    const responseHandler = (stay) => {
      setStay(stay);
    };
    getStay({url}, responseHandler);
  }, []);

  useEffect(() => {
    if (!stay)
      return ;
    if (stay.interestedUsers){
      for (let i = 0 ; i < stay.interestedUsers.length ; i++){
        if (authCtx.profile && stay.interestedUsers[i]._id === authCtx.profile._id){
          setIsInterested(true);
          break;
        }
      }
    }
  }, [stay])

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

  const { sendRequest : addInterestedUser} = useHttp();
  const interestedHandler = () => {
    if (isInterested ) return;
    const url2 = `https://itravel-yymm.herokuapp.com/stays/addInterestedUser/${stayId}`;
    const responseHandler2 = () => {
    
      setIsInterested(true);
    };
    console.log("sldkmck")
    addInterestedUser({url : url2, method : 'POST'}, responseHandler2);
  
  }

  
    //add to favorites
  

  return (
    <>
     {showModal && <Backdrop  setShowModal={setShowModal}/>}
      {showModal && <Modal  setShowModal={setShowModal}
      >
       <InterestedPeopleList title = {'Users Interested in this Stay'}  users = {stay ? stay.interestedUsers : []} />
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
        stay && (
          <>
          <section className={classes.stayInfo}>
        <div className={classes.stayInfo__head}>
          <div className={classes.stayInfo__title}>
            <div className={classes.stayInfo__title__stick}>&nbsp;</div>
            <span className={classes.stayInfo__title__header}>
              {stay.property.propertyName}
            </span>
          </div>

          <h3 className={classes.stayInfo__header}>General information:</h3>
          <ul className={classes.stayInfo__head__list}>
            <li className={classes.stayInfo__head__list__item}>
              <svg className={classes.stayInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-enlarge"></use>
              </svg>
              <h3 className={classes.stayInfo__head__list__item__header}>
                Area:
              </h3>
              <span className={classes.stayInfo__head__list__item__text}>
                {stay.location.area} m<sup>2</sup>
              </span>
            </li>
            <li className={classes.stayInfo__head__list__item}>
              <svg className={classes.stayInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-home3"></use>
              </svg>
              <h3 className={classes.stayInfo__head__list__item__header}>
                Rooms:
              </h3>
              <span className={classes.stayInfo__head__list__item__text}>
                {stay.property.rooms} rooms
              </span>
            </li>
            <li className={classes.stayInfo__head__list__item}>
              <svg className={classes.stayInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-office"></use>
              </svg>
              <h3 className={classes.stayInfo__head__list__item__header}>
                Property type:
              </h3>
              <span className={classes.stayInfo__head__list__item__text}>
                {stay.property.propertyType}
              </span>
            </li>
            <li className={classes.stayInfo__head__list__item}>
              <svg className={classes.stayInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-stack"></use>
              </svg>
              <h3 className={classes.stayInfo__head__list__item__header}>
                Floor:
              </h3>
              <span className={classes.stayInfo__head__list__item__text}>
                {stay.property.floor} 
              </span>
            </li>
            <li className={classes.stayInfo__head__list__item}>
              <svg className={classes.stayInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-address"></use>
              </svg>
              <h3 className={classes.stayInfo__head__list__item__header}>
                Facing direction:
              </h3>
              <span className={classes.stayInfo__head__list__item__text}>
                {stay.location.facingDirection}
              </span>
            </li>
            <li className={classes.stayInfo__head__list__item}>
              <svg className={classes.stayInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-location2"></use>
              </svg>
              <h3 className={classes.stayInfo__head__list__item__header}>
                Address:
              </h3>
              <span className={classes.stayInfo__head__list__item__text}>
                {stay.location.address + ', ' + stay.location.country + '-' + stay.location.city}
              </span>
            </li>
            {/* <li
              className={classes.stayInfo__head__list__item}
              style={{ marginBottom: "4rem" }}
            >
              <Link
                to="/add-stay"
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
              <Link
                to="/stays"
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
            {/* </li> */}
          </ul>
        </div>

        <div className={classes.stayInfo__body}>
          <div className={classes.stayInfo__body__btns}>
            <div
              className={classes.stayInfo__body__favorites}
              onClick={favoriteHandler}
              style={{
                backgroundColor: isFavorite ? "transparent" : "#2ba04c",
              }}
            >
              <svg
                className={classes.stayInfo__body__favorites__icon}
                style={{ color: isFavorite ? "#777" : "white" }}
              >
                <use xlinkHref="/images/sprite.svg#icon-bookmarks"></use>
              </svg>
              <span style={{ color: isFavorite ? "#777" : "white" }}>
                {isFavorite ? " Add to favorites" : " Remove from favorites "}
              </span>
            </div>

            <div
              className={classes.stayInfo__body__favorites}
              onClick={interestedHandler}
              style={{
                backgroundColor: isInterested ? "transparent" : "#2ba04c",
              }}
            >
              <svg
                className={classes.stayInfo__body__favorites__icon}
                style={{ color: isInterested ? "#777" : "white" }}
              >
                <use
                  xlinkHref={`/images/sprite.svg#icon-user-${
                    isInterested ? "plus" : "minus"
                  }`}
                ></use>
              </svg>
              <span style={{ color: isInterested ? "#777" : "white" }}>
                {isInterested ? " Interested" : " Not Interested "}
              </span>
            </div>
            <div
            //  to="/interested-people-list"
              onClick = {() => setShowModal(true)}
              className={classes.stayInfo__body__link}
              title="Show People interested"
            >
              <svg className={classes["stayInfo__body__favorites__icon--link"]}>
                <use xlinkHref="/images/sprite.svg#icon-users"></use>
              </svg>
            </div>
          </div>

          <h3 className={classes.stayInfo__header}>
            Pricing & lease contract:
          </h3>
          <ul className={classes.stayInfo__body__list}>
            <li className={classes.stayInfo__head__list__item}>
              <svg className={classes.stayInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-price-tag"></use>
              </svg>
              <h3 className={classes.stayInfo__head__list__item__header}>
                Price:
              </h3>
              <span className={classes.stayInfo__head__list__item__text}>
                {stay.price.rentalPrice} /month
              </span>
            </li>
            <li className={classes.stayInfo__head__list__item}>
              <svg className={classes.stayInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-hour-glass"></use>
              </svg>
              <h3 className={classes.stayInfo__head__list__item__header}>
                Contract renewal:
              </h3>
              <span className={classes.stayInfo__head__list__item__text}>
                {stay.contactRenewal}
              </span>
            </li>
          </ul>

          <h3 className={classes.stayInfo__header}>Contact realtor:</h3>
          <ul className={classes.stayInfo__body__list}>
            <li className={classes.stayInfo__head__list__item}>
              <svg className={classes.stayInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-old-phone"></use>
              </svg>
              <h3 className={classes.stayInfo__head__list__item__header}>
                Phone:
              </h3>
              <span className={classes.stayInfo__head__list__item__text}>
                {stay.contact.phoneNumber}
              </span>
            </li>

            <li className={classes.stayInfo__head__list__item}>
              <svg className={classes.stayInfo__head__list__item__icon}>
                <use xlinkHref="/images/sprite.svg#icon-mail"></use>
              </svg>
              <h3 className={classes.stayInfo__head__list__item__header}>
                Email:
              </h3>
              <span className={classes.stayInfo__head__list__item__text}>
                {stay.contact.email}
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className={classes.description}>
        <h3
          className={`${classes.stayInfo__header} ${classes["stayInfo__header--sub"]}`}
        >
          Description:
        </h3>
        <p className={classes.description__text}>
         {stay.description}
         </p>
      </section>

      <section className={classes.gallery}>
        <h3
          className={`${classes.stayInfo__header} ${classes["stayInfo__header--sub"]}`}
        >
          Gallery:
        </h3>
        <Slide style={{ margin: "0 9rem", marginBottom: "2rem" }}>
          {stay.images.map((slideImage, index) => (
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
      </section>

      <section className={classes.features}>
        <h3
          className={`${classes.stayInfo__header} ${classes["stayInfo__header--sub"]}`}
        >
          Features:
        </h3>
        <ul className={classes.features__list}>
       {
        stay.features.map (feature => {
          return (
            <li className={classes.features__list__item}>{feature}</li>

          )
        })
       }
        </ul>
      </section>

      <section className={classes.location}>
        <h3
          className={`${classes.stayInfo__header} ${classes["stayInfo__header--sub"]}`}
        >
          Location:
        </h3>
        {/* <MapSection location={{
          lat : stay.location.
        }} zoomLevel={17} />
  */}
      </section>
      </>
        )
      }

      
    </>
  );
};

export default StayInfo;
