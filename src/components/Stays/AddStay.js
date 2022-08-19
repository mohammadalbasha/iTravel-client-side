import classes from "./AddStay.module.scss";
import { useState, useRef, useContext } from "react";
//import { useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";
import { Country, State, City }  from 'country-state-city';
 //console.log(State.getStatesOfCountry('AF'))
//     console.log(Country.getAllCountries())
//console.log(City.getCitiesOfCountry('AF'));



const AddStay = () => {
  const authCtx = useContext(AuthContext);
  //const history = useHistory();

  const {isLoading, error, success, sendRequest : addStay} = useHttp(); 
  const [successMessage, setSuccessMessage] = useState();

  const [imagesCounter, setImagesCounter] = useState(0);
  const [featuersCounter, setFeaturesCounter] = useState(0);
 
  
  //General Info
  const roomsInputRef = useRef();
  const directionInputRef = useRef();
  const floorInputRef = useRef();
  const propertyNameInputRef = useRef();
  const areaInputRef = useRef();
  const propertyTypeInputRef = useRef();

  //Location
  // const countryInputRef = useRef();
  // const cityInputRef = useRef();
  
  const addressInputRef = useRef();


  const [country, setCountry] = useState({name:''});
  const [state, setState] = useState({name:''});
  

  console.log(country);

  //Features
  const feature1InputRef = useRef();
  const feature2InputRef = useRef();
  const feature3InputRef = useRef();
  const feature4InputRef = useRef();
  const feature5InputRef = useRef();
  const feature6InputRef = useRef();

  //Description
  const descriptionInputRef = useRef();

 //images
 const [images, setImages] = useState([]);

 const imageHandler = (e) => {
     setImages([...images, e.target.files[0]]);
 }
 
  //Pricing & Lease Contract
  const currencyInputRef = useRef();
  const rentalPriceInputRef = useRef();
  const contractRenewalInputRef = useRef();

  //Contact Info
  const emailInputRef = useRef();
  const phoneNumberInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    
   
    //General Info
    const enteredPropertyName = propertyNameInputRef.current.value;
    const enteredArea = areaInputRef.current.value;
    const enteredRooms = roomsInputRef.current.value;
    const enteredPropertyType = propertyTypeInputRef.current.value;
    const enteredFloor = floorInputRef.current.value;
    const enteredDirection = directionInputRef.current.value;

    //Location
   // const enteredCountry = countryInputRef.current.value;
    const enteredCountry = country.name;
    
    //const enteredCity = cityInputRef.current.value;
    const enteredCity = state.name;
    const enteredAddress = addressInputRef.current.value;

    //Features
    const enteredFeature1 = feature1InputRef.current.value;
    const enteredFeature2 = feature2InputRef.current.value;
    const enteredFeature3 = feature3InputRef.current.value;
    const enteredFeature4 = feature4InputRef.current.value;
    const enteredFeature5 = feature5InputRef.current.value;
    const enteredFeature6 = feature6InputRef.current.value;

    //Description
    const enteredDescription = descriptionInputRef.current.value;

    //Pricing & Lease Contract
    const enteredCurrency = currencyInputRef.current.value;
    const enteredRentalPrice = rentalPriceInputRef.current.value;
    const enteredContractRenewal = contractRenewalInputRef.current.value;

    //Contact Information
    const enteredPhoneNumber = phoneNumberInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;

    // Optional : add validation
    
    const values = {
      propertyName: enteredPropertyName,
      area: enteredArea,
      rooms: enteredRooms,
      propertyType: enteredPropertyType,
      floor: enteredFloor,
      facingDirection: enteredDirection,
      country: enteredCountry,
      city: enteredCity,
      address: enteredAddress,
      feature1: enteredFeature1,
      feature2: enteredFeature2,
      feature3: enteredFeature3,
      feature4: enteredFeature4,
      feature5: enteredFeature5,
      feature6: enteredFeature6,
      description: enteredDescription,
      currency: enteredCurrency,
      rentalPrice: enteredRentalPrice,
      contactRenewal: enteredContractRenewal,
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

   // let url ="https://itravel-yymm.herokuapp.com/auth/signup";
    let url =`https://itravel-yymm.herokuapp.com/stays/addStay`;
      addStay(
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
    <div className={classes.addStay}>
      <form className={classes.addStay__form} onSubmit={submitHandler}>
        <h3 className={classes.addStay__header}>Property Rental Form</h3>
        <div className={classes.addStay__form__body}>
          <h3 className={classes.addStay__form__sectionTitle}>
            Property General Information
          </h3>
          <div className={classes.addStay__form__section}>
            <div className={classes.addStay__form__group}>
              <label
                htmlFor="propertyName"
                className={classes.addStay__form__label}
              >
                Property Name:
              </label>
              <input
                type="text"
                placeholder="Property Name"
                className={classes.addStay__form__input}
                name="propertyName"
                id="propertyName"
                required
                ref={propertyNameInputRef}
              />
            </div>

            <div className={classes.addStay__form__group}>
              <label htmlFor="area" className={classes.addStay__form__label}>
                Area:
              </label>
              <input
                type="number"
                placeholder="Area in meter squared"
                className={classes.addStay__form__input}
                name="area"
                id="area"
                min="35"
                required
                ref={areaInputRef}
              />
            </div>

            <div className={classes.addStay__form__group}>
              <label htmlFor="rooms" className={classes.addStay__form__label}>
                No. Rooms:
              </label>
              <input
                type="number"
                placeholder="Number of Rooms"
                className={classes.addStay__form__input}
                name="rooms"
                id="rooms"
                min="1"
                required
                ref={roomsInputRef}
              />
            </div>

            <div className={classes.addStay__form__group}>
              <label
                htmlFor="propertyType"
                className={classes.addStay__form__label}
              >
                Property Type:
              </label>
              <select
                className={classes.addStay__form__input}
                name="propertyType"
                id="propertyType"
                defaultValue={'default'}
                required
                ref={propertyTypeInputRef}
              >
                <option value='default' disabled>
                  Please select
                </option>
                <option value="Apartment">Apartment</option>
                <option value="DuplexApartment">Duplex Apartment</option>
                <option value="House">House</option>
                <option value="sweet">sweet</option>
                <option value="Studio">Studio</option>
                <option value="Villa">Villa</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={classes.addStay__form__group}>
              <label htmlFor="floor" className={classes.addStay__form__label}>
                Floor:
              </label>
              <input
                type="number"
                placeholder="Floor"
                className={classes.addStay__form__input}
                name="floor"
                id="floor"
                min="-2"
                required
                ref={floorInputRef}
              />
            </div>

            <div className={classes.addStay__form__group}>
              <label
                htmlFor="facingDirection"
                className={classes.addStay__form__label}
              >
                Facing Direction:
              </label>
              <select
                className={classes.addStay__form__input}
                name="facingDirection"
                id="facingDirection"
                defaultValue={'default'}
                required
                ref={directionInputRef}
              >
                <option value='default' disabled>
                  Please select
                </option>
                <option value="North">North</option>
                <option value="East">East</option>
                <option value="South">South</option>
                <option value="West">West</option>
                <option value="Northeast">Northeast</option>
                <option value="Northwest">Northwest</option>
                <option value="Southeast">Southeast</option>
                <option value="Southwest">Southwest</option>
              </select>
            </div>
          </div>

          <h3 className={classes.addStay__form__sectionTitle}>
            Property Location
          </h3>
          <div className={classes.addStay__form__section}>
            <div className={classes.addStay__form__group}>
              <label htmlFor="country" className={classes.addStay__form__label}>
                Country:
              </label>
              <select
                id="country"
                name="country"
                className={classes.addStay__form__input}
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

            <div className={classes.addStay__form__group}>
              <label htmlFor="state" className={classes.addStay__form__label}>
                State:
              </label>
              <select
                id="state"
                name="state"
                className={classes.addStay__form__input}
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

            <div className={classes.addStay__form__group}>
              <label htmlFor="address" className={classes.addStay__form__label}>
                Full Address:
              </label>
              <input
                type="text"
                placeholder="Full Address"
                className={classes.addStay__form__input}
                name="address"
                id="address"
                ref={addressInputRef}
                required
              />
            </div>
          </div>

          <h3 className={classes.addStay__form__sectionTitle}>
            Property Features
          </h3>
          <div className={classes.addStay__form__section}>
            <div className={classes.addStay__form__group}>
              <label
                htmlFor="feature1"
                className={classes.addStay__form__label}
              >
                Feature 1:
              </label>
              <input
                type="text"
                placeholder="Feature 1"
                className={classes.addStay__form__input}
                name="feature1"
                id="feature1"
                ref={feature1InputRef}
              />
            </div>

            <div className={classes.addStay__form__group}>
              <label
                htmlFor="feature2"
                className={classes.addStay__form__label}
              >
                Feature 2:
              </label>
              <input
                type="text"
                placeholder="Feature 2"
                className={classes.addStay__form__input}
                name="feature2"
                id="feature2"
                ref={feature2InputRef}
              />
            </div>

            <div className={classes.addStay__form__group}>
              <label
                htmlFor="feature3"
                className={classes.addStay__form__label}
              >
                Feature 3:
              </label>
              <input
                type="text"
                placeholder="Feature 3"
                className={classes.addStay__form__input}
                name="feature3"
                id="feature3"
                ref={feature3InputRef}
              />
            </div>

            <div className={classes.addStay__form__group}>
              <label
                htmlFor="feature4"
                className={classes.addStay__form__label}
              >
                Feature 4:
              </label>
              <input
                type="text"
                placeholder="Feature 4"
                className={classes.addStay__form__input}
                name="feature4"
                id="feature4"
                ref={feature4InputRef}
              />
            </div>

            <div className={classes.addStay__form__group}>
              <label
                htmlFor="feature5"
                className={classes.addStay__form__label}
              >
                Feature 5:
              </label>
              <input
                type="text"
                placeholder="Feature 5"
                className={classes.addStay__form__input}
                name="feature5"
                id="feature5"
                ref={feature5InputRef}
              />
            </div>

            <div className={classes.addStay__form__group}>
              <label
                htmlFor="feature6"
                className={classes.addStay__form__label}
              >
                Feature 6:
              </label>
              <input
                type="text"
                placeholder="Feature 6"
                className={classes.addStay__form__input}
                name="feature6"
                id="feature6"
                ref={feature6InputRef}
              />
            </div>
          </div>

          <h3 className={classes.addStay__form__sectionTitle}>
            Property Description
          </h3>
          <div className={classes.addStay__form__section}>
            <div className={classes.addStay__form__group}>
              <label
                htmlFor="description"
                className={classes.addStay__form__label}
              >
                Description:
              </label>
              <textarea
                type="text"
                id="description"
                placeholder="Full Description"
                className={`${classes.addStay__form__input} ${classes["addStay__form__input--description"]}`}
                ref={descriptionInputRef}
              ></textarea>
            </div>
          </div>
          <h3 className={classes.addStay__form__sectionTitle}>
            Property Images 
          </h3>
          <div className={classes.addStay__form__section}>
            {
              [...Array(Math.min(imagesCounter, 6))].map((e, i) => {
                return (
                  <div
                  className={`${classes.addStay__form__group}`}
                >
                  <label
                    htmlFor="image"
                    className={classes.addStay__form__label}
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
              <div className={classes.addStay__form__group}>
              <label
                htmlFor="imagesCounter"
                className={classes.addStay__form__label}
              >
                add photo:
              </label>
              <button
                type="button"
                className={classes['addStay--add-btn']}
                id="imagesCounter"
                onClick={() => {setImagesCounter(prev => prev+1)}}
              >
                +
              </button>
            </div>
            }
            
                  
                      
          </div>


          
          <h3 className={classes.addStay__form__sectionTitle}>
            Pricing & Lease Contract
          </h3>
          <div className={classes.addStay__form__section}>
            <div className={classes.addStay__form__group}>
              <label
                htmlFor="currency"
                className={classes.addStay__form__label}
              >
                Currency:
              </label>
              <select
                id="currency"
                name="currency"
                className={classes.addStay__form__input}
                defaultValue={'default'}
                required
                ref={currencyInputRef}
              >
                <option value='default' disabled>
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

            <div className={classes.addStay__form__group}>
              <label
                htmlFor="rentalPrice"
                className={classes.addStay__form__label}
              >
                Rental Price:
              </label>
              <input
                type="number"
                placeholder="Rental Price per month"
                className={classes.addStay__form__input}
                name="rentalPrice"
                id="rentalPrice"
                min="0"
                ref={rentalPriceInputRef}
                required
              />
            </div>

            <div className={classes.addStay__form__group}>
              <label
                htmlFor="contractRenewal"
                className={classes.addStay__form__label}
              >
                Contract Renewal:
              </label>
              <select
                className={classes.addStay__form__input}
                name="contractRenewal"
                id="contractRenewal"
                defaultValue={'default'}
                required
                ref={contractRenewalInputRef}
              >
                <option value='default' disabled>
                  Please select
                </option>
                <option value="1month">1 month</option>
                <option value="3months">3 months</option>
                <option value="6months">6 months</option>
                <option value="Annual">Annual</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <h3 className={classes.addStay__form__sectionTitle}>
            Your Contact Information
          </h3>
          <div className={classes.addStay__form__section}>
            <div className={classes.addStay__form__group}>
              <label
                htmlFor="phoneNumber"
                className={classes.addStay__form__label}
              >
                Phone Number:
              </label>
              <input
                type="text"
                placeholder="Phone Number"
                className={classes.addStay__form__input}
                name="phoneNumber"
                id="phoneNumber"
                ref={phoneNumberInputRef}
                required
              />
            </div>

            <div className={classes.addStay__form__group}>
              <label htmlFor="email" className={classes.addStay__form__label}>
                Email:
              </label>
              <input
                type="email"
                placeholder="Email"
                className={classes.addStay__form__input}
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
              classes["addStay--btn"]
            }`}
          >
            Submit
          </button>
        )}
        {isLoading && (
          <p className={classes.addStay__request}>Sending request...</p>
        )}
      
        {error && (
          <p className={classes.addStay__request}>{error}</p>
        )}
        {success && (
          <p className={classes.addStay__request}>{successMessage}</p>
        )}
      
      </form>
    </div>
  );
};

export default AddStay;
