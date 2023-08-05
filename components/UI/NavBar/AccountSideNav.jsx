import React from "react";
import classes from "./AccountSideNav.module.css";
import { RxCross1 } from "react-icons/rx";
import { observer } from "mobx-react-lite";
import Auth from "../../Auth/Auth";

const LeftSideNav = observer(({ setSwitcher }) => {
  return (
    <div className={classes.sideNavBack}>
      <div className={classes.exit} onClick={() => setSwitcher(false)}>
        <div
          className={classes.sideNav}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className={classes.top}>
            <div
              className={classes.topTextWrapper}
              onClick={() => setSwitcher(false)}
            >
              <RxCross1 />
              <p className={classes.topText}>Account</p>
            </div>
          </div>
          <div className={classes.contentWrapper}>
            <Auth sideMenuSwitcher={setSwitcher} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default LeftSideNav;
