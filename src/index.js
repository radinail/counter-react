import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Rout } from "./router/route";
import { User } from "./context/user";
import * as serviceWorker from "./serviceWorker";
import { logger } from "./services/logger";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "react-toastify/dist/ReactToastify.min.css";

logger.init();

ReactDOM.render(
  <User>
    <Rout />
  </User>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
