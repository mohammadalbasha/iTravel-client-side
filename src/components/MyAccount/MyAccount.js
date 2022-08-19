import { useContext, useRef, useState } from "react";
import classes from "./MyAccount.module.scss";
import { Link } from "react-router-dom";

import AuthContext from '../../store/auth-context';

const MyAccount = () => {

  const {profile} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);



  //we must initialize the below refs with account info as shown below
  const usernameInputRef = useRef(profile.username);
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const firstNameInputRef = useRef(profile.firstName);
  const lastNameInputRef = useRef(profile.lastName);
  const emailInputRef = useRef(profile.email);
  const imageInputRef = useRef('');
  const nationalityInputRef = useRef(profile.nationality);
  const phoneNumberInputRef = useRef(profile.phoneNumber);

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

    setIsLoading(true);
    fetch("url goes here", {
      method: "POST",
      body: JSON.stringify({
        firstName: enteredFirstName,
        lastName: enteredLastName,
        username: enteredUsername,
        email: enteredEmail,
        password: enterdPassword,
        confirmPassword: enteredConfirmPassword,
        phoneNumber: enteredPhoneNumber,
        nationality: enteredNationality,
        image: enteredImage,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "erro";
            throw new Error(errorMessage);
          });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={classes.myAccount}>
{
  profile && (
    <>
      <div className={classes.myAccount__header}>
        <img
          src={profile.imageUrl}
          alt="profile picture"
          className={classes["myAccount__header__user-image"]}
        />
        <input
          type="file"
          id="myAccount-upload-picture"
          className={classes["myAccount__header__user-button"]}
          accept=".png,.jpg"
          ref={imageInputRef}
        />
        <label
          htmlFor="myAccount-upload-picture"
          className={classes["myAccount__header__user-button__label"]}
        >
          Upload new picture
          <svg
            className={classes["myAccount__header__user-button__label__icon"]}
          >
            <use xlinkHref="images/sprite.svg#icon-export"></use>
          </svg>
        </label>

        <div className={classes.myAccount__header__userDetails}>
          <div className={classes.myAccount__header__userDetails__group}>
            <span className={classes.myAccount__header__userDetails__info}>
              Full Name:
            </span>
            <span className={classes.myAccount__header__userDetails__fullName}>
              {profile.firstName + " " + profile.lastName }
            </span>
          </div>

          <div className={classes.myAccount__header__userDetails__group}>
            <span className={classes.myAccount__header__userDetails__info}>
              Username:
            </span>
            <span className={classes.myAccount__header__userDetails__username}>
              {profile.username}
            </span>
          </div>

          <div className={classes.myAccount__header__userDetails__group}>
            <span className={classes.myAccount__header__userDetails__info}>
              Phone Number:
            </span>
            <span
              className={classes.myAccount__header__userDetails__phoneNumber}
            >
              {profile.phoneNumber}
            </span>
          </div>
        </div>
      </div>
      <form className={classes.myAccount__form} onSubmit={submitHandler}>
        <div className={classes.myAccount__form__group}>
          <label className={classes.myAccount__form__label}>First Name:</label>
          <input
            type="text"
            id="myAccount-first-name"
            className={classes.myAccount__form__input}
            placeholder="First Name"
            defaultValue={profile.firstName}
            ref={firstNameInputRef}
          />
          <label
            htmlFor="myAccount-first-name"
            className={classes.myAccount__form__edit}
            id="firstNamePencil"
          >
            <svg className={classes["edit-pen-button"]}>
              <use xlinkHref="images/sprite.svg#icon-pencil"></use>
            </svg>
          </label>
        </div>

        <div className={classes.myAccount__form__group}>
          <label className={classes.myAccount__form__label}>Last Name:</label>
          <input
            type="text"
            id="myAccount-last-name"
            className={classes.myAccount__form__input}
            placeholder="Last Name"
            defaultValue={profile.lastName}
            ref={lastNameInputRef}
          />
          <label
            htmlFor="myAccount-last-name"
            className={classes.myAccount__form__edit}
            id="lastNamePencil"
          >
            <svg className={classes["edit-pen-button"]}>
              <use xlinkHref="images/sprite.svg#icon-pencil"></use>
            </svg>
          </label>
        </div>

        <div className={classes.myAccount__form__group}>
          <label className={classes.myAccount__form__label}>Username:</label>
          <input
            type="text"
            id="myAccount-username"
            className={classes.myAccount__form__input}
            placeholder="Username"
            defaultValue={profile.username}
            ref={usernameInputRef}
          />
          <label
            htmlFor="myAccount-username"
            className={classes.myAccount__form__edit}
            id="usernamePencil"
          >
            <svg className={classes["edit-pen-button"]}>
              <use xlinkHref="images/sprite.svg#icon-pencil"></use>
            </svg>
          </label>
        </div>

        <div className={classes.myAccount__form__group}>
          <label className={classes.myAccount__form__label}>Password:</label>
          <input
            type="Password"
            id="myAccount-password"
            className={classes.myAccount__form__input}
            placeholder="Password"
            defaultValue=""
            ref={passwordInputRef}
          />
          <label
            htmlFor="myAccount-password"
            className={classes.myAccount__form__edit}
            id="passwordPencil"
          >
            <svg className={classes["edit-pen-button"]}>
              <use xlinkHref="images/sprite.svg#icon-pencil"></use>
            </svg>
          </label>
        </div>

        <div className={classes.myAccount__form__group}>
          <label className={classes.myAccount__form__label}>Email:</label>
          <input
            type="email"
            id="myAccount-email"
            className={classes.myAccount__form__input}
            placeholder="Email"
            defaultValue={profile.email}
            ref={emailInputRef}
          />
          <label
            htmlFor="myAccount-email"
            className={classes.myAccount__form__edit}
            id="emailPencil"
          >
            <svg className={classes["edit-pen-button"]}>
              <use xlinkHref="images/sprite.svg#icon-pencil"></use>
            </svg>
          </label>
        </div>

        <div className={classes.myAccount__form__group}>
          <label className={classes.myAccount__form__label}>
            Phone Number:
          </label>
          <input
            type="text"
            id="myAccount-phone-number"
            className={classes.myAccount__form__input}
            placeholder="Phone Number"
            defaultValue={profile.phoneNumber}
            ref={phoneNumberInputRef}
          />
          <label
            htmlFor="myAccount-phone-number"
            className={classes.myAccount__form__edit}
            id="phoneNumberPencil"
          >
            <svg className={classes["edit-pen-button"]}>
              <use xlinkHref="images/sprite.svg#icon-pencil"></use>
            </svg>
          </label>
        </div>

        <div className={classes.myAccount__form__group}>
          <label className={classes.myAccount__form__label}>Nationality:</label>
          <select
            className={classes.myAccount__form__input}
            name="nationality"
            id="myAccount-nationality"
            defaultValue={profile.nationality}
            required
            ref={nationalityInputRef}
          >
            <option value="default" disabled>
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
            <option value="liechtenstein-citizen">Liechtenstein citizen</option>
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
            <option value="citizen-of-seychelles">Citizen of Seychelles</option>
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

          <label
            htmlFor="myAccount-nationality"
            className={classes.myAccount__form__edit}
            id="nationalityDatePencil"
          >
            <svg className={classes["edit-pen-button"]}>
              <use xlinkHref="images/sprite.svg#icon-pencil"></use>
            </svg>
          </label>
        </div>

        <div className={classes.myAccount__form__group}>
          {!isLoading && (
            <button
              type="submit"
              className={`${classes["myAccount__btn"]}`}
            >
              Save
            </button>
          )}
          {isLoading && (
            <p className={classes.myAccount__request}>Updating info...</p>
          )}
          <button
            type="reset"
            className={`${classes["myAccount__btn"]} ${classes["myAccount__btn--empty"]}`}
          >
            Restore
          </button>
          <Link
            to="/my-account-history"
            className={`${"btn"} ${"btn__launcher"} ${"btn__launcher--country"} ${"btn__launcher--solid"}`}
          >
            History
          </Link>
        </div>
      </form>
    </>

  )
}
    
    </div>
  );
};

export default MyAccount;

/*

<form classNameN{classes.me={classNamee{classes..form} onSubmit={submitHandler}>
      <div classNameN{classes.me={classNamee{classes..control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" minLength="7" ref={newPasswordInputRef} />
      </div>
      <div classNameN{classes.me={classNamee{classes..action}>
        <button>Change Password</button>
      </div>
    </form>*/
