import { Link } from "react-router-dom";
import classes from "./TripsOptions.module.scss";

const TripsOptions = () => {
  return (
    <div className={classes.tripsOptions}>
      <Link to="/add-trip" className={classes.tripsOptions__addTrip}>
        <span className={classes.tripsOptions__addTrip__text}>Add a Trip</span>
        <span className={classes["tripsOptions__addTrip__text--sub"]}>
          Time flies... until you're counting down the days to your next vacay. Hit
          enter and add a new trip!
        </span>
      </Link>

      <Link to="/trips" className={classes.tripsOptions__traveller}>
        <span className={classes.tripsOptions__traveller__text}>
          View Trips
        </span>
        <span className={classes["tripsOptions__traveller__text--sub"]}>
          One’s destination is never a place, but always a new way of seeing things. Hit
          enter and choose your trip!
          
        </span>
      </Link>
    </div>
  );
};

export default TripsOptions;
