import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    if (localStorage.getItem("admin")) {
      localStorage.removeItem("admin");
    }
    navigate("/login");
  };
  return (
    <div>
      <nav className="flex  items-center justify-between mb-3 flex-wrap bg-slate-900 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            Library Management App
          </span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-lg lg:flex-grow">
            <>
              {!token ? (
                <>
                  <Link
                    to="/login"
                    className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <button
                  className="block mt-4 lg:inline-block mr-3 lg:mt-0 text-teal-200 hover:text-white"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              )}
            </>
            <Link
              to="/home"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="block ml-3 mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              About
            </Link>
            {localStorage.getItem("admin") &&
            localStorage.getItem("admin") === "admin" ? (
              <>
                <Link
                  to="/editproduct"
                  className="block mt-4 ml-3 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                >
                  EditBook
                </Link>
                <Link
                  to="/allusers"
                  className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                >
                  Allusers
                </Link>
                <Link
                  to="/addbook"
                  className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
                >
                  AddNewBook
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>

          <div>
            {!localStorage.getItem("admin") ? (
              <Link
                to="/cart"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >
                Cart
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
