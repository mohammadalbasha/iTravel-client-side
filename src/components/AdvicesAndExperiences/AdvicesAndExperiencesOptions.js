import { Link } from "react-router-dom";
import classes from "./AdvicesAndExperiencesOptions.module.scss";

const AdvicesAndExperiencesOptions = () => {
  return (
    <div className={classes.advicesAndExperiencesOptions}>
      <Link to="/add-advice-and-experience" className={classes.advicesAndExperiencesOptions__addExperience}>
        <span className={classes.advicesAndExperiencesOptions__addExperience__text}>Add an Experience</span>
        <span className={classes["advicesAndExperiencesOptions__addExperience__text--sub"]}>
          Have an Advice or an Experience!! What are you waiting for?. Hit
          enter and add your tips
        </span>
      </Link>

      <Link to="/advices-and-experiences" className={classes.advicesAndExperiencesOptions__view}>
        <span className={classes.advicesAndExperiencesOptions__view__text}>
          View Experiences
        </span>
        <span className={classes["advicesAndExperiencesOptions__view__text--sub"]}>
          Looking for a tour advice or a trip experience. Hit
          enter and Navigate people's advices and experiences!
          
        </span>
      </Link>
    </div>
  );
};

export default AdvicesAndExperiencesOptions;
