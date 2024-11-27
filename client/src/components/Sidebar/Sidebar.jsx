"use client";

import React, { useState, useEffect } from "react";
import { CgHomeAlt } from "react-icons/cg";
import { RiUserSettingsFill } from "react-icons/ri";
import { BsFillPeopleFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assests/logo.jpeg";

function Sidebar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <div className="w-[4rem] lg:w-[25rem] p-1 h-screen lg:p-8 bg-primary-background border-neutral-700 border-2 rounded-xl overflow-y-auto sticky top-0">
      <div className="text-4xl font-semibold text-white mt-4 lg:mt-0">
        <img src={logo} alt="" className="lg:w-20 lg:h-20 w-12 h-12 rounded-full" />
      </div>

      <div className="mt-7 lg:mt-14">
        <div className="cursor-pointer">
          <p className="text-[#444752] text-sm hidden lg:block" >Overview</p>
        </div>
        <div className="mt-5 cursor-pointer">
          <Link to="/">
            <div
              id="dashboard"
              className={`flex items-center gap-2 text-primary-color ${activeLink === '/' ? 'bg-secondry-background text-white scale-105' : 'hover:bg-secondry-background hover:text-white hover:scale-105'} duration-300 text-lg p-3 rounded-xl`}
            >
              <CgHomeAlt className="lg:mr-2 text-xl mb-1" />
              <label htmlFor="dashboard" className="hidden lg:block">Dashboard</label>
            </div>
          </Link>
          <Link to="/userManagment">
            <div
              id="userManagment"
              className={`flex items-center gap-2 text-primary-color 
                ${activeLink === '/userManagment' ? 'bg-secondry-background text-white scale-105' : 'hover:bg-secondry-background hover:text-white hover:scale-105'} 
                duration-300 text-lg p-3 rounded-xl`}
            >
              <BsFillPeopleFill className="lg:mr-2 text-xl mb-1" />
              <label htmlFor="userManagment" className="hidden lg:block" >User Managment</label>
            </div>
          </Link>
          <Link to="/roleManagment">
            <div
              id="roleManagment"
              className={`flex items-center gap-2 text-primary-color 
              ${activeLink === '/roleManagment' ? 'bg-secondry-background text-white scale-105' : 'hover:bg-secondry-background hover:text-white hover:scale-105'} 
              duration-300 text-lg p-3 rounded-xl`}
            >
              <RiUserSettingsFill className="lg:mr-2 text-xl" />
              <label htmlFor="roleManagment" className="hidden lg:block">Role Managment</label>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
