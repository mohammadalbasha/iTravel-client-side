import classes from "./HomePageContent.module.scss";

const HomePageContent = () => {
  return (
    <div className={classes.homePage}>
      <img
        src="itravel-icon.png"
        alt="Logo White"
        className={classes.homePage__image}
      />
      <div className={classes.homePage__body}>
        <p className={classes.homePage__body__paragraph}>
          iTravel© is the solution designed to meet your requirements in the
          traveling field. and to keep you up-to-date with the latest available
          Trips, Advices, and Tours.
          <br></br>
          iTravel© system is:
        </p>
        <ul className={classes.homePage__body__list}>
          <li className={classes.homePage__body__list__item}>
            A complete solution integrating all useful modules to facilitate
            traveling, to find appropriate stay, and to choose your mate
          </li>
          <li className={classes.homePage__body__list__item}>
            Solid architecture, entirely documented and easy to maintain: it is
            based on the latest technologies and meets the best standards of the
            market
          </li>
          <li className={classes.homePage__body__list__item}>
            Fully scalable, because of it N tiers architecture, allowing each
            module to be independent and thus minimizing the impacts of every
            evolution
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePageContent;
