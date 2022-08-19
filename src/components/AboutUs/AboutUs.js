import classes from "./AboutUs.module.scss";

const AboutUs = () => {
  return (
    <div className={classes.aboutUs} id='aboutus'>
      <div className={classes.aboutUs__head}>
        <div className={classes.aboutUs__head__title}>
          <div className={classes.aboutUs__head__title__stick}>&nbsp;</div>
          <span className={classes.aboutUs__head__title__header}>About Us</span>
        </div>
        <p className={classes.aboutUs__head__paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>

      <div className={classes.aboutUs__body}>
        <h3 className={classes.aboutUs__body__header}>What we offer:</h3>
        <ul className={classes.aboutUs__body__list}>
          <li className={classes.aboutUs__body__list__item}>
            <svg className={classes.aboutUs__body__list__item__icon}>
              <use xlinkHref="images/sprite.svg#icon-office"></use>
            </svg>
            <div className={classes.aboutUs__body__list__item__content}>
              <h3 className={classes.aboutUs__body__list__item__content__header}>accommodations</h3>
            <p className={classes.aboutUs__body__list__item__content__paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
            </div>
          </li>

          <li className={classes.aboutUs__body__list__item}>
            <svg className={classes.aboutUs__body__list__item__icon}>
              <use xlinkHref="images/sprite.svg#icon-tree"></use>
            </svg>
            <div className={classes.aboutUs__body__list__item__content}>
              <h3 className={classes.aboutUs__body__list__item__content__header}>Attractions Guide</h3>
            <p className={classes.aboutUs__body__list__item__content__paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
            </div>
          </li>

          <li className={classes.aboutUs__body__list__item}>
            <svg className={classes.aboutUs__body__list__item__icon}>
              <use xlinkHref="images/sprite.svg#icon-earth"></use>
            </svg>
            <div className={classes.aboutUs__body__list__item__content}>
              <h3 className={classes.aboutUs__body__list__item__content__header}>Info About Countries</h3>
            <p className={classes.aboutUs__body__list__item__content__paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
            </div>
            
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;
