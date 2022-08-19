import classes from "./Sections.module.scss";
import { Link } from "react-router-dom";
import "../../../styles/mixins.scss";

const HowItWorks = () => {
  return (
    <section className={classes.howItWorks} id="works">
      <h3 className={classes.howItWorks__header}>
        How it works — Simple as 1, 2, 3
      </h3>
      <div className={classes.howItWorks__content}>
        <div className={classes.howItWorks__content__group}>
          <h3 className={classes.howItWorks__content__group__header}>1</h3>
          <p className={classes.howItWorks__content__group__body}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className={classes.howItWorks__content__group}>
          <h3 className={classes.howItWorks__content__group__header}>2</h3>
          <p className={classes.howItWorks__content__group__body}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className={classes.howItWorks__content__group}>
          <h3 className={classes.howItWorks__content__group__header}>3</h3>
          <p className={classes.howItWorks__content__group__body}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
