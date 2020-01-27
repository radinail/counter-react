import React, { useContext } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  match as Match
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Movies from "../features/components/Movies";
import { Rentals } from "../features/components/Rentals";
import { Customars } from "../features/components/Customars";
import { NavigationBar } from "../features/components/NigationBar";
import { MovieForm } from "../features/components/MovieForm";
import { Login } from "../features/components/login";
import { MovieContainner } from "../features/components/MovieContainer";
import { RegisterForm } from "../features/components/registerForm";
import { UserContext } from "../context/user";
import { Logout } from "../features/components/logout";

export const Rout = () => {
  const userContext = useContext(UserContext);
  console.log("userContext in route = ", userContext.user);
  console.log("passer pa routes");
  return (
    <BrowserRouter>
      <ToastContainer />
      <NavigationBar />
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/register" component={RegisterForm} />
        <Route
          path="/movies/new"
          render={props => (
            <>
              {userContext.user ? (
                <MovieForm {...props} />
              ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: {
                      from: "/movies/new"
                    }
                  }}
                />
              )}
            </>
          )}
        />
        <Route path="/movies/:id" component={MovieContainner} />
        <Route path="/movies" component={Movies} />
        <Route path="/customers" component={Customars} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/not-found" component={() => <div>Not Found</div>} />
        <Redirect exact from="/" to="/movies" />
        <Route
          path="/login"
          render={props => (
            <>
              {!userContext.user ? (
                <Login {...props} />
              ) : (
                <Redirect to="/movies" />
              )}
            </>
          )}
        />
        <Redirect to="/not-found" />
      </Switch>
    </BrowserRouter>
  );
};
