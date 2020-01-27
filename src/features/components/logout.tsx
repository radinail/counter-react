import React, { useContext } from "react";
import { History } from "history";

import { UserContext } from "../../context/user";

export const Logout = ({ history }: { history: History }) => {
  const userContext = useContext(UserContext);
  const handleClick = () => {
    localStorage.removeItem("token");
    userContext.setUser(null);
    history.replace("/login");
  };
  return (
    <>
      <h1>Logout</h1>
      <button className="btn btn-primary" onClick={handleClick}>
        Logout
      </button>
    </>
  );
};
