import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/theme/themeSlice";
import { logoutSuccess } from "../../redux/user/userSlice";

const Header = () => {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  // console.log(searchTerm);

  const handleLogOut = async () => {
    try {
      const res = await fetch(`/api/user/logout`, {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(logoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold "
      >
        <span className="px-2 py-1">AP Coding Solutions</span>
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button
        onClick={() => navigate("/search")}
        className="w-12 h-10 lg:hidden"
        color="gray"
        pill
      >
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10  rounded-full"
          color="gray"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="user"
                img={currentUser.profilePicture || currentUser.photoURL}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            {/* <Dropdown.Divider /> */}
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/login">
            <Button gradientDuoTone="purpleToBlue">Sign In</Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as="div" active={path === "/"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link as="div" active={path === "/about"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link as="div" active={path === "/project"}>
          <Link to="/project">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
