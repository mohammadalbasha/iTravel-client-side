import classes from "./AddTourPlan.module.scss";
import { useState, useRef, useContext } from "react";
//import { useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";
import { Country, State, City }  from 'country-state-city';

const AddTourPlan = (props) => {
  const authCtx = useContext(AuthContext);
 // const history = useHistory();

  const {isLoading, error, success, sendRequest : addPlan} = useHttp(); 
  const [successMessage, setSuccessMessage] = useState();

  

  //General Info
  const titleInputRef = useRef();

  //Location
  
  const [country, setCountry] = useState({name:''});
  const [state, setState] = useState({name:''});
  
  //Description
  const descriptionInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    //General Info
    const enteredTitle = titleInputRef.current.value;

    //Location
    const enteredCountry = country.name;
    const enteredCity = state.name;

    //Description
    const enteredDescription = descriptionInputRef.current.value;

    
    const responseHandler = (response) => {
      setSuccessMessage(response);
    }


    const values = {
          title: enteredTitle,
          country: enteredCountry,
          city: enteredCity,
          userDescription: enteredDescription,
          //returnSecureToken: true,
        }
    let url =`https://itravel-yymm.herokuapp.com/touristPlans/createPlan`;
      addPlan(
        {url ,
        method : 'POST',
        body : values,
        headers: {
          "Content-Type": "application/json",
        }},
        responseHandler
    );


//    history.goBack();
  };

  return (
    <div className={`${classes.addTourPlan} ${props.isPage ? classes.page: ''}`}>

      
      <form className={classes.addTourPlan__form} onSubmit={submitHandler}>
        <h3 className={classes.addTourPlan__header}>Add a New Tour Plan</h3>
        <div className={classes.addTourPlan__form__body}>
          <h3 className={classes.addTourPlan__form__sectionTitle}>
            General Information
          </h3>
          <div className={classes.addTourPlan__form__section}>
            <div className={classes.addTourPlan__form__group}>
              <label
                htmlFor="title"
                className={classes.addTourPlan__form__label}
              >
                Title:
              </label>
              <input
                type="text"
                placeholder="Tour Plan Name"
                className={classes.addTourPlan__form__input}
                name="title"
                id="title"
                required
                ref={titleInputRef}
              />
            </div>
          </div>

          <h3 className={classes.addTourPlan__form__sectionTitle}>Location</h3>
          <div className={classes.addTourPlan__form__section}>
          <div className={classes.addTourPlan__form__group}>
              <label htmlFor="country" className={classes.addTourPlan__form__label}>
                Country:
              </label>
              <select
                id="country"
                name="country"
                className={classes.addTourPlan__form__input}
                defaultValue={'default'}
                required
              >
                <option value='default' disabled>
                  Please select
                </option>
                {
                  Country.getAllCountries().map (country => {
                    return (
                      <option value={country}
                      onClick={()=>setCountry(country)}

                      >{country.name}</option>
                    )
                  })
                }
              </select>


                       </div>

            <div className={classes.addTourPlan__form__group}>
              <label htmlFor="state" className={classes.addTourPlan__form__label}>
                State:
              </label>
              <select
                id="state"
                name="state"
                className={classes.addTourPlan__form__input}
                defaultValue={'default'}
                required          
              >
                <option value='default' disabled>
                  Please select
                </option>
                { country.isoCode &&
                  State.getStatesOfCountry(country.isoCode).map(state => {
                    
                    return (
                      <option value={state}
                      onClick={()=>setState(state)}

                      >{state.name}</option>
                    )
                  })
                }
              </select>
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
        </div>

        {!isLoading && (
          <button
            type="submit"
            className={`${"btn"} ${"btn__hero"}  ${"btn__hero--login"} ${"btn__hero--submit"} ${
              classes["addTourPlan--btn"]
            }`}
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
  );
};

export default AddTourPlan;
