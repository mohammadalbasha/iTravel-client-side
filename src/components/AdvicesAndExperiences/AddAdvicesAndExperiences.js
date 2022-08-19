import classes from "./AddAdvicesAndExperiences.module.scss";
import { useState, useRef, useContext } from "react";

import useHttp from '../../hooks/use-http'
import { Country, State, City }  from 'country-state-city';

const AddAdviceAndExperience = () => {
  
  const {isLoading, error, success, sendRequest : addExperience} = useHttp();
  const [successMessage, setSuccessMessage] = useState('');

  const types = ['Work', 'Master Study', 'Bachelor Study', 'Pleasure', 'Stays',  'Other'];
  const branches = {
    Work : ['Software Engineers', 'Doctors', 'Civil Engineers', 'Architecturals', 'Electrical Engineers', 'Mechanical Engineers', 'Engineers', 'Accountants', 'Computer science', 'Designers', 'Psychologist and Sociologist', 'Specialist in natural sciences and geography', 'Companies and Foundations', 'Trade', 'industry', 'Free Works', 'Shopping Malls Employeers', 'Restaurants and Cafes', 'Construction workers and workshops', 'Craftsmen and industrialists', 'Others'],
    'Master Study' : ['Educational grant', 'Artificial Intelligence', 'Software Engineering', 'Medicine', 'Electrical Engineering', 'Mechanical Engineering',  'Architect Engineering', 'Civil Engineering', 'Physics', 'Others' ],
    'Bachelor Study' : ['Educational grant', 'Artificial Intelligence', 'Software Engineering', 'Medicine', 'Architect Engineering', 'Civil Engineering','Electrical Engineering', 'Mechanical Engineering', 'Physics', 'Psychology and sociology', 'Economic', 'gelogy and geography',  'Others'],
    Pleasure : ['Sport Events', 'Adventure', 'Seas and Chalets', 'Forests And Mountains', 'Tourist services', 'Hotels and Restaurants', 'Festivals', 'Others'],
    Stays : ['Hotels', 'Apartments'],
    Other : ['Other']
  }

  const [selectedType, setSelectedType] = useState();
  const [selectedBranch, setSelectedBranch] = useState();

  const typeHandler = (type) => {
    setSelectedType(type);
    setSelectedBranch(null);
  }

  const branchHandler = (branch) => {
    setSelectedBranch(branch);
  }
  
  //General Info
  const titleInputRef = useRef();
  //const experienceTypeInputRef = useRef();
    //const experienceBranchInputRef = useRef();


  //Location
  // const countryInputRef = useRef();
  // const cityInputRef = useRef();

  const [country, setCountry] = useState({name:''});
  const [state, setState] = useState({name:''});
  

  //Details
  const detailsInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    //General Info
    const enteredTitle = titleInputRef.current.value;
   // const enteredExperienceType = experienceTypeInputRef.current.value;
    const enteredExperienceType = selectedType;
    const enteredExperienceBranch = selectedBranch;

    //Location
    // const enteredCountry = countryInputRef.current.value;
    // const enteredCity = cityInputRef.current.value;
    const enteredCountry = country.name;
    const enteredCity = state.name;


    //Description
    const enteredDetails = detailsInputRef.current.value;

    // Optional : add validation
    let url = "https://itravel-yymm.herokuapp.com/experiences/addExperience";

      const values = {
      title: enteredTitle,
      type: enteredExperienceType,
      branch: enteredExperienceBranch,
      country: enteredCountry,
      city: enteredCity,
      details: enteredDetails,
    };


    const responseHandler = (message) => {
      setSuccessMessage (message);
    }

    addExperience({url,
               method : 'POST',
               body : values

              },
               responseHandler);
   
  };

  return (
    <div className={classes.addAdviceAndExperience}>
      <form
        className={classes.addAdviceAndExperience__form}
        onSubmit={submitHandler}
      >
        <h3 className={classes.addAdviceAndExperience__header}>
          Add a New Experience
        </h3>
        <div className={classes.addAdviceAndExperience__form__body}>
          <h3 className={classes.addAdviceAndExperience__form__sectionTitle}>
            General Information
          </h3>
          <div className={classes.addAdviceAndExperience__form__section}>
            <div className={classes.addAdviceAndExperience__form__group}>
              <label
                htmlFor="title"
                className={classes.addAdviceAndExperience__form__label}
              >
                Title:
              </label>
              <input
                type="text"
                placeholder="Experience Name"
                className={classes.addAdviceAndExperience__form__input}
                name="title"
                id="title"
                required
                ref={titleInputRef}
              />
            </div>

            <div className={classes.addAdviceAndExperience__form__group}>
              <label
                htmlFor="experienceType"
                className={classes.addAdviceAndExperience__form__label}
              >
                Experience Type:
              </label>
              <select
                id="experienceType"
                name="experienceType"
                className={classes.addAdviceAndExperience__form__input}
                defaultValue={"default"}
                required
                //ref={experienceTypeInputRef}
              >
                <option value="default" disabled>
                  Please select
                </option>
               {
                types.map((type, i) => {
                  return (
                    <option onClick={() => typeHandler(type)} value={type}>{type}</option>
                  )
                })
               }
              </select>
            </div>

    <div className={classes.addAdviceAndExperience__form__group}>
    <label
      htmlFor="experienceBranch"
      className={classes.addAdviceAndExperience__form__label}
    >
      Experience Branch:
    </label>
    {
  selectedType && (

    <select
      id="experienceBranch"
      name="experienceBranch"
      className={classes.addAdviceAndExperience__form__input}
      defaultValue={"default"}
      required
      //ref={experienceTypeInputRef}
    >
      <option value="default" disabled>
        Please select
      </option>
     {selectedType &&
      branches[selectedType].map((branch, i) => {
        return (
          <option onClick={() => branchHandler(branch)}value={branch}>{branch}</option>
        )
      })
     }
    </select>

  )
}
</div>


    
          </div>

          <h3 className={classes.addAdviceAndExperience__form__sectionTitle}>
            Location
          </h3>
          <div className={classes.addAdviceAndExperience__form__section}>
           
           
          <div className={classes.addAdviceAndExperience__form__group}>
              <label htmlFor="country" className={classes.addAdviceAndExperience__form__label}>
                Country:
              </label>
              <select
                id="country"
                name="country"
                className={classes.addAdviceAndExperience__form__input}
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
              

            <div className={classes.addAdviceAndExperience__form__group}>
              <label htmlFor="state" className={classes.addAdviceAndExperience__form__label}>
                State:
              </label>
              <select
                id="state"
                name="state"
                className={classes.addAdviceAndExperience__form__input}
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

          <h3 className={classes.addAdviceAndExperience__form__sectionTitle}>
            Description
          </h3>
          <div className={classes.addAdviceAndExperience__form__section}>
            <div className={classes.addAdviceAndExperience__form__group}>
              <label
                htmlFor="details"
                className={classes.addAdviceAndExperience__form__label}
              >
                Details:
              </label>
              <textarea
                type="text"
                id="details"
                placeholder="Full Details"
                className={`${classes.addAdviceAndExperience__form__input} ${classes["addAdviceAndExperience__form__input--description"]}`}
                ref={detailsInputRef}
              ></textarea>
            </div>
          </div>
        </div>

        {!isLoading && (
          <button
            type="submit"
            className={`${"btn"} ${"btn__hero"}  ${"btn__hero--login"} ${"btn__hero--submit"} ${
              classes["addAdviceAndExperience--btn"]
            }`}
          >
            Submit
          </button>
        )}
        {isLoading && (
          <p className={classes.addAdviceAndExperience__request}>
            Sending request...
          </p>
        )}
          {error && (
          <p className={classes.addAdviceAndExperience__request}>{error}</p>
        )}
        {success && (
          <p className={classes.addAdviceAndExperience__request}>{successMessage}</p>
        )}
      
      </form>
    </div>
  );
};

export default AddAdviceAndExperience;
