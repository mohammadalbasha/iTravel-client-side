import classes from "./AddTrip.module.scss";
import { useState, useRef, useContext } from "react";
//import { useHistory } from "react-router-dom";
import { Country, State} from 'country-state-city';

import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";
const AddTrip = () => {
  const authCtx = useContext(AuthContext);
 // const history = useHistory();
 const {isLoading, error, success, sendRequest : addTrip} = useHttp();
 const [successMessage, setSuccessMessage] = useState('');

 const [imagesCounter, setImagesCounter] = useState(0);


  //General Info
  const capacityInputRef = useRef();
  const tripNameInputRef = useRef();
  const durationInputRef = useRef();
  const transportationInputRef = useRef();

  //Location
  //const countryInputRef = useRef();
  //const destinationCityInputRef = useRef();
  const destinationPlaceInputRef = useRef();
  //const launchCityInputRef = useRef();
  const launchPlaceInputRef = useRef();

  const [country, setCountry] = useState({name:''});
  const [launchState, setLaunchState] = useState({name:''});
  const [destinationState, setDestinationState] = useState({name:''});

   

  //Description
  const descriptionInputRef = useRef();

     //stations
     const station1InputRef = useRef();
     const station2InputRef = useRef();
     const station3InputRef = useRef();
     const station4InputRef = useRef();
     const station5InputRef = useRef();
     const station6InputRef = useRef();

//stations
const feature1InputRef = useRef();
const feature2InputRef = useRef();
const feature3InputRef = useRef();
const feature4InputRef = useRef();
const feature5InputRef = useRef();
const feature6InputRef = useRef();


 //images
 const [images, setImages] = useState([]);

 const imageHandler = (e) => {
  setImages([...images, e.target.files[0]]);
}

  //Pricing & Lease Contract
  const currencyInputRef = useRef();
  const costPerPersonInputRef = useRef();
  const launchDateInputRef = useRef();
  const returnDateInputRef = useRef();

  //Contact Info
  const emailInputRef = useRef();
  const phoneNumberInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    alert("lskdmv")
    //General Info
    const enteredTripName = tripNameInputRef.current.value;
    const enteredDuration = durationInputRef.current.value;
    const enteredCapacity = capacityInputRef.current.value;
    const enteredTransportation = transportationInputRef.current.value;

    //Location
    const enteredCountry = country.name;
    const enteredDestinationCity = destinationState.name;
    const enteredDestinationPlace = destinationPlaceInputRef.current.value;
    const enteredLaunchCity = launchState.name;
    const enteredLaunchPlace = launchPlaceInputRef.current.value;

    //stations
    const enteredStation1 = station1InputRef.current.value;
    const enteredStation2 = station2InputRef.current.value;
    const enteredStation3 = station3InputRef.current.value;

    const enteredFeature1 = feature1InputRef.current.value;
    const enteredFeature2 = feature2InputRef.current.value;
    const enteredFeature3 = feature3InputRef.current.value;

    
    //Description
    const enteredDescription = descriptionInputRef.current.value;

    // //Images
    // const enteredImage = imageInputRef.current.value;

    //Pricing & Dates
    const enteredCurrency = currencyInputRef.current.value;
    const enteredCostPerPerson = costPerPersonInputRef.current.value;
    const enteredLaunchDate = launchDateInputRef.current.value;
    const enteredReturnDate = returnDateInputRef.current.value;

    //Contact Information
    const enteredPhoneNumber = phoneNumberInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;

    // Optional : add validation

    const values = {
      tripName: enteredTripName,
      capacity: enteredCapacity,
      duration: enteredDuration,
      transportations: enteredTransportation,
      country: enteredCountry,
      destinationCity: enteredDestinationCity,
      destinationPlace: enteredDestinationPlace,
      launchCity: enteredLaunchCity,
      launchPlace: enteredLaunchPlace,
      stations: [enteredStation1, enteredStation2, enteredStation3],
      features: [enteredFeature1, enteredFeature2, enteredFeature3],
      description: enteredDescription,
      currency: enteredCurrency,
      cost: enteredCostPerPerson,
      launchDate: enteredLaunchDate,
      returnDate: enteredReturnDate,
      phoneNumber: enteredPhoneNumber,
      email: enteredEmail,
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

    let url = `https://itravel-yymm.herokuapp.com/trips/addTrip`;

    addTrip({url,
    method:'POST',
    body: formData
  }, responseHandler)
  };

  return (
    <div className={classes.addTrip}>
      <form className={classes.addTrip__form} onSubmit={submitHandler}>
        <h3 className={classes.addTrip__header}>Add a New Trip</h3>
        <div className={classes.addTrip__form__body}>
          <h3 className={classes.addTrip__form__sectionTitle}>
            Trip General Information
          </h3>
          <div className={classes.addTrip__form__section}>
            <div className={classes.addTrip__form__group}>
              <label
                htmlFor="tripName"
                className={classes.addTrip__form__label}
              >
                Trip Name:
              </label>
              <input
                type="text"
                placeholder="Trip Name"
                className={classes.addTrip__form__input}
                name="tripName"
                id="tripName"
                required
                ref={tripNameInputRef}
              />
            </div>

            <div className={classes.addTrip__form__group}>
              <label
                htmlFor="capacity"
                className={classes.addTrip__form__label}
              >
                Capacity:
              </label>
              <input
                type="number"
                placeholder="Capacity (No. people)"
                className={classes.addTrip__form__input}
                name="capacity"
                id="capacity"
                min="1"
                required
                ref={capacityInputRef}
              />
            </div>
            
            <div className={classes.addTrip__form__group}>
              <label
                htmlFor="duration"
                className={classes.addTrip__form__label}
              >
                Duration:
              </label>
              <select
                className={classes.addTrip__form__input}
                name="duration"
                id="duration"
                defaultValue={"default"}
                required
                ref={durationInputRef}
              >
                <option value="default" disabled>
                  Please select
                </option>
                <option value="oneDay">1 day</option>
                <option value="threeDays">3 days</option>
                <option value="fiveDays">5 days</option>
                <option value="oneWeek">1 week</option>
                <option value="twoWeeks">2 weeks</option>
                <option value="oneMonth">1 month</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={classes.addTrip__form__group}>
              <label
                htmlFor="transportation"
                className={classes.addTrip__form__label}
              >
                Transportation:
              </label>
              <select
                className={classes.addTrip__form__input}
                name="transportation"
                id="transportation"
                defaultValue={"default"}
                required
                ref={transportationInputRef}
              >
                <option value="default" disabled>
                  Please select
                </option>
                {
                  ['bus', 'train', 'microbus', 'ship', 'boat', 'multiple', 'yacht', 'boat', 'motor', 'bicycle'].map(tr => <option value={tr}>{tr}</option>)
                }
               </select>
            </div>
          </div>

          <h3 className={classes.addTrip__form__sectionTitle}>Trip Location</h3>
          <div className={classes.addTrip__form__section}>
          <div className={classes.addTrip__form__group}>
              <label htmlFor="country" className={classes.addTrip__form__label}>
                Country:
              </label>
              <select
                id="country"
                name="country"
                className={classes.addTrip__form__input}
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
              

            <div className={classes.addTrip__form__group}>
              <label htmlFor="state" className={classes.addTrip__form__label}>
                Launch State:
              </label>
              <select
                id="launchState"
                name="destinationState"
                className={classes.addTrip__form__input}
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
                      onClick={()=>setLaunchState(state)}

                      >{state.name}</option>
                    )
                  })
                }
              </select>




            </div>




            <div className={classes.addTrip__form__group}>
              <label htmlFor="state" className={classes.addTrip__form__label}>
                Destination State:
              </label>
              <select
                id="destinationState"
                name="destinationState"
                className={classes.addTrip__form__input}
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
                      onClick={()=>setDestinationState(state)}

                      >{state.name}</option>
                    )
                  })
                }
              </select>
