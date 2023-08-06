import React from "react";
import classes from "./TopBar.module.css";
import { AiOutlineCheck } from "react-icons/ai";
import ReactCountryFlag from "react-country-flag";

const TopBar = () => {
  return (
    <div className={classes.topBarWrapper}>
      <div className={classes.topBar}>
        <div className={classes.checkDiv}>
          <div className={classes.check}>
            <AiOutlineCheck className={classes.ico} />
            <p className={classes.text}>More than 700 brands</p>
          </div>
          <div className={classes.check}>
            <AiOutlineCheck className={classes.ico} />
            <p className={classes.text}>Super fast delivery</p>
          </div>
          <div className={classes.check}>
            <AiOutlineCheck className={classes.ico} />
            <p className={classes.text}>5000 active customers</p>
          </div>
        </div>
        <div className={classes.langSelect}>
          <ReactCountryFlag countryCode="GB" svg title="US" />
          <p className={classes.langText}>EN</p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
