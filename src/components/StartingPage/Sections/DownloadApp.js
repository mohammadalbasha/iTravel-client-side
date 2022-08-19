import classes from "./Sections.module.scss";
import { Link } from "react-router-dom";
import "../../../styles/mixins.scss";

const DownloadApp = () => {
  return (
    <section className={classes.downloadApp} id="download">
      <h3 className={classes.downloadApp__header}>
        Download our friendly mobile application!
      </h3>
      <div className={classes.downloadApp__body}>
        <img
          src="images/mobile.png"
          alt="country's flag"
          className={classes.downloadApp__body__image}
        />
        <div className={classes.downloadApp__body__content}>
          <div className={classes.downloadApp__body__content__group}>
            <h3 className={classes.downloadApp__body__content__group__header}>
              1
            </h3>
            <p className={classes.downloadApp__body__content__group__body}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className={classes.downloadApp__body__content__group}>
            <h3 className={classes.downloadApp__body__content__group__header}>
              2
            </h3>
            <p className={classes.downloadApp__body__content__group__body}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className={classes.downloadApp__body__content__group}>
            <h3 className={classes.downloadApp__body__content__group__header}>
              3
            </h3>
            <p className={classes.downloadApp__body__content__group__body}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <Link
            to="/wiki"
            className={`${"btn"} ${"btn__launcher"} ${"btn__launcher--download"} ${"btn__launcher--solid"}`}
          >
            Download
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
