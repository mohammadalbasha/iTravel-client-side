import classes from "./SelectCountry.module.scss";
import { useState, useRef, useContext } from "react";
import { Country, State, City }  from 'country-state-city';
import LocationContext from "../../store/location-context";
import { useHistory } from "react-router-dom";
//import { Navigate, useNavigate } from "react-router-dom"; react router 6 
const SelectCountry = () => {

  const locationCtx = useContext(LocationContext);
  const history = useHistory();
 // const navigate = useNavigate(); react router 6
  const [country, setCountry] = useState({});
  const [state, setState] = useState({});
  
  const changeCountryHandler = (country) => {
    setCountry(country);
    setState({});
  }
  const changeStateHnadler = (state) => {
    setState(state);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    locationCtx.changeLonlat({
      longitude : state.longitude,
      latitude : state.latitude
    });
    locationCtx.changeCsc({
      country : country.name,
      state : state.name,
      city : ''
    })
    history.goBack();
    //navigate(-1); react router 6
  }
  return (
    <div className={classes.selectCountry}>
      <form className={classes.selectCountry__form} onSubmit={submitHandler}>
        <label htmlFor="country" className={classes.selectCountry__form__label}>
          Select a country:
        </label>
        <select
                  id="country"
                  name="country"
                  defaultValue={"default"}
                  className={classes.selectCountry__form__select}
                required
              >
                <option value='default' disabled>
                  Please select
                </option>
                {
                  Country.getAllCountries().map (countryData => {
                    return (
                      <option value={countryData}
                      onClick={()=>changeCountryHandler(countryData)}
                      >{countryData.name}</option>
                    )
                  })
                }
              </select>


              <label htmlFor="state" className={classes.selectCountry__form__label}>
          Select a state:
        </label>
        <select
                  id="state"
                  name="state"
                  defaultValue={"default"}
                  //value={state.name ? state : 'default'}
                  className={classes.selectCountry__form__select}
                  required
              >
                <option value='default' disabled >
                  Please select
                </option>
                {country.isoCode && 
                  State.getStatesOfCountry(country.isoCode).map (stateData => {
                    return (
                      <option value={stateData}
                      onClick={()=>changeStateHnadler(stateData)}

                      >{stateData.name}</option>
                    )
                  })
                }
              </select>


          <button
            type="submit"
            className={`${"btn"} ${"btn__hero"} ${"btn__hero--submit"}`}
            disabled = {!state.name? true : false}
          >
            Submit
          </button>
      </form>
    </div>
  );
};

export default SelectCountry;
