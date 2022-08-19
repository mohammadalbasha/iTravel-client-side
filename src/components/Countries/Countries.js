import classes from "./Countries.module.scss";
import { Link } from "react-router-dom";

import useHttp from "../../hooks/use-http";
import LocationContext from "../../store/location-context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import Spinner from "../Spinner/spinner";
import Error from "../Spinner/error";
const Countries = () => {

  const locationCtx = useContext(LocationContext);
  const {isLoading, success, error, sendRequest : getCountryInformation} = useHttp();

  const [country, setCountry] = useState();

  console.log(country)
  useEffect (() => {
    const responseHandler = (data) => {
      setCountry(data);
      locationCtx.flagHandler(data.flag);
    }
    const url = `https://itravel-yymm.herokuapp.com/countries/getGeneralInformations/${locationCtx.csc.country}`
    getCountryInformation ({url}, responseHandler);
  }, [locationCtx.csc.country]);

  const initCountry = (country) => {
    const url = `https://itravel-yymm.herokuapp.com/countries/getGeneralInformations/${country}`
    axios.get(url)
          .then (res => {
            locationCtx.flagHandler(res.response.data.flag);
            setCountry(res.response.data)
          })
          .catch (err => {  
          })

  }

  return (
    <div className={classes.countries}>
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
        country && (
          <div className={classes.countries__head}>
        <img
          src={country.flag}
          alt="country's flag"
          className={classes.countries__head__flag}
        />
        <h3 className={classes.countries__header}>Quick Facts:</h3>
        <ul className={classes.countries__head__list}>
          <li className={classes.countries__head__list__item}>
            <svg className={classes.countries__head__list__item__icon}>
              <use xlinkHref="images/sprite.svg#icon-library"></use>
            </svg>
            <h3 className={classes.countries__head__list__item__header}>
              Capital:
            </h3>
            <span className={classes.countries__head__list__item__text}>
              {country.capital}
            </span>
          </li>

          <li className={classes.countries__head__list__item}>
            <svg className={classes.countries__head__list__item__icon}>
              <use xlinkHref="images/sprite.svg#icon-earth"></use>
            </svg>
            <h3 className={classes.countries__head__list__item__header}>
              Official Language(s):
            </h3>
            <span className={classes.countries__head__list__item__text}>
              {country.languages[Object.keys(country.languages)[0]]}
            </span>
          </li>
          <li className={classes.countries__head__list__item}>
            <svg className={classes.countries__head__list__item__icon}>
              <use xlinkHref="images/sprite.svg#icon-users"></use>
            </svg>
            <h3 className={classes.countries__head__list__item__header}>
              Population:
            </h3>
            <span className={classes.countries__head__list__item__text}>
              {country.population}
            </span>
          </li>
          <li className={classes.countries__head__list__item}>
            <svg className={classes.countries__head__list__item__icon}>
              <use xlinkHref="images/sprite.svg#icon-coin-dollar"></use>
            </svg>
            <h3 className={classes.countries__head__list__item__header}>
              Currency:
            </h3>
            <span className={classes.countries__head__list__item__text}>
              {country.currency.name}
            </span>
          </li>

          <li className={classes.countries__head__list__item}>
            <svg className={classes.countries__head__list__item__icon}>
              <use xlinkHref="images/sprite.svg#icon-phone"></use>
            </svg>
            <h3 className={classes.countries__head__list__item__header}>
              Calling Code:
            </h3>
            <span className={classes.countries__head__list__item__text}>
              {country.idd.root}{country.idd.suffixes[0]}
            </span>
          </li>

          <li className={classes.countries__head__list__item}>
            <svg className={classes.countries__head__list__item__icon}>
              <use xlinkHref="images/sprite.svg#icon-truck"></use>
            </svg>
            <h3 className={classes.countries__head__list__item__header}>
              Cars Side:
            </h3>
            <span className={classes.countries__head__list__item__text}>
              {country.car.side}
            </span>
          </li>

          <li className={classes.countries__head__list__item}>
            <svg className={classes.countries__head__list__item__icon}>
              <use xlinkHref="images/sprite.svg#icon-calendar"></use>
            </svg>
            <h3 className={classes.countries__head__list__item__header}>
              Start of week:
            </h3>
            <span className={classes.countries__head__list__item__text}>
              {country.startOfWeek}
            </span>
          </li>

          <li className={classes.countries__head__list__item}>
            <svg className={classes.countries__head__list__item__icon}>
              <use xlinkHref="images/sprite.svg#icon-clock2"></use>
            </svg>
            <h3 className={classes.countries__head__list__item__header}>
              Timezone:
            </h3>
            <span className={classes.countries__head__list__item__text}>
              {country.timezones[0]}
              
              
            </span>
          </li>
        </ul>
      </div>

        )
      }
      
      <div className={classes.countries__body}>
        {
          country && <>
          <div className={classes.countries__body__title}>
          <div className={classes.countries__body__title__stick}>&nbsp;</div>
          <span className={classes.countries__body__title__header}>{country.name.official}</span>
        </div>
        <h3 className={classes.countries__header}>
        <a style={{color : 'inherit'}}
          href={`https://en.wikipedia.org/wiki/${country.name.common}`}>
          WIKI!
        </a>
        

        </h3>

        <p className={classes.countries__body__paragraph}>
          Explore more informations and details on wikipedia
        </p>

        <h3 className={classes.countries__header}>
          <a style={{color : 'inherit'}}
          href={country.maps.googleMaps}>
          Geography!
        </a>
        
        </h3>

        <p className={classes.countries__body__paragraph}>
          Explore geagraphy informations on google map 
        </p>
        
          </>
        }
        {/* <a
          href="https://en.wikipedia.org/wiki/Syria"
          className={`${"btn"} ${"btn__launcher"} ${"btn__launcher--country"} ${"btn__launcher--solid"}`}
        >
          Explore More!
        </a> */}
        <br/>
        <br/>
         <Link
          to="/select-country"
          className={`${"btn"} ${"btn__launcher"} ${"btn__launcher--country"} ${"btn__launcher--solid"}`}
        >
          Change Country
        </Link>
        <Link
          to="/select-country"
          className={`${"btn"} ${"btn__launcher"} ${"btn__launcher--country"} ${"btn__launcher--empty"}`}
        >
          Change State
        </Link>
        
        <p className={classes.countries__body__hint}>
          *hint: change the country,state over iTravel App, 
        </p>
      </div>
    </div>
  );
};

export default Countries;
