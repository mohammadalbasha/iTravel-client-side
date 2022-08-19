import classes from "./TourPlanInfo.module.scss";
import { useContext, useState } from "react";
import "react-slideshow-image/dist/styles.css";
import { Link, useParams } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";


import useHttp from '../../hooks/use-http';
import { useEffect } from "react";
import AuthContext from "../../store/auth-context";

import Error from "../Spinner/error";
import Spinner from "../Spinner/spinner";

import Modal from "../Modal/Modal";
import InterestedPeopleList from "../InterestedPeopleList/InterestedPeopleList";
import Backdrop from "../Modal/Backdrop";

const TourPlanInfo = () => {
  const [isFavorite, setIsFavorite] = useState(true);
  const [isMyPost, setIsMyPost] = useState(true);
  const [isInterested, setIsInterested] = useState(false);
  const [showModal, setShowModal] = useState(false);
  

  const params = useParams();
  const planId = params.planId;
  const authCtx = useContext(AuthContext);

  const {isLoading, success, error, sendRequest : getPlan} = useHttp();
  const [plan, setPlan] = useState();


  useEffect(() => {
    
    const url = `https://itravel-yymm.herokuapp.com/touristPlans/plan/${planId}`;
    const responseHandler = (plan) => {
      setPlan(plan);
    };
    getPlan({url}, responseHandler);
  }, []);

  useEffect(() => {
    if (!plan)
      return ;
    if (plan.interestedUsers){
      for (let i = 0 ; i < plan.interestedUsers.length ; i++){
        if (authCtx.profile && plan.interestedUsers[i]._id === authCtx.profile._id){
          setIsInterested(true);
          break;
        }
      }
    }
  }, [plan, authCtx.profile])


  
  
  const {error : errorInterested, sendRequest : addInterestedUser} = useHttp();
  const interestedHandler = () => {
    if (isInterested ) return;
    const url2 = `https://itravel-yymm.herokuapp.com/touristPlans/interestedUser/${planId}`;
    const responseHandler2 = () => {
      setIsInterested(true);
    };
  
    addInterestedUser({url : url2, method: 'PUT'}, responseHandler2);
  
  }
  console.log(plan);

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

  return (
    <>
      {showModal && <Backdrop  setShowModal={setShowModal}/>}
      {showModal && <Modal  setShowModal={setShowModal}>
       <InterestedPeopleList title = {'Users Interested in this Trip'}  users = {plan ? plan.interestedUsers : []} />
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
      
        {plan && (
        <>
        <section className={classes.tourPlanInfo}>
      
        <div className={classes.tourPlanInfo__title}>
          <div className={classes.tourPlanInfo__title__stick}>&nbsp;</div>
          <span className={classes.tourPlanInfo__title__header}>
            {plan.title}
          </span>
        </div>

        <div className={classes.tourPlanInfo__header}>
          <h3 className={classes.tourPlanInfo__header__text}>
            General information:
          </h3>
       
        </div>

        <ul className={classes.tourPlanInfo__list}>
          <li className={classes.tourPlanInfo__list__item}>
            <svg className={classes.tourPlanInfo__list__item__icon}>
              <use xlinkHref="/images/sprite.svg#icon-address"></use>
            </svg>
            <h3 className={classes.tourPlanInfo__list__item__header}>State:</h3>
            <span className={classes.tourPlanInfo__list__item__text}>
              {plan.city}
            </span>
          </li>
          <li className={classes.tourPlanInfo__list__item}>
            <svg className={classes.tourPlanInfo__list__item__icon}>
              <use xlinkHref="/images/sprite.svg#icon-location2"></use>
            </svg>
            <h3 className={classes.tourPlanInfo__list__item__header}>
              Country:
            </h3>
            <span className={classes.tourPlanInfo__list__item__text}>
              {plan.country}
            </span>
          </li>
          <li className={classes.tourPlanInfo__list__item}>
            <svg className={classes.tourPlanInfo__list__item__icon}>
              <use xlinkHref="/images/sprite.svg#icon-new-message"></use>
            </svg>
            <h3 className={classes.tourPlanInfo__list__item__header}>
              Description:
            </h3>
            <span className={classes.tourPlanInfo__list__item__text}>
              {plan.userDescription}
            </span>
          </li>
          {/* <li
              className={classes.tourPlanInfo__head__list__item}
              style={{ margin: "3rem 0"}}
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
              </Link>
              </li> */}
        </ul> 
        
      </section>

      <section className={classes.tourPlanInfo__body}>
      <div className={classes.tourPlanInfo__body__btns}>
            <div
              className={classes.tourPlanInfo__body__favorites}
              onClick={favoriteHandler}
              style={{
                backgroundColor: isFavorite ? "transparent" : "#2ba04c",
              }}
            >
              <svg
                className={classes.tourPlanInfo__body__favorites__icon}
                style={{ color: isFavorite ? "#777" : "white" }}
              >
                <use xlinkHref="/images/sprite.svg#icon-bookmarks"></use>
              </svg>
              <span style={{ color: isFavorite ? "#777" : "white" }}>
                {isFavorite ? " Add to favorites" : " Remove from favorites "}
              </span>
            </div>

            <div
              className={classes.tourPlanInfo__body__favorites}
              onClick={interestedHandler}
              style={{
                backgroundColor: isInterested ? "transparent" : "#2ba04c",
              }}
            >
              <svg
                className={classes.tourPlanInfo__body__favorites__icon}
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
              className={classes.tourPlanInfo__body__link}
              title="Show People interested"
            >
              <svg className={classes["tourPlanInfo__body__favorites__icon--link"]}>
                <use xlinkHref="/images/sprite.svg#icon-users"></use>
              </svg>
            </div>
          </div>

      </section>        
      <section className={classes.places}>
        <h3
          className={`${classes.tourPlanInfo__header__text} ${classes["tourPlanInfo__header__text--sub"]}`}
        >
          Places:
        </h3>
        <ul className={classes.places__list}>
                { plan.places &&
                  plan.places.map(place => {
                    return(
                      <li className={classes.places__list__item}>
            <div className={classes.places__list__item__details}>
              <div className={classes.places__list__item__details__group}>
                <span className={classes.places__list__item__details__info}>
                  Name:
                </span>
                <span className={classes.places__list__item__details__fullName}>
                 {place.name}
                </span>
              </div>
              <div className={classes.places__list__item__details__group}>
                <span className={classes.places__list__item__details__info}>
                  Category:
                </span>
                <span
                  className={classes.places__list__item__details__phoneNumber}
                >
                  {place.category}
                </span>
              </div>
              <div className={classes.places__list__item__details__group}>
                <span className={classes.places__list__item__details__info}>
                  State District:
                </span>
                <span
                  className={classes.places__list__item__details__phoneNumber}
                >
                  {place.state_district}
                </span>
              </div>
              <div className={classes.places__list__item__details__group}>
                <span className={classes.places__list__item__details__info}>
                  Address:
                </span>
                <span className={classes.places__list__item__details__username}>
                  {place.address}
                </span>
              </div>

              <div className={classes.places__list__item__details__group}>
                <span className={classes.places__list__item__details__info}>
                  Description:
                </span>
                <span
                  className={classes.places__list__item__details__phoneNumber}
                >
                    {place.userDescription}
                </span>
              </div>

        <div className={classes.places__list__item__details__group}>
       
          <span className={classes.places__list__item__details__info}>
                  Images:
            </span>
            <Slide style={{ margin: "0 9rem", marginBottom: "2rem"    ,  height: "30vh",
                  width: '40vw' }}>
          {place.userImages.map((slideImage, index) => (
            <div className="each-slide" key={index}>
              <div
                style={{
                  backgroundImage: `url(${slideImage})`,
                  height: "30vh",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
          ))}
        </Slide>
      </div>


            </div>
          </li>
          
                    )
                  })
                }
        </ul>
      </section>
      </>
  )
              }
    </>
  );
};

export default TourPlanInfo;
