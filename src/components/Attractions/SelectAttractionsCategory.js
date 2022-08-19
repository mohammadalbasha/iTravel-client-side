import classes from "./SelectAttractionsCategory.module.scss";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
//import { useNavigate } from "react-router-dom"; react router 6 
const SelectAttractionsCategory = () => {
  const categoryInputRef = useRef();
  const history = useHistory();
 // const navigate = useNavigate();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredCategory = categoryInputRef.current.value;
    
     history.push(`/attractions/${enteredCategory}`);
    //    navigate(`/attractions/${enteredCategory}`); // react orouter 6

  };

  return (
    <div className={classes.selectAttractionsCategory}>
      <form
        className={classes.selectAttractionsCategory__form}
        onSubmit={submitHandler}
      >
        <label
          htmlFor="attractionCategory"
          className={classes.selectAttractionsCategory__form__label}
        >
          Select category:
        </label>
        <select
          id="attractionCategory"
          name="attractionCategory"
          defaultValue={"default"}
          className={classes.selectAttractionsCategory__form__select}
          required
          ref={categoryInputRef}
        >
          <option
            value="default"
            disabled
            className={classes.selectAttractionsCategory__form__select__option}
          >
            Please select
          </option>
          <option value="historicalPlaces">Historical Places</option>
          <option value="historicBuildings">Historic Buildings</option>
          <option value="publicPlaces">Public Places</option>
          <option value="educationalPlaces">Educational Places</option>
          <option value="culture">Culture</option>
          <option value="Angola">Angola</option>
          <option value="Anguilla">Anguilla</option>
          <option value="shoppingMall">Shopping Mall</option>
          <option value="healthAndBeauty">Health And Beauty</option>
          <option value="foodAndDrinks">Food And Drinks</option>
          <option value="cafe">Cafe</option>
          <option value="restaurant">Restaurant</option>
          <option value="fastFood">Fast Food</option>
          <option value="bar">Bar</option>
          <option value="nightclub">Night Club</option>
          <option value="zoo">Zoo</option>
          <option value="cinema">Cinema</option>
          <option value="themaPark">Thema Park</option>
          <option value="waterPark">Water Park</option>
          <option value="leisurePark">Leisure Park</option>
          <option value="hospital">Hospital</option>
          <option value="healthcare">Healthcare</option>
          <option value="embassyAndMinistry">Embassy And Ministry</option>
          <option value="resedntialBuilding">Resedntial Building</option>
          <option value="publicAndCivilBuilding">
            Public And Civil Building
          </option>
          <option value="transportationBuilding">
            Transportation Building
          </option>
          <option value="service">Service</option>
          <option value="financialService">Financial Service</option>
          <option value="travelAgency">Travel Agency</option>
          <option value="taxi">Taxi</option>
          <option value="publicTransport">Public Transport</option>
          <option value="police">Police</option>
          <option value="hotel">Hotel</option>
          <option value="sport">Sport</option>
          <option value="swimmpingPoolAndSportCenter">
            Swimmping Pool And Sport Center
          </option>
          <option value="stadium">Stadium</option>
        </select>
          <button
            type="submit"
            className={`${"btn"} ${"btn__hero"} ${"btn__hero--submit"}`}
          >
            Submit
          </button>
        
        
      </form>
    </div>
  );
};

export default SelectAttractionsCategory;
