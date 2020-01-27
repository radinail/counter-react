import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/user";

const getItems = (user?: string) => [
  {
    label: "Movies",
    path: "/movies"
  },
  {
    label: "Customers",
    path: "/customers"
  },
  {
    label: "Rentals",
    path: "/rentals"
  },
  {
    label: !user ? "Login" : user,
    path: !user ? "/login" : "profile"
  },
  {
    label: !user ? " Register" : "Logout",
    path: !user ? "/register" : "logout"
  }
];

export const NavigationBar = () => {
  const userContext = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-brand">Videly</div>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {getItems(userContext.user ? userContext.user.name : undefined).map(
            item => (
              <li key={item.path} className="nav-item">
                <NavLink
                  className="nav-link"
                  to={item.path}
                  activeStyle={{
                    fontWeight: "bold"
                  }}
                >
                  {item.label}
                </NavLink>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};
