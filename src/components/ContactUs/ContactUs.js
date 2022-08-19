import classes from "./ContactUs.module.scss";
import "../../styles/mixins.scss";
import { useState, useRef, useContext } from "react";

const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const fullNameInputRef = useRef();
  const emailInputRef = useRef();
  const messageInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredFullName = fullNameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredMessage = messageInputRef.current.value;

    // Optional : add validation
    setIsLoading(true);
    let url = "url goes here";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        fullName: enteredFullName,
        email: enteredEmail,
        message: enteredMessage,
        returnSecureToken: true,
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
            let errorMessage = "Authentication Failed";
            throw new Error(errorMessage);
          });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={classes.contactUs}>
      <div className={classes.contactUs__details}>
        <div className={classes.contactUs__details__group}>
          <svg className={classes.contactUs__details__icon}>
            <use xlinkHref="images/sprite.svg#icon-location2"></use>
          </svg>
          <div className={classes["contactUs__details__group-text"]}>
            <span className={classes.contactUs__details__header}>Address:</span>
            <p className={classes.contactUs__details__text}>
              Al-Malki street,
              <br /> beside Alhkmeh hospital
            </p>
          </div>
        </div>

        <div className={classes.contactUs__details__group}>
          <svg className={classes.contactUs__details__icon}>
            <use xlinkHref="images/sprite.svg#icon-phone"></use>
          </svg>
          <div className={classes["contactUs__details__group-text"]}>
            <span className={classes.contactUs__details__header}>
              Phone Number:
            </span>
            <p className={classes.contactUs__details__text}>+963-95555559</p>
          </div>
        </div>

        <div className={classes.contactUs__details__group}>
          <svg className={classes.contactUs__details__icon}>
            <use xlinkHref="images/sprite.svg#icon-mail"></use>
          </svg>
          <div className={classes["contactUs__details__group-text"]}>
            <span className={classes.contactUs__details__header}>Email:</span>
            <p className={classes.contactUs__details__text}>
              itravelgroup2022@gmail.com
            </p>
          </div>
        </div>
      </div>

      <form className={classes.contactUs__form} onSubmit={submitHandler}>
        <div className={classes.contactUs__form__header}>
          <h3>Contact Us</h3>
        </div>

        <div className={classes.contactUs__form__group}>
          <label
            htmlFor="contactUs__form__full-name"
            className={classes.contactUs__form__label}
          >
            Full Name:
          </label>
          <input
            type="text"
            id="contactUs__form__full-name"
            placeholder="Full Name"
            className={classes.contactUs__form__input}
            ref={fullNameInputRef}
            required
          />
        </div>

        <div className={classes.contactUs__form__group}>
          <label
            htmlFor="contactUs__form__email"
            className={classes.contactUs__form__label}
          >
            Email:
          </label>
          <input
            type="email"
            id="contactUs__form__email"
            placeholder="Email"
            className={classes.contactUs__form__input}
            ref={emailInputRef}
            required
          />
        </div>

        <div className={classes.contactUs__form__group}>
          <label
            htmlFor="contactUs__form__message"
            className={classes.contactUs__form__label}
          >
            Message:
          </label>
          <textarea
            type="text"
            id="contactUs__form__message"
            placeholder="Message"
            className={`${classes.contactUs__form__input} ${classes["contactUs__form__input--message"]}`}
            ref={messageInputRef}
            required
          ></textarea>
        </div>

        {!isLoading && (
          <button
            type="submit"
            className={`${"btn"} ${"btn__hero"}  ${"btn__hero--login"} ${"btn__hero--submit"} ${
              classes.contactUs__form__btn
            }`}
          >
            Send
          </button>
        )}
        {isLoading && (
          <p className={classes.contactUs__form__request}>Sending request...</p>
        )}
      </form>
    </div>
  );
};

export default ContactUs;
