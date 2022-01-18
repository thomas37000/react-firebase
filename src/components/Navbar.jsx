import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-light bg-light px4">
        <Link to="/">Firebase App</Link>
        <div>
          <button type="button" className="btn btn-primary">Sign Up</button>
          <button type="button"className="btn btn-primary ms-2">Sign In</button>
          <button type="button" className="btn btn-danger ms-2">Log Out</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
