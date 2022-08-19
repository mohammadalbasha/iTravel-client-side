import { Link } from "react-router-dom";
import classes from "./TourPlansOptions.module.scss";

const TourPlanOptions = () => {
  return (
    <div className={classes.tourPlansOptions}>
      <Link to="/add-tour-plan" className={classes.tourPlansOptions__addTour}>
        <Link className={classes.tourPlansOptions__addAttraction} to="/add-to-tour-plan">
          add Attraction To Previous Plan 
        </Link>
        <span className={classes.tourPlansOptions__addTour__text}>Add a Tour Plan</span>
        <span className={classes["tourPlansOptions__addTour__text--sub"]}>
          Time flies... until you're counting down the days to your next Tour. Hit
          enter and add a new tour plan!
        </span>
      </Link>

      <Link to="/tour-plans" className={classes.tourPlansOptions__view}>
        <span className={classes.tourPlansOptions__view__text}>
          View Tour Plans
        </span>
        <span className={classes["tourPlansOptions__view__text--sub"]}>
          One’s destination is never a place, but always a new way of seeing things. Hit
          enter and choose your tour plan!
          
        </span>
      </Link>
    </div>
  );
};

export default TourPlanOptions;
