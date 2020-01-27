import React from "react";

const NavBar = ({ numberOfCounters }: { numberOfCounters: number }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <span className="navbar-brand">
        Navbar
        <span className="badge badge-pill badge-secondary">
          {numberOfCounters}
        </span>
      </span>
    </nav>
  );
};

export default NavBar;
