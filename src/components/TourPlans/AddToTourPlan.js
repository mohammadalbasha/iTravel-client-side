//////////////////////////////////////////
//////////////////NOTE IN THIS FORM DATA MUST BE FILLED AUTOMATICALLY
/////////////////////////////////////////

import classes from "./AddToTourPlan.module.scss";
import { useState, useRef, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";

import AddTourPlan from "./AddTourPlan";

import Modal from "../Modal/Modal";
import Backdrop from "../Modal/Backdrop";

const AddToTourPlan = () => {
  const [showModal, setShowModal] = useState(false);
  const authCtx = useContext(AuthContext);
//  const history = useHistory();
  const location = useLocation();

  const attractionInformation = {...location.state};

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState();

  const { isLoading, error, success, sendRequest: addAttraction } = useHttp();
  const { sendRequest: getPlans } = useHttp();
  const [successMessage, setSuccessMessage] = useState();
  
  //General Info
  const tourPlanNameInputRef = useRef();
  const attractionNameInputRef = useRef();
  const attractionCategoryInputRef = useRef();

  //Location
  const addressInputRef = useRef();
  const stateDistrictInputRef = useRef();

  //Description
  const descriptionInputRef = useRef();

  const [images, setImages] = useState([]);

const imageHandler = (e) => {
    setImages([...images, e.target.files[0]]);
}
 console.log(plans);

useEffect (() => {
  let url = "https://itravel-yymm.herokuapp.com/touristPlans/myPlansGeneral";
  const responseHandler = (response) => {
    setPlans(response);
    if (response.length > 0){
      //setSelectedPlan(response[0]._id);
    }
  };
  getPlans({url}, responseHandler);
} ,[])

  const submitHandler = (event) => {
    event.preventDefault();
    //General Info
    const enteredTourPlanName = tourPlanNameInputRef.current.value;
    const enteredAttractionName = attractionNameInputRef.current.value;
    const enteredAttractionCategory = attractionCategoryInputRef.current.value;

    //Location
    const enteredAddress = addressInputRef.current.value;
    const enteredStateDistrict = stateDistrictInputRef.current.value;

    //Description
    const enteredDescription = descriptionInputRef.current.value;

    // Optional : add validation
    const values = {
      name: enteredAttractionName,
      category: enteredAttractionCategory,
      address: enteredAddress,
      state_district: enteredStateDistrict,
      userDescription: enteredDescription,
    }

    const formData = new FormData();
  //  var postData = JSON.stringify(values);
    for (let key in values){
      formData.append(key, values[key]);
    }
    for (let i in images){
      formData.append('images', images[i]);
    }
    
    
    const responseHandler = (response) => {
      setSuccessMessage(response);
    }

   // let url ="https://itravel-yymm.herokuapp.com/auth/signup";
    let url =`http://localhost:5000/touristPlans/addPlace/${selectedPlan}`;
      addAttraction(
        {url ,
        method : 'POST',
        body : formData,
        headers: {
          "Content-Type": "application/json",
        }},
        responseHandler
    );

  };

  return (
    <>
      {showModal && <Backdrop setShowModal={setShowModal}/>}
      {showModal && 
      <Modal setShowModal={setShowModal}>
              <AddTourPlan isPage={false} />
      </Modal>}
      <div className={classes.addTourPlan}>
      <form className={classes.addTourPlan__form} onSubmit={submitHandler}>
        <h3 className={classes.addTourPlan__header}>Add to a Tour Plan</h3>
        <div className={classes.addTourPlan__form__body}>
          <h3 className={classes.addTourPlan__form__sectionTitle}>
            General Information
          </h3>
          <div className={classes.addTourPlan__form__section}>
            <div className={classes.addTourPlan__form__group}>
              <label
                htmlFor="tourPlanName"
                className={classes.addTourPlan__form__label}
              >
                Tour Plan Name:
              </label>
              <select
                id="tourPlanName"
                name="tourPlanName"
                className={classes.addTourPlan__form__input}
                defaultValue={"default"}
                required
                ref={tourPlanNameInputRef}
              >
                <option value="default" disabled>
                  Please select
                </option>
                {
                  plans.map((plan, id) => {
                    return (
                      <option value="Work" onClick={() => setSelectedPlan(plan._id)}>
                        {`${plan.title}, ${plan.country}-${plan.city}`}
                        </option>
                    )
                  })
                }
                <option onClick={() => setShowModal(true)} >add new Plan</option>
              </select>
            </div>

            <div className={classes.addTourPlan__form__group}>
              <label
                htmlFor="attractionName"
                className={classes.addTourPlan__form__label}
              >
                Attraction Name:
              </label>
              <input
                type="text"
                placeholder="Attraction Name"
                className={classes.addTourPlan__form__input}
                name="attractionName"
                id="attractionName"
                ref={attractionNameInputRef}
                defaultValue={attractionInformation.name}
              />
            </div>

            <div className={classes.addTourPlan__form__group}>
              <label
                htmlFor="attractionCategory"
                className={classes.addTourPlan__form__label}
              >
                Attraction Cat:
              </label>
              <input
                type="text"
                placeholder="Attraction Category"
                className={classes.addTourPlan__form__input}
                name="attractionCategory"
                id="attractionCategory"
                defaultValue={attractionInformation.category}
                ref={attractionCategoryInputRef}
              />
            </div>
          </div>

          <h3 className={classes.addTourPlan__form__sectionTitle}>Location</h3>
          <div className={classes.addTourPlan__form__section}>
            <div className={classes.addTourPlan__form__group}>
              <label
                htmlFor="stateDistrict"
                className={classes.addTourPlan__form__label}
              >
                State District:
              </label>
              <input
                type="text"
                placeholder="State District"
                className={classes.addTourPlan__form__input}
                name="stateDistrict"
                id="stateDistrict"
                ref={stateDistrictInputRef}
                defaultValue={attractionInformation.state_district}
              />
            </div>

            <div className={classes.addTourPlan__form__group}>
              <label
                htmlFor="address"
                className={classes.addTourPlan__form__label}
              >
                Address:
              </label>
              <input
                type="text"
                placeholder="Address"
                className={classes.addTourPlan__form__input}
                name="address"
                id="address"
                ref={addressInputRef}
                defaultValue={attractionInformation.address}
              />
            </div>
          </div>

          <h3 className={classes.addTourPlan__form__sectionTitle}>
            Description
          </h3>
          <div className={classes.addTourPlan__form__section}>
            <div className={classes.addTourPlan__form__group}>
              <label
                htmlFor="description"
                className={classes.addTourPlan__form__label}
              >
                Description:
              </label>
              <textarea
                type="text"
                id="description"
                placeholder="Full Description"
                className={`${classes.addTourPlan__form__input} ${classes["addTourPlan__form__input--description"]}`}
                ref={descriptionInputRef}
              ></textarea>
            </div>
            </div>
          <h3 className={classes.addTourPlan__form__sectionTitle}>
            Images <span className={classes.addTourPlan__form__sectionTitle__span}>taken by you</span>
          </h3>
          <div className={classes.addTourPlan__form__section}>
            {
              [...Array(3)].map((e, i) => {
                return (
                  <div
                  className={`${classes.addTourPlan__form__group}`}
                >
                  <label
                    htmlFor="image"
                    className={classes.addTourPlan__form__label}
                  >
                    {`image-${i+1}`} 
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    disabled = {images.length>i}
                    onChange={imageHandler}
                  />
                </div>
      
                )}
                )
              
            }
                      
          </div>

        </div>

        {!isLoading &&  (
          <button
            type="submit"
            disabled={!selectedPlan}
            className={`${"btn"} ${"btn__hero"}  ${"btn__hero--login"} ${"btn__hero--submit"} 
            ${classes["addTourPlan--btn"]}` }
          >
            Submit
          </button>
        )}
        {isLoading && (
          <p className={classes.addTourPlan__request}>Sending request...</p>
        )}
        {error && (
          <p className={classes.addTourPlan__request}>{error}</p>
        )}
        {success && (
          <p className={classes.addTourPlan__request}>{successMessage}</p>
        )}
      </form>
    </div>

    </>
      );
};

export default AddToTourPlan;
