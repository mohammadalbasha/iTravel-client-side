import { Link } from "react-router-dom";
import classes from "./AdvicesAndExperiences.module.scss";
import { useContext, useRef, useState } from "react";

import useHttp from "../../hooks/use-http";
import LocationContext from '../../store/location-context'

import Spinner from "../Spinner/spinner";
import Error from "../Spinner/error";;

const AdvicesAndExperiences = () => {
  const [isMyPost, setIsMyPost] = useState(true); //must be an array

  const types = ['Work', 'Master Study', 'Bachelor Study', 'Pleasure', 'Stays', 'Other'];
  const branches = {
    Work : ['Software Engineers', 'Doctors', 'Civil Engineers', 'Architecturals', 'Electrical Engineers', 'Mechanical Engineers', 'Engineers', 'Accountants', 'Computer science', 'Designers', 'Psychologist and Sociologist', 'Specialist in natural sciences and geography', 'Companies and Foundations', 'Trade', 'industry', 'Free Works', 'Shopping Malls Employeers', 'Restaurants and Cafes', 'Construction workers and workshops', 'Craftsmen and industrialists', 'Others'],
    'Master Study' : ['Educational grant', 'Artificial Intelligence', 'Software Engineering', 'Medicine', 'Electrical Engineering', 'Mechanical Engineering',  'Architect Engineering', 'Civil Engineering', 'Physics', 'Others' ],
    'Bachelor Study' : ['Educational grant', 'Artificial Intelligence', 'Software Engineering', 'Medicine', 'Architect Engineering', 'Civil Engineering','Electrical Engineering', 'Mechanical Engineering', 'Physics', 'Psychology and sociology', 'Economic', 'gelogy and geography',  'Others'],
    Pleasure : ['Sport Events', 'Adventure', 'Seas and Chalets', 'Forests And Mountains', 'Tourist services', 'Hotels and Restaurants', 'Festivals', 'Others'],
    Stays : ['Hotels', 'Apartments'],
    Other : ['Other']
  }

  
  const [experiences, setExperiences] = useState([]);
  const [selectedType, setSelectedType] = useState();
  const [selectedBranch, setSelectedBranch] = useState();
  const searchFilterRef = useRef();
  const creatorNationalityRef = useRef();

  const {isLoading, success, error, sendRequest : getExperiences} = useHttp();
  const LocationCtx = useContext(LocationContext);

  const typeHandler = (type) => {
    setSelectedType(type);
    setSelectedBranch(null);
  }

  const branchHandler = (branch) => {
    setSelectedBranch(branch);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const country = LocationCtx.csc.country;
    const city = LocationCtx.csc.state;
    const searchFilter = searchFilterRef.current.value;
    const creatorNationality = creatorNationalityRef.current.value;
    const url = `https://itravel-yymm.herokuapp.com/experiences/getExperiences?country=${country}&city=${city}&searchFilter=${searchFilter}&type=${selectedType}&branch=${selectedBranch}&creatorNationality=${creatorNationality}`
    const responseHandler = (experiences) => {
      setExperiences(experiences);
    }
    getExperiences({url},responseHandler);
  } 
  

  const displayMyPostsHandler = () => {
    console.log("hello");
    //filter results to my posts
  };

  const editMyPostHandler = () => {
    console.log("hello from edit");
  };

  const deleteMyPostHandler = () => {
    console.log("hello from delete");
  };

  return (
    <div className={classes.advicesAndExperiences}>
      <div className={classes.advicesAndExperiences__header}>
        <h3 className={classes.advicesAndExperiences__header__title}>
          Experience is the teacher of all things.
        </h3>
      </div>

      <div className={classes.advicesAndExperiences__search}>
        <p className={classes.advicesAndExperiences__search__paragraph}>
          Explore Advices and Experiences in <span>{LocationCtx.csc.country},{LocationCtx.csc.state}</span>:
        </p>
        {/* <button
          type="button"
          className="btn btn__hero  btn__hero--login btn__hero--submit"
          style={{
            marginRight: "5rem",
            width: "14rem",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
          onClick={displayMyPostsHandler}
        >
          View my Posts
        </button> */}


      </div>
      <div className={classes.advicesAndExperiences__filters}>
          <div className={classes.advicesAndExperiences__filters__group}>
            <label className={classes.advicesAndExperiences__filters__label}
            htmlFor="type"
            >
              Experience type:
            </label>
            <select
                id="experienceType"
                name="experienceType"
                className={classes.advicesAndExperiences__filters__input}
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

          <div className={classes.advicesAndExperiences__filters__group}>
    <label
      htmlFor="experienceBranch"
      className={classes.advicesAndExperiences__filters__label}
    >
      Experience Branch:
    </label>
    {
  

    <select
      id="experienceBranch"
      name="experienceBranch"
      disabled={!selectedType}
      className={classes.advicesAndExperiences__filters__input}
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

  
}
</div>

<div className={classes.advicesAndExperiences__filters__group}>
            <label className={classes.advicesAndExperiences__filters__label}
            htmlFor="searchFilter"
            >
              Search filter:
            </label>
            <input
                id="searchFilter"
                name="searchFilter"
                type="text"
                className={classes.advicesAndExperiences__filters__input}
                ref={searchFilterRef}
                />
                
              
          
          </div>

          <div
            className={classes.advicesAndExperiences__filters__group}
          >
            <label
              htmlFor="nationality"
              className={classes.advicesAndExperiences__filters__label}
            >
              Creator Nationality:
            </label>
            <select
              className={classes.advicesAndExperiences__filters__input}
              name="nationality"
              id="nationality"
              defaultValue={'default'}
              ref={creatorNationalityRef}
            >
              <option value='default' disabled>
                Please select
              </option>
              <option value="afghan">Afghan</option>
              <option value="albanian">Albanian</option>
              <option value="algerian">Algerian</option>
              <option value="american">American</option>
              <option value="andorran">Andorran</option>
              <option value="angolan">Angolan</option>
              <option value="anguillan">Anguillan</option>
              <option value="citizen-of-antigua-and-barbuda">
                Citizen of Antigua and Barbuda
              </option>
              <option value="argentine">Argentine</option>
              <option value="armenianaustralian">ArmenianAustralian</option>
              <option value="austrian">Austrian</option>
              <option value="azerbaijani">Azerbaijani</option>
              <option value="bahamian">Bahamian</option>
              <option value="bahraini">Bahraini</option>
              <option value="bangladeshi">Bangladeshi</option>
              <option value="barbadian">Barbadian</option>
              <option value="belarusian">Belarusian</option>
              <option value="belgian">Belgian</option>
              <option value="belizean">Belizean</option>
              <option value="beninese">Beninese</option>
              <option value="bermudian">Bermudian</option>
              <option value="bhutanese">Bhutanese</option>
              <option value="bolivian">Bolivian</option>
              <option value="citizen-of-bosnia-and-herzegovina">
                Citizen of Bosnia and Herzegovina
              </option>
              <option value="botswanan">Botswanan</option>
              <option value="brazilian">Brazilian</option>
              <option value="british">British</option>
              <option value="british-virgin-islander">
                British Virgin Islander
              </option>
              <option value="bruneian">Bruneian</option>
              <option value="bulgarian">Bulgarian</option>
              <option value="burkinan">Burkinan</option>
              <option value="burmese">Burmese</option>
              <option value="burundian">Burundian</option>
              <option value="cambodian">Cambodian</option>
              <option value="cameroonian">Cameroonian</option>
              <option value="canadian">Canadian</option>
              <option value="cape-verdean">Cape Verdean</option>
              <option value="cayman-islander">Cayman Islander</option>
              <option value="central-african">Central African</option>
              <option value="chadian">Chadian</option>
              <option value="chilean">Chilean</option>
              <option value="chinese">Chinese</option>
              <option value="colombian">Colombian</option>
              <option value="comoran">Comoran</option>
              <option value="congolese-(congo)">Congolese (Congo)</option>
              <option value="congolese-(drc)">Congolese (DRC)</option>
              <option value="cook-islander">Cook Islander</option>
              <option value="costa-rican">Costa Rican</option>
              <option value="croatian">Croatian</option>
              <option value="cuban">Cuban</option>
              <option value="cymraes">Cymraes</option>
              <option value="cymro">Cymro</option>
              <option value="cypriot">Cypriot</option>
              <option value="czech">Czech</option>
              <option value="danish">Danish</option>
              <option value="djiboutian">Djiboutian</option>
              <option value="dominican">Dominican</option>
              <option value="citizen-of-the-dominican-republic">
                Citizen of the Dominican Republic
              </option>
              <option value="dutch">Dutch</option>
              <option value="east-timorese">East Timorese</option>
              <option value="ecuadorean">Ecuadorean</option>
              <option value="egyptian">Egyptian</option>
              <option value="emirati">Emirati</option>
              <option value="english">English</option>
              <option value="equatorial-guinean">Equatorial Guinean</option>
              <option value="eritrean">Eritrean</option>
              <option value="estonian">Estonian</option>
              <option value="ethiopian">Ethiopian</option>
              <option value="faroese">Faroese</option>
              <option value="fijian">Fijian</option>
              <option value="filipino">Filipino</option>
              <option value="finnish">Finnish</option>
              <option value="french">French</option>
              <option value="gabonese">Gabonese</option>
              <option value="gambian">Gambian</option>
              <option value="georgian">Georgian</option>
              <option value="german">German</option>
              <option value="ghanaian">Ghanaian</option>
              <option value="gibraltarian">Gibraltarian</option>
              <option value="greek">Greek</option>
              <option value="greenlandic">Greenlandic</option>
              <option value="grenadian">Grenadian</option>
              <option value="guamanian">Guamanian</option>
              <option value="guatemalan">Guatemalan</option>
              <option value="citizen-of-guinea-bissau">
                Citizen of Guinea-Bissau
              </option>
              <option value="guinean">Guinean</option>
              <option value="guyanese">Guyanese</option>
              <option value="haitian">Haitian</option>
              <option value="honduran">Honduran</option>
              <option value="hong-konger">Hong Konger</option>
              <option value="hungarian">Hungarian</option>
              <option value="icelandic">Icelandic</option>
              <option value="indian">Indian</option>
              <option value="indonesian">Indonesian</option>
              <option value="iranian">Iranian</option>
              <option value="iraqi">Iraqi</option>
              <option value="irish">Irish</option>
              <option value="italian">Italian</option>
              <option value="ivorian">Ivorian</option>
              <option value="jamaican">Jamaican</option>
              <option value="japanese">Japanese</option>
              <option value="jordanian">Jordanian</option>
              <option value="kazakh">Kazakh</option>
              <option value="kenyan">Kenyan</option>
              <option value="kittitian">Kittitian</option>
              <option value="citizen-of-kiribati">Citizen of Kiribati</option>
              <option value="kosovan">Kosovan</option>
              <option value="kuwaiti">Kuwaiti</option>
              <option value="kyrgyz">Kyrgyz</option>
              <option value="lao">Lao</option>
              <option value="latvian">Latvian</option>
              <option value="lebanese">Lebanese</option>
              <option value="liberian">Liberian</option>
              <option value="libyan">Libyan</option>
              <option value="liechtenstein-citizen">
                Liechtenstein citizen
              </option>
              <option value="lithuanian">Lithuanian</option>
              <option value="luxembourger">Luxembourger</option>
              <option value="macanese">Macanese</option>
              <option value="macedonian">Macedonian</option>
              <option value="malagasy">Malagasy</option>
              <option value="malawian">Malawian</option>
              <option value="malaysian">Malaysian</option>
              <option value="maldivian">Maldivian</option>
              <option value="malian">Malian</option>
              <option value="maltese">Maltese</option>
              <option value="marshallese">Marshallese</option>
              <option value="martiniquais">Martiniquais</option>
              <option value="mauritanian">Mauritanian</option>
              <option value="mauritian">Mauritian</option>
              <option value="mexican">Mexican</option>
              <option value="micronesian">Micronesian</option>
              <option value="moldovan">Moldovan</option>
              <option value="monegasque">Monegasque</option>
              <option value="mongolian">Mongolian</option>
              <option value="montenegrin">Montenegrin</option>
              <option value="montserratian">Montserratian</option>
              <option value="moroccan">Moroccan</option>
              <option value="mosotho">Mosotho</option>
              <option value="mozambican">Mozambican</option>
              <option value="namibian">Namibian</option>
              <option value="nauruan">Nauruan</option>
              <option value="nepalese">Nepalese</option>
              <option value="new-zealander">New Zealander</option>
              <option value="nicaraguan">Nicaraguan</option>
              <option value="nigerian">Nigerian</option>
              <option value="nigerien">Nigerien</option>
              <option value="niuean">Niuean</option>
              <option value="north-korean">North Korean</option>
              <option value="northern-irish">Northern Irish</option>
              <option value="norwegian">Norwegian</option>
              <option value="omani">Omani</option>
              <option value="pakistani">Pakistani</option>
              <option value="palauan">Palauan</option>
              <option value="palestinian">Palestinian</option>
              <option value="panamanian">Panamanian</option>
              <option value="papua-new-guinean">Papua New Guinean</option>
              <option value="paraguayan">Paraguayan</option>
              <option value="peruvian">Peruvian</option>
              <option value="pitcairn-islander">Pitcairn Islander</option>
              <option value="polish">Polish</option>
              <option value="portuguese">Portuguese</option>
              <option value="prydeinig">Prydeinig</option>
              <option value="puerto-rican">Puerto Rican</option>
              <option value="qatari">Qatari</option>
              <option value="romanian">Romanian</option>
              <option value="russian">Russian</option>
              <option value="rwandan">Rwandan</option>
              <option value="salvadorean">Salvadorean</option>
              <option value="sammarinese">Sammarinese</option>
              <option value="samoan">Samoan</option>
              <option value="sao-tomean">Sao Tomean</option>
              <option value="saudi-arabian">Saudi Arabian</option>
              <option value="scottish">Scottish</option>
              <option value="senegalese">Senegalese</option>
              <option value="serbian">Serbian</option>
              <option value="citizen-of-seychelles">
                Citizen of Seychelles
              </option>
              <option value="sierra-leonean">Sierra Leonean</option>
              <option value="singaporean">Singaporean</option>
              <option value="slovak">Slovak</option>
              <option value="slovenian">Slovenian</option>
              <option value="solomon-islander">Solomon Islander</option>
              <option value="somali">Somali</option>
              <option value="south-african">South African</option>
              <option value="south-korean">South Korean</option>
              <option value="south-sudanese">South Sudanese</option>
              <option value="spanish">Spanish</option>
              <option value="sri-lankan">Sri Lankan</option>
              <option value="st-helenian">St Helenian</option>
              <option value="st-lucian">St Lucian</option>
              <option value="stateless">Stateless</option>
              <option value="sudanese">Sudanese</option>
              <option value="surinamese">Surinamese</option>
              <option value="swazi">Swazi</option>
              <option value="swedish">Swedish</option>
              <option value="swiss">Swiss</option>
              <option value="syrian">Syrian</option>
              <option value="taiwanese">Taiwanese</option>
              <option value="tajik">Tajik</option>
              <option value="tanzanian">Tanzanian</option>
              <option value="thai">Thai</option>
              <option value="togolese">Togolese</option>
              <option value="tongan">Tongan</option>
              <option value="trinidadian">Trinidadian</option>
              <option value="tristanian">Tristanian</option>
              <option value="tunisian">Tunisian</option>
              <option value="turkish">Turkish</option>
              <option value="turkmen">Turkmen</option>
              <option value="turks-and-caicos-islander">
                Turks and Caicos Islander
              </option>
              <option value="tuvaluan">Tuvaluan</option>
              <option value="ugandan">Ugandan</option>
              <option value="ukrainian">Ukrainian</option>
              <option value="uruguayan">Uruguayan</option>
              <option value="uzbek">Uzbek</option>
              <option value="vatican-citizen">Vatican citizen</option>
              <option value="citizen-of-vanuatu">Citizen of Vanuatu</option>
              <option value="venezuelan">Venezuelan</option>
              <option value="vietnamese">Vietnamese</option>
              <option value="vincentian">Vincentian</option>
              <option value="wallisian">Wallisian</option>
              <option value="welsh">Welsh</option>
              <option value="yemeni">Yemeni</option>
              <option value="zambian">Zambian</option>
              <option value="zimbabwean">Zimbabwean</option>
            </select>
          </div>

          <button onClick={submitHandler} className={classes.advicesAndExperiences__filters__submit}>
            submit
          </button>


      </div>

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
    success && (
      <ul className={classes.advicesAndExperiences__list}>
        {
          experiences.map(experience => {
            return (
              <li className={classes.advicesAndExperiences__list__item}>
          <div className={classes.advicesAndExperiences__list__item__details}>
            <div
              className={
                classes.advicesAndExperiences__list__item__details__group
              }
            >
              <span
                className={
                  classes.advicesAndExperiences__list__item__details__info
                }
              >
                Title:
              </span>
              <span
                className={
                  classes.advicesAndExperiences__list__item__details__fullName
                }
              >
                {experience.title}
              </span>
            </div>

            <div
              className={
                classes.advicesAndExperiences__list__item__details__group
              }
            >
              <span
                className={
                  classes.advicesAndExperiences__list__item__details__info
                }
              >
                Experience Type:
              </span>
              <span
                className={
                  classes.advicesAndExperiences__list__item__details__username
                }
              >
                {experience.type}
              </span>
            </div>

            
            <div
              className={
                classes.advicesAndExperiences__list__item__details__group
              }
            >
              <span
                className={
                  classes.advicesAndExperiences__list__item__details__info
                }
              >
                Experience Branch:
              </span>
              <span
                className={
                  classes.advicesAndExperiences__list__item__details__username
                }
              >
                {experience.branch}
              </span>
            </div>

            <div
              className={
                classes.advicesAndExperiences__list__item__details__group
              }
            >
              <span
                className={
                  classes.advicesAndExperiences__list__item__details__info
                }
              >
                Country:
              </span>
              <span
                className={
                  classes.advicesAndExperiences__list__item__details__username
                }
              >
                {experience.country}
              </span>
            </div>

            <div
              className={
                classes.advicesAndExperiences__list__item__details__group
              }
            >
              <span
                className={
                  classes.advicesAndExperiences__list__item__details__info
                }
              >
                State:
              </span>
              <span
                className={
                  classes.advicesAndExperiences__list__item__details__username
                }
              >
                {experience.city}
              </span>
            </div>

            <div
              className={
                classes.advicesAndExperiences__list__item__details__group
              }
            >
              <span
                className={
                  classes.advicesAndExperiences__list__item__details__info
                }
              >
                Details:
              </span>
              <span
                className={
                  classes.advicesAndExperiences__list__item__details__phoneNumber
                }
              >
                {experience.details}
              </span>
            </div>
          {true && (
            <>
            
            <div
              className={
                classes.advicesAndExperiences__list__item__details__group
              }
            >
              <span
                className={
                  classes.advicesAndExperiences__list__item__details__info
                }
              >
                Creator name:
              </span>
              <span
                className={
                  classes.advicesAndExperiences__list__item__details__phoneNumber
                }
              >
                {experience.creator.firstName} {experience.creator.lastName}
              </span>
            </div>
            
            <div
              className={
                classes.advicesAndExperiences__list__item__details__group
              }
            >
              <span
                className={
                  classes.advicesAndExperiences__list__item__details__info
                }
              >
                creator email:
              </span>
              <span
                className={
                  classes.advicesAndExperiences__list__item__details__phoneNumber
                }
              >
                {experience.creator.email}
              </span>
            </div>
            
            <div
              className={
                classes.advicesAndExperiences__list__item__details__group
              }
            >
              <span
                className={
                  classes.advicesAndExperiences__list__item__details__info
                }
              >
                Creator phone:
              </span>
              <span
                className={
                  classes.advicesAndExperiences__list__item__details__phoneNumber
                }
              >
                {experience.creator.phoneNumber}
              </span>
            </div>


            <div
              className={
                classes.advicesAndExperiences__list__item__details__group
              }
            >
              <span
                className={
                  classes.advicesAndExperiences__list__item__details__info
                }
              >
                Creator nationality:
              </span>
              <span
                className={
                  classes.advicesAndExperiences__list__item__details__phoneNumber
                }
              >
                {experience.creator.nationality}
              </span>
            </div>
            </>
          )

          }
                    </div>

        </li>

            )

          })
        }
        
              </ul>
  

    )
  }
        </div>
  );
};

export default AdvicesAndExperiences;
