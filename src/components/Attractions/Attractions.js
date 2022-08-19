import classes from "./Attractions.module.scss";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import useHttp from "../../hooks/use-http";
import LocationContext from "../../store/location-context"; 

import AttractionInfo from "./AttractionInfo";
import Attraction from './Attraction'
import Spinner from "../Spinner/spinner";
import Error from "../Spinner/error";
const Attractions = () => {
  const params = useParams(); 
  
  const locationCtx = useContext(LocationContext);
  const { isLoading, error, success, sendRequest: fetchAttractions } = useHttp();


  const [showInfo, setShowInfo] = useState(true);
  const [attractionInfo, setAttractionInfo] = useState();
  const [attractions, setAttractions] = useState();


  useEffect (() => {
    setShowInfo( prev => {
      return !prev
    });
  }, [attractionInfo])

  useEffect (()=> {
    const responseHandler = (response) => {
      setAttractions(response);
    }

    const {longitude, latitude} = locationCtx.lonlat;
    const category = params.category;
    
    let url =`https://itravel-yymm.herokuapp.com/places?category=${category}&longitude=${longitude}&latitude=${latitude}`;
      fetchAttractions(
        {url ,
        headers: {
          "Content-Type": "application/json",
        }},
        responseHandler
    );
    
  }, [])
  

  const showInfoHandler = (index) => {
    setAttractionInfo(attractions[index]);
  }

 let content;
 if (isLoading)
  content = <Spinner/> ;
 else if (!isLoading){
  if (!success)
      content = <Error>
          {error}
             </Error>;
  else {
    if (showInfo)
      content = <AttractionInfo {...attractionInfo}/>;
    else 
      content = ( <div>
        <div className={classes.attractions__header}>
          <h3 className={classes.attractions__header__title}>
            Take the first step, the rest will follow.
          </h3>
        </div>
  
        <div className={classes.attractions__search}>
          <p className={classes.attractions__search__paragraph}>
            Explore <span>{params.category}</span> near to <span>{locationCtx.csc.state}</span>:
          </p>
        </div>
  
        <div className={classes.attractions}>
          {attractions.map((attraction, index) => {
            return   <Attraction showInfoHandler={() => showInfoHandler(index)} 
                    name={attraction.name} 
                    state_district={attraction.state_district}
                    city={attraction.city}
                    website={attraction.website}
                    category={attraction.category}
                    categories={attraction.categories}
                    address={attraction.address}
                    />
          })}
        </div>
      </div>)
  
}
}
  

  return (
    content
);
};

export default Attractions;
