import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaTelegramPlane,
} from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const redirectAPTechEnterprise = () => {
    window.location.href = `https://aptechenterprise.in/`;
  };

  const handleFb = () => {
    const url = ``;
    window.open(url, "_blank");
  };

  const handleInsta = () => {
    const url = ``;
    window.open(url, "_blank");
  };
  const navigate = useNavigate();
  return (
    <footer className=" bg-footerbg py-12 text-white relative">
      <div className="flex flex-col items-center w-full max-w-screen-xl mx-auto px-5">
        <ul className="list-none flex items-center justify-center gap-4 mb-5">
          <li
            className="cursor-pointer text-xs transition-all duration-300 ease hover:text-pinky "
            onClick={() => navigate("/termofuse")}
          >
            Terms Of Use
          </li>
          <li
            className="cursor-pointer text-xs transition-all duration-300 ease hover:text-pinky"
            onClick={() => navigate("/privacypolicy")}
          >
            Privacy-Policy
          </li>
          <li
            className="cursor-pointer text-xs transition-all duration-300 ease hover:text-pinky"
            onClick={() => navigate("/about")}
          >
            About
          </li>
          <li className="cursor-pointer text-xs transition-all duration-300 ease hover:text-pinky">
            Blog
          </li>
          <li className="cursor-pointer text-xs transition-all duration-300 ease hover:text-pinky">
            FAQ
          </li>
        </ul>
        {/* <div className="text-xs opacity-50 text-white text-center max-w-3xl mb-5">
          <p className="">© 2024, AP TECH CENTER. All rights reserved.</p>
        </div> */}
        <div className="my-4">© 2024, AP TECH CENTER. All rights reserved.</div>
        {/* <p className=" mb-5">
          <span className=" text-sm font-medium">Created by : </span>{" "}
          <Link
            className="text-sm text-blue-300"
            onClick={redirectAPTechEnterprise}
          >
            AP Tech Enterprise
          </Link>
        </p> */}
        <div className=" my-4 w-full flex justify-around ">
          <div>
            <p className=" text-base hover:text-pinky ">
              <CiLocationOn className=" inline text-white" />{" "}
              <span>Address : </span>
              Makkhumath,
              <br /> Rudraprayag, Ukhimath - <br />
              246419
            </p>
            <ul>
              <li className=" py-2">
                <Link to="/" className="text-base hover:text-pinky ">
                  Home
                </Link>
              </li>
              <li className="py-2">
                <Link to="/about" className="text-base hover:text-pinky ">
                  About
                </Link>
              </li>
              <li className="py-2">
                <Link to="contact" className="text-base hover:text-pinky">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="text-base ">
              <li className="py-2 hover:text-pinky">
                <Link to="/">Room 1</Link>
              </li>
              <li className="py-2 hover:text-pinky">
                <Link to="/room2">Room 2</Link>
              </li>
              <li className="py-2 hover:text-pinky">
                <Link to="room3">Room 3</Link>
              </li>
              <li className="py-2 hover:text-pinky">
                <Link to="room4">Room 4</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="w-12 h-12 rounded-full bg-socialiconbg flex items-center justify-center cursor-pointer transition-all duration-300 ease hover:text-pinky hover:shadow-custom ">
            <FaFacebookF onClick={handleFb} />
          </span>
          <span className="w-12 h-12 rounded-full bg-socialiconbg flex items-center justify-center cursor-pointer transition-all duration-300 ease hover:text-pinky hover:shadow-custom">
            <FaInstagram onClick={handleInsta} />
          </span>
          <span className="w-12 h-12 rounded-full bg-socialiconbg flex items-center justify-center cursor-pointer transition-all duration-300 ease hover:text-pinky hover:shadow-custom">
            <FaTwitter />
          </span>
          <span className="w-12 h-12 bg-socialiconbg flex rounded-full items-center justify-center cursor-pointer transition-all duration-300 ease hover:text-pinky hover:shadow-custom ">
            <FaTelegramPlane />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
