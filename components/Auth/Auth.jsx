"use client";

import React, { useState } from "react";
import classes from "./Auth.module.css";
import Button from "../UI/Button/Button";
import { observer } from "mobx-react-lite";
import Input from "../UI/Input/Input";
import UserStore from "@/store/userStore";

const Auth = observer(({ sideMenuSwitcher }) => {
  const [input, setInput] = useState({ username: "", password: "" });
  const [switcher, setSwitcher] = useState("auth");

  const log = async (e) => {
    try {
      e.preventDefault();
      switcher === "auth"
        ? await login(input.username, input.password)
        : await registration(input.username, input.password);
      UserStore.setUser(user);
      UserStore.setIsAuth(true);
      sideMenuSwitcher(false);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <div className={classes.login}>
      {switcher === "auth" && (
        <>
          <h2 className={classes.h2}>Login to your account</h2>
        </>
      )}
      {switcher === "register" && (
        <>
          <h2 className={classes.h2}>Create a Buy This! Account</h2>
        </>
      )}

      <form onSubmit={log} className={classes.form} id={"login"}>
        {switcher === "auth" ? (
          <>
            <Input
              type={"email"}
              name={"username"}
              label={"E-mail"}
              placeholder={"my-email@mail.com"}
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            ></Input>
            <Input
              name={"password"}
              label={"Password"}
              placeholder={"password"}
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              type={"password"}
            ></Input>{" "}
            <div className={classes.buttonWrapper}>
              <div
                className={classes.registerLink}
                onClick={() => setSwitcher("register")}
              >
                Crete account
              </div>
              <Button>{"Log In"}</Button>
            </div>
          </>
        ) : (
          <>
            {" "}
            <Input
              type={"email"}
              name={"login"}
              label={"E-mail"}
              placeholder={"my-email@mail.com"}
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            ></Input>
            <Input
              type={"UserName"}
              name={"username"}
              label={"Username"}
              placeholder={"My Username"}
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            ></Input>
            <Input
              name={"password"}
              label={"Password"}
              placeholder={"password"}
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              type={"password"}
            ></Input>
            <Input
              name={"repeatPassword"}
              label={"Repeat password"}
              placeholder={"Repeat password"}
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              type={"repeatPassword"}
            ></Input>
            <div className={classes.buttonWrapper}>
              <div
                className={classes.registerLink}
                onClick={() => setSwitcher("auth")}
              >
                Already have an account?
              </div>
              <Button>{"Register"}</Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
});

export default Auth;
