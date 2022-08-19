import classes from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={classes.footer}>
        <p className={classes.footer__paragraph}>Copyright © 2022 by iTravel. All rights reserved</p>
    </footer>
  );
};

export default Footer;
