import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Navbar, Collapse, Typography, Button, IconButton } from "@material-tailwind/react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const StickyNavbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext); // use context
  const navigate = useNavigate();

  // Close mobile nav on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout(); // use context logout
    navigate("/login"); // redirect after logout
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="small" className="p-1 font-normal">
        <Link to="/" className="flex items-center" onClick={() => setOpenNav(false)}>
          Home
        </Link>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal">
        <Link to="/" className="flex items-center">About</Link>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal">
        <Link to="/" className="flex items-center">Contact</Link>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal">
        <Link to="/dashboard" className="flex items-center text-lg font-semibold text-blue-500 hover:text-blue-700">
          Dashboard
        </Link>
      </Typography>
    </ul>
  );

  return (
    <div className="w-full sticky top-0 z-20">
      <Navbar className="h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 text-blue-gray-900 shadow-md bg-white">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography as="a" href="/" className="mr-4 cursor-pointer py-1.5 font-medium">
            <img src="/logo1.png" alt="Pharma Premium" className="mr-3 h-10" />
          </Typography>

          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>

            <div className="flex items-center gap-x-1">
              {!isAuthenticated ? (
                <>
                  <Link to="/login">
                    <Button variant="text" size="sm" className="hidden lg:inline-block border-2 bg-gradient-to-r border-blue-400 hover:from-blue-50 hover:to-blue-200">
                      <span>Log In</span>
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="gradient" size="sm" className="hidden lg:inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-600 hover:to-blue-800 rounded-lg">
                      <span>Sign Up</span>
                      <ArrowForwardIcon />
                    </Button>
                  </Link>
                </>
              ) : (
                <Button onClick={handleLogout} variant="outlined" size="sm" className="hidden lg:inline-block border-2 border-red-500 text-red-600 hover:bg-red-50">
                  Logout
                </Button>
              )}
            </div>

            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </IconButton>
          </div>
        </div>

        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1 mt-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login" onClick={() => setOpenNav(false)}>
                  <Button fullWidth variant="text" size="sm">Log In</Button>
                </Link>
                <Link to="/signup" onClick={() => setOpenNav(false)}>
                  <Button fullWidth variant="gradient" size="sm" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg">
                    Sign Up
                    <ArrowForwardIcon />
                  </Button>
                </Link>
              </>
            ) : (
              <Button onClick={handleLogout} fullWidth variant="outlined" size="sm" className="border-2 border-red-500 text-red-600 hover:bg-red-50">
                Logout
              </Button>
            )}
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default StickyNavbar;
