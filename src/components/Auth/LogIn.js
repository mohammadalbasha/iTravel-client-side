import { useState, useRef, useContext } from "react";
import classes from "./AuthForm.module.scss";
import "../../styles/mixins.scss";
import { useHistory } from "react-router-dom";
//import { useNavigate } from "react-router-dom"; react router 6
import AuthContext from "../../store/auth-context";
import useHttp from '../../hooks/use-http'


const LogIn = () => {
  const [isLogin, setIsLogin] = useState(true);

  const history = useHistory();
//  const navigate = useNavigate(); // react router 6
  const authCtx = useContext(AuthContext);
  const { isLoading, error, success, sendRequest: login } = useHttp();
  
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    history.push("/signUp");
  //  navigate('/signUp'); react router 6 
   
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    const eneterdPassword = passwordInputRef.current.value;


        
    const responseHandler = (response) => {
      authCtx.login(response.token, response.user);
      authCtx.profileHandler(response.user)
      history.replace("/main");
      //navigate('/main'); reactt router 6
    }

   // let url ="https://itravel-yymm.herokuapp.com/auth/signup";
    let url ="https://itravel-yymm.herokuapp.com/auth/login";
      login(
        {url ,
        method : 'POST',
        body: JSON.stringify({
          username: enteredUsername,
          password: eneterdPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        }},
        responseHandler
    );

  };
  return (
    <div className={`${classes.auth} ${classes["auth--login"]}`}>
      <form
        className={`${classes.auth__form} ${classes["auth__form--login"]} `}
        onSubmit={submitHandler}
      >
        <div className={"logoWithHeader"}>
          <img
            src="itravel-icon.png"
            alt="Logo White"
            className={"logoWithHeader__image"}
          />
          <h3>iTravel</h3>
        </div>

        <div className={classes.auth__form__group}>
          <input
            type="text"
            placeholder="username"
            className={classes.auth__form__input}
            name="username"
            required
            ref={usernameInputRef}
          />
          <label className={classes.auth__form__label}>Username</label>
        </div>

        <div className={classes.auth__form__group}>
          <input
            type="password"
            placeholder="password"
            className={classes.auth__form__input}
            name="password"
            required
            ref={passwordInputRef}
          />
          <label className={classes.auth__form__label}>Password</label>
        </div>

        {!isLoading && (<button
          type="submit"
          className={`${"btn"} ${"btn__hero"}  ${"btn__hero--login"} ${"btn__hero--submit"}`}
        >
          Log In
        </button>)}
        {isLoading && (
          <p className={classes.actions__request}>Sending request...</p>
        )}
        {error && (
          <p className={classes.actions__request}>{error}</p>
        )}       
         <button
          type="button"
          className={classes.actions__toggle}
          onClick={switchAuthModeHandler}
        >
          Create new account
        </button>          
      </form>
    </div>
  );
};

export default LogIn;