</div>
            
            <div className={classes.addTrip__form__group}>
              <label htmlFor="destinationPlace" className={classes.addTrip__form__label}>
                Destination Place:
              </label>
              <input
                type="text"
                placeholder="Trip Destination Place"
                className={classes.addTrip__form__input}
                name="destinationPlace"
                id="destinationPlace"
                ref={destinationPlaceInputRef}
                required
              />
            </div>
            
            

            <div className={classes.addTrip__form__group}>
              <label htmlFor="launchPlace" className={classes.addTrip__form__label}>
                Launch Place:
              </label>
              <input
                type="text"
                placeholder="Launch Place"
                className={classes.addTrip__form__input}
                name="launchPlace"
                id="launchPlace"
                ref={launchPlaceInputRef}
                required
              />
            </div>

          </div>
          <h3 className={classes.addTrip__form__sectionTitle}>Trip Images</h3>
          <div className={classes.addTrip__form__section}>
            
              {
              [...Array(Math.min(imagesCounter, 6))].map((e, i) => {
                return (
                  <div
                  className={`${classes.addTrip__form__group}`}
                >
                  <label
                    htmlFor="image"
                    className={classes.addTrip__form__label}
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
              {imagesCounter < 6 &&  
              <div className={classes.addTrip__form__group}>
              <label
                htmlFor="imagesCounter"
                className={classes.addTrip__form__label}
              >
                add photo:
              </label>
              <button
                type="button"
                className={classes['addTrip--add-btn']}
                id="imagesCounter"
                onClick={() => {setImagesCounter(prev => prev+1)}}
              >
                +
              </button>
            </div>
            }
          </div>

          <h3 className={classes.addTrip__form__sectionTitle}>
            Trip Stations
          </h3>
          <div className={classes.addTrip__form__section}>
            <div className={classes.addTrip__form__group}>
              <label
                htmlFor="station1"
                className={classes.addTrip__form__label}
              >
                Station 1:
              </label>
              <input
                type="text"
                placeholder="Station 1"
                className={classes.addTrip__form__input}
                name="station1"
                id="station1"
                ref={station1InputRef}
              />
            </div>

            <div className={classes.addTrip__form__group}>
              <label
                htmlFor="station2"
                className={classes.addTrip__form__label}
              >
                Station 2:
              </label>
              <input
                type="text"
                placeholder="Station 2"
                className={classes.addTrip__form__input}
                name="station2"
                id="station2"
                ref={station2InputRef}
              />
            </div>
            <div className={classes.addTrip__form__group}>
              <label
                htmlFor="station3"
                className={classes.addTrip__form__label}
              >
                Station 3:
              </label>
              <input
                type="text"
                placeholder="Station 3"
                className={classes.addTrip__form__input}
                name="station3"
                id="station3"
                ref={station3InputRef}
              />
            </div>
            <div className={classes.addTrip__form__group}>
              <label
                htmlFor="station4"
                className={classes.addTrip__form__label}
              >
                Station 4:
              </label>
              <input
                type="text"
                placeholder="Station 4"
                className={classes.addTrip__form__input}
                name="station4"
                id="station4"
                ref={station4InputRef}
              />
            </div>
            

            
          </div>

          <h3 className={classes.addTrip__form__sectionTitle}>
            Trip Features
          </h3>
          <div className={classes.addTrip__form__section}>
            <div className={classes.addTrip__form__group}>
              <label
                htmlFor="feature1"
                className={classes.addTrip__form__label}
              >
                Feature 1:
              </label>
              <input
                type="text"
                placeholder="Feature 1"
                className={classes.addTrip__form__input}
                name="feature1"
                id="feature1"
                ref={feature1InputRef}
              />
            </div>

            <div className={classes.addTrip__form__group}>
              <label
                htmlFor="feature2"
                className={classes.addTrip__form__label}
              >
                Feature 2:
              </label>
              <input
                type="text"
                placeholder="Feature 2"
                className={classes.addTrip__form__input}
                name="feature2"
                id="feature2"
                ref={feature2InputRef}
              />
            </div>
            <div className={classes.addTrip__form__group}>
              <label
                htmlFor="feature3"
                className={classes.addTrip__form__label}
              >
                Feature 3:
              </label>
              <input
                type="text"
                placeholder="Feature 3"
                className={classes.addTrip__form__input}
                name="feature3"
                id="feature3"
                ref={feature3InputRef}
              />
            </div>
            <div className={classes.addTrip__form__group}>
              <label
                htmlFor="feature4"
                className={classes.addTrip__form__label}
              >
                Feature 4:
              </label>
              <input
                type="text"
                placeholder="Feature 4"
                className={classes.addTrip__form__input}
                name="feature4"
                id="feature4"
                ref={feature4InputRef}
              />
            </div>


            
          </div>

          <h3 className={classes.addTrip__form__sectionTitle}>
            Trip Description
          </h3>
          <div className={classes.addTrip__form__section}>
            <div className={classes.addTrip__form__group}>
              <label
                htmlFor="description"
                className={classes.addTrip__form__label}
              >
                Description:
              </label>
              <textarea
                type="text"
                id="description"
                placeholder="Full Description"
                className={`${classes.addTrip__form__input} ${classes["addTrip__form__input--description"]}`}
                ref={descriptionInputRef}
              ></textarea>
            </div>
          </div>

          
          <h3 className={classes.addTrip__form__sectionTitle}>
            Pricing & Dates
          </h3>
          <div className={classes.addTrip__form__section}>
            <div className={classes.addTrip__form__group}>
              <label
                htmlFor="currency"
                className={classes.addTrip__form__label}
              >
                Currency:
              </label>
              <select
                id="currency"
                name="currency"
                className={classes.addTrip__form__input}
                defaultValue={"default"}
                required
                ref={currencyInputRef}
              >
                <option value="default" disabled>
                  select currency
                </option>
                <option value="AFN">Afghan Afghani</option>
                <option value="ALL">Albanian Lek</option>
                <option value="DZD">Algerian Dinar</option>
                <option value="AOA">Angolan Kwanza</option>
                <option value="ARS">Argentine Peso</option>
                <option value="AMD">Armenian Dram</option>
                <option value="AWG">Aruban Florin</option>
                <option value="AUD">Australian Dollar</option>
                <option value="AZN">Azerbaijani Manat</option>
                <option value="BSD">Bahamian Dollar</option>
                <option value="BHD">Bahraini Dinar</option>
                <option value="BDT">Bangladeshi Taka</option>
                <option value="BBD">Barbadian Dollar</option>
                <option value="BYR">Belarusian Ruble</option>
                <option value="BEF">Belgian Franc</option>
                <option value="BZD">Belize Dollar</option>
                <option value="BMD">Bermudan Dollar</option>
                <option value="BTN">Bhutanese Ngultrum</option>
                <option value="BTC">Bitcoin</option>
                <option value="BOB">Bolivian Boliviano</option>
                <option value="BAM">Bosnia-Herzegovina Convertible Mark</option>
                <option value="BWP">Botswanan Pula</option>
                <option value="BRL">Brazilian Real</option>
                <option value="GBP">British Pound Sterling</option>
                <option value="BND">Brunei Dollar</option>
                <option value="BGN">Bulgarian Lev</option>
                <option value="BIF">Burundian Franc</option>
                <option value="KHR">Cambodian Riel</option>
                <option value="CAD">Canadian Dollar</option>
                <option value="CVE">Cape Verdean Escudo</option>
                <option value="KYD">Cayman Islands Dollar</option>
                <option value="XOF">CFA Franc BCEAO</option>
                <option value="XAF">CFA Franc BEAC</option>
                <option value="XPF">CFP Franc</option>
                <option value="CLP">Chilean Peso</option>
                <option value="CNY">Chinese Yuan</option>
                <option value="COP">Colombian Peso</option>
                <option value="KMF">Comorian Franc</option>
                <option value="CDF">Congolese Franc</option>
                <option value="CRC">Costa Rican ColÃ³n</option>
                <option value="HRK">Croatian Kuna</option>
                <option value="CUC">Cuban Convertible Peso</option>
                <option value="CZK">Czech Republic Koruna</option>
                <option value="DKK">Danish Krone</option>
                <option value="DJF">Djiboutian Franc</option>
                <option value="DOP">Dominican Peso</option>
                <option value="XCD">East Caribbean Dollar</option>
                <option value="EGP">Egyptian Pound</option>
                <option value="ERN">Eritrean Nakfa</option>
                <option value="EEK">Estonian Kroon</option>
                <option value="ETB">Ethiopian Birr</option>
                <option value="EUR">Euro</option>
                <option value="FKP">Falkland Islands Pound</option>
                <option value="FJD">Fijian Dollar</option>
                <option value="GMD">Gambian Dalasi</option>
                <option value="GEL">Georgian Lari</option>
                <option value="DEM">German Mark</option>
                <option value="GHS">Ghanaian Cedi</option>
                <option value="GIP">Gibraltar Pound</option>
                <option value="GRD">Greek Drachma</option>
                <option value="GTQ">Guatemalan Quetzal</option>
                <option value="GNF">Guinean Franc</option>
                <option value="GYD">Guyanaese Dollar</option>
                <option value="HTG">Haitian Gourde</option>
                <option value="HNL">Honduran Lempira</option>
                <option value="HKD">Hong Kong Dollar</option>
                <option value="HUF">Hungarian Forint</option>
                <option value="ISK">Icelandic KrÃ³na</option>
                <option value="INR">Indian Rupee</option>
                <option value="IDR">Indonesian Rupiah</option>
                <option value="IRR">Iranian Rial</option>
                <option value="IQD">Iraqi Dinar</option>
                <option value="ITL">Italian Lira</option>
                <option value="JMD">Jamaican Dollar</option>
                <option value="JPY">Japanese Yen</option>
                <option value="JOD">Jordanian Dinar</option>
                <option value="KZT">Kazakhstani Tenge</option>
                <option value="KES">Kenyan Shilling</option>
                <option value="KWD">Kuwaiti Dinar</option>
                <option value="KGS">Kyrgystani Som</option>
                <option value="LAK">Laotian Kip</option>
                <option value="LVL">Latvian Lats</option>
                <option value="LBP">Lebanese Pound</option>
                <option value="LSL">Lesotho Loti</option>
                <option value="LRD">Liberian Dollar</option>
                <option value="LYD">Libyan Dinar</option>
                <option value="LTL">Lithuanian Litas</option>
                <option value="MOP">Macanese Pataca</option>
                <option value="MKD">Macedonian Denar</option>
                <option value="MGA">Malagasy Ariary</option>
                <option value="MWK">Malawian Kwacha</option>
                <option value="MYR">Malaysian Ringgit</option>
                <option value="MVR">Maldivian Rufiyaa</option>
                <option value="MRO">Mauritanian Ouguiya</option>
                <option value="MUR">Mauritian Rupee</option>
                <option value="MXN">Mexican Peso</option>
                <option value="MDL">Moldovan Leu</option>
                <option value="MNT">Mongolian Tugrik</option>
                <option value="MAD">Moroccan Dirham</option>
                <option value="MZM">Mozambican Metical</option>
                <option value="MMK">Myanmar Kyat</option>
                <option value="NAD">Namibian Dollar</option>
                <option value="NPR">Nepalese Rupee</option>
                <option value="ANG">Netherlands Antillean Guilder</option>
                <option value="TWD">New Taiwan Dollar</option>
                <option value="NZD">New Zealand Dollar</option>
                <option value="NIO">Nicaraguan CÃ³rdoba</option>
                <option value="NGN">Nigerian Naira</option>
                <option value="KPW">North Korean Won</option>
                <option value="NOK">Norwegian Krone</option>
                <option value="OMR">Omani Rial</option>
                <option value="PKR">Pakistani Rupee</option>
                <option value="PAB">Panamanian Balboa</option>
                <option value="PGK">Papua New Guinean Kina</option>
                <option value="PYG">Paraguayan Guarani</option>
                <option value="PEN">Peruvian Nuevo Sol</option>
                <option value="PHP">Philippine Peso</option>
                <option value="PLN">Polish Zloty</option>
                <option value="QAR">Qatari Rial</option>
                <option value="RON">Romanian Leu</option>
                <option value="RUB">Russian Ruble</option>
                <option value="RWF">Rwandan Franc</option>
                <option value="SVC">Salvadoran ColÃ³n</option>
                <option value="WST">Samoan Tala</option>
                <option value="SAR">Saudi Riyal</option>
                <option value="RSD">Serbian Dinar</option>
                <option value="SCR">Seychellois Rupee</option>
                <option value="SLL">Sierra Leonean Leone</option>
                <option value="SGD">Singapore Dollar</option>
                <option value="SKK">Slovak Koruna</option>
                <option value="SBD">Solomon Islands Dollar</option>
                <option value="SOS">Somali Shilling</option>
                <option value="ZAR">South African Rand</option>
                <option value="KRW">South Korean Won</option>
                <option value="XDR">Special Drawing Rights</option>
                <option value="LKR">Sri Lankan Rupee</option>
                <option value="SHP">St. Helena Pound</option>
                <option value="SDG">Sudanese Pound</option>
                <option value="SRD">Surinamese Dollar</option>
                <option value="SZL">Swazi Lilangeni</option>
                <option value="SEK">Swedish Krona</option>
                <option value="CHF">Swiss Franc</option>
                <option value="SYP">Syrian Pound</option>
                <option value="STD">São Tomé and Príncipe Dobra</option>
                <option value="TJS">Tajikistani Somoni</option>
                <option value="TZS">Tanzanian Shilling</option>
                <option value="THB">Thai Baht</option>
                <option value="TOP">Tongan pa'anga</option>
                <option value="TTD">Trinidad & Tobago Dollar</option>
                <option value="TND">Tunisian Dinar</option>
                <option value="TRY">Turkish Lira</option>
                <option value="TMT">Turkmenistani Manat</option>
                <option value="UGX">Ugandan Shilling</option>
                <option value="UAH">Ukrainian Hryvnia</option>
                <option value="AED">United Arab Emirates Dirham</option>
                <option value="UYU">Uruguayan Peso</option>
                <option value="USD">US Dollar</option>
                <option value="UZS">Uzbekistan Som</option>
                <option value="VUV">Vanuatu Vatu</option>
                <option value="VEF">Venezuelan BolÃ­var</option>
                <option value="VND">Vietnamese Dong</option>
                <option value="YER">Yemeni Rial</option>
                <option value="ZMK">Zambian Kwacha</option>
              </select>
            </div>

            <div className={classes.addTrip__form__group}>
              <label
                htmlFor="costPerPerson"
                className={classes.addTrip__form__label}
              >
                Cost:
              </label>
              <input
                type="number"
                placeholder="Cost per person"
                className={classes.addTrip__form__input}
                name="costPerPerson"
                id="costPerPerson"
                min="0"
                ref={costPerPersonInputRef}
                required
              />
            </div>

            <div className={classes.addTrip__form__group}>
              <label
                htmlFor="launchDate"
                className={classes.addTrip__form__label}
              >
                Launch Date:
              </label>
              <input
                type="date"
                className={classes.addTrip__form__input}
                name="launchDate"
                id="launchDate"
                ref={launchDateInputRef}
                style= {{fill: 'white'}}
                required
              />
            </div>

            <div className={classes.addTrip__form__group}>
              <label
                htmlFor="returnDate"
                className={classes.addTrip__form__label}
              >
                Return date:
              </label>
              <input
                type="date"
                className={classes.addTrip__form__input}
                name="returnDate"
                id="returnDate"
                ref={returnDateInputRef}
                required
              />
            </div>
          </div>

          <h3 className={classes.addTrip__form__sectionTitle}>
            Your Contact Information
          </h3>
          <div className={classes.addTrip__form__section}>
            <div className={classes.addTrip__form__group}>
              <label
                htmlFor="phoneNumber"
                className={classes.addTrip__form__label}
              >
                Phone Number:
              </label>
              <input
                type="text"
                placeholder="Phone Number"
                className={classes.addTrip__form__input}
                name="phoneNumber"
                id="phoneNumber"
                ref={phoneNumberInputRef}
                required
              />
            </div>

            <div className={classes.addTrip__form__group}>
              <label htmlFor="email" className={classes.addTrip__form__label}>
                Email:
              </label>
              <input
                type="email"
                placeholder="Email"
                className={classes.addTrip__form__input}
                name="email"
                id="email"
                required
                ref={emailInputRef}
              />
            </div>
          </div>
        </div>

        {!isLoading && (
          <button
            type="submit"
            className={`${"btn"} ${"btn__hero"}  ${"btn__hero--login"} ${"btn__hero--submit"} ${
              classes["addTrip--btn"]
            }`}
          >
            Submit
          </button>
        )}
        {isLoading && (
          <p className={classes.addTrip__request}>Sending request...</p>
        )}
        {error && (
          <p className={classes.addTrip__request}>{error}</p>
        )}
        {success && (
          <p className={classes.addTrip__request}>{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default AddTrip;
