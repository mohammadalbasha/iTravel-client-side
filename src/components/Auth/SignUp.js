import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
//import { useNavigate } from "react-router-dom"; react router 6 
import classes from "./AuthForm.module.scss";
import "../../styles/mixins.scss";

import useHttp from '../../hooks/use-http'
import AuthContext from "../../store/auth-context";


const SignUp = () => {

  const [isLogin, setIsLogin] = useState(true);
  //const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const { isLoading, error, success, sendRequest: createAccount } = useHttp();
  const [successMessage, setSuccessMessage] = useState();
  
  const history = useHistory();
  //const navigate = useNavigate(); react router  6 

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const imageInputRef = useRef();
  const nationalityInputRef = useRef();
  const phoneNumberInputRef = useRef();
  const [image, setImage] = useState();

  const imageHandler = (e) => {
    setImage(e.target.files[0])
}
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    history.push("/login");
  //navigate('/login'); react router 6 
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredUsername = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enterdPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;
    const enteredPhoneNumber = phoneNumberInputRef.current.value;
    const enteredNationality = nationalityInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    
    const values = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      username: enteredUsername,
      email: enteredEmail,
      password: enterdPassword,
      confirmPassword: enteredConfirmPassword,
      phoneNumber: enteredPhoneNumber,
      nationality: enteredNationality,
    }

    const formData = new FormData();
  //  var postData = JSON.stringify(values);
    for (let key in values){
      formData.append(key, values[key]);
    }
    
    formData.append('image', image);
//    formData.append(postData);
    
    const responseHandler = (response) => {
      //authCtx.login(response.token);
      //history.replace("/select-country");
      setSuccessMessage(response);
    }

   // let url ="https://itravel-yymm.herokuapp.com/auth/signup";
    let url ="https://itravel-yymm.herokuapp.com/auth/signup";
      createAccount(
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
    <div className={`${classes.auth} ${classes["auth--signup"]}`} id="sign-up">
      <form className={classes.auth__form} onSubmit={submitHandler}>
        <div className={`${"logoWithHeader"} ${"logoWithHeader--signup"}`}>
          <img
            src="itravel-icon.png"
            alt="Logo White"
            className={`${"logoWithHeader__image"} ${"logoWithHeader__image--signup"}`}
          />
          <h3>iTravel</h3>
        </div>
        <div className={classes["auth__form--signup"]}>
          <div
            className={`${classes.auth__form__group} ${classes["auth__form__group--signup"]}`}
          >
            <label
              htmlFor="firstName"
              className={classes.auth__form__labelSignup}
            >
              First Name:
            </label>
            <input
              type="text"
              placeholder="First Name"
              className={`${classes.auth__form__input} ${classes["auth__form__input--signup"]}`}
              name="firstName"
              id="firstName"
              ref={firstNameInputRef}
            />
          </div>

          <div
            className={`${classes.auth__form__group} ${classes["auth__form__group--signup"]}`}
          >
            <label
              htmlFor="lastName"
              className={classes.auth__form__labelSignup}
            >
              Last Name:
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className={`${classes.auth__form__input} ${classes["auth__form__input--signup"]}`}
              name="lastName"
              id="lastName"
              ref={lastNameInputRef}
            />
          </div>

          <div
            className={`${classes.auth__form__group} ${classes["auth__form__group--signup"]}`}
          >
            <label
              htmlFor="username"
              className={classes.auth__form__labelSignup}
            >
              Username:
            </label>
            <input
              type="text"
              placeholder="username"
              className={`${classes.auth__form__input} ${classes["auth__form__input--signup"]}`}
              name="username"
              id="username"
              required
              ref={usernameInputRef}
            />
          </div>

          <div
            className={`${classes.auth__form__group} ${classes["auth__form__group--signup"]}`}
          >
            <label htmlFor="email" className={classes.auth__form__labelSignup}>
              Email:
            </label>
            <input
              type="email"
              placeholder="Email"
              className={`${classes.auth__form__input} ${classes["auth__form__input--signup"]}`}
              name="email"
              id="email"
              required
              ref={emailInputRef}
            />
          </div>

          <div
            className={`${classes.auth__form__group} ${classes["auth__form__group--signup"]}`}
          >
            <label
              htmlFor="password"
              className={classes.auth__form__labelSignup}
            >
              Password:
            </label>
            <input
              type="password"
              placeholder="password"
              className={`${classes.auth__form__input} ${classes["auth__form__input--signup"]}`}
              name="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>

          <div
            className={`${classes.auth__form__group} ${classes["auth__form__group--signup"]}`}
          >
            <label
              htmlFor="confirmPassword"
              className={classes.auth__form__labelSignup}
            >
              Confirm Password:
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className={`${classes.auth__form__input} ${classes["auth__form__input--signup"]}`}
              name="confirmPassword"
              id="confirmPassword"
              required
              ref={confirmPasswordInputRef}
            />
          </div>

          <div
            className={`${classes.auth__form__group} ${classes["auth__form__group--signup"]}`}
          >
            <label
              htmlFor="phoneNumber"
              className={classes.auth__form__labelSignup}
            >
              Phone Number:
            </label>
            <input
              type="text"
              placeholder="Phone Number"
              className={`${classes.auth__form__input} ${classes["auth__form__input--signup"]}`}
              name="phoneNumber"
              id="phoneNumber"
              ref={phoneNumberInputRef}
            />
          </div>

          <div
            className={`${classes.auth__form__group} ${classes["auth__form__group--signup"]}`}
          >
            <label
              htmlFor="nationality"
              className={classes.auth__form__labelSignup}
            >
              Nationality:
            </label>
            <select
              className={`${classes.auth__form__input} ${classes["auth__form__input--signup"]}`}
              name="nationality"
              id="nationality"
              defaultValue={'default'}
              required
              ref={nationalityInputRef}
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

          <div
            className={`${classes.auth__form__group} ${classes["auth__form__group--signup"]}`}
          >
            <label
              htmlFor="profilePic"
              className={classes.auth__form__labelSignup}
            >
              Profile Picture:
            </label>
            <input
              type="file"
              id="image"
              name="profilePicture"
              ref={imageInputRef}
              onChange={imageHandler}
            />
          </div>
        </div>
        {!isLoading && (
          <button
            type="submit"
            className={`${"btn"} ${"btn__hero"}  ${"btn__hero--login"} ${"btn__hero--submit"}`}
          >
            Sign Up
          </button>
        )}
        {isLoading && (
          <p className={classes.actions__request}>Sending request...</p>
        )}
        {error && (
          <p className={classes.actions__request}>{error}</p>
        )}
        {success && (
          <p className={classes.actions__request}>{successMessage}</p>
        )}
        
        
        <button
          type="button"
          className={classes.actions__toggle}
          onClick={switchAuthModeHandler}
        >
          Login with existing account
        </button>
      </form>
    </div>
  );
};

export default SignUp;
