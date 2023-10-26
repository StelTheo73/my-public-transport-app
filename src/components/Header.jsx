import { NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useEffect } from "react";

import "../static/css/Header.css";
import Logo from "../assets/images/logo.png";

export const Header = ({showSidebar, setShowSidebar}) => {
  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth);
      if (window.innerWidth <= 576) {
        document.querySelectorAll(".hide-small").forEach((element) => {
          element.classList.add("hide");
        })
      }
      else {
        document.querySelectorAll(".hide-small").forEach((element) => {
          element.classList.remove("hide");
        })
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSidebarToggle = () => {
      setShowSidebar(!showSidebar);
  }

  return (
    <>
    <div className="header-back">
    </div>
    <header>
      <div className="row mx-1" >
        <div className="d-flex justify-content-start col-6">
          <div className="ms-1 py-2 d-flex">
            <button
                className="btn btn-outline-secondary sidebar-toggle-btn p-2"
                onClick={handleSidebarToggle}
                >
              <i className="bi bi-list"></i>
            </button>
          </div>

          <div className="ms-3 py-2 d-flex justify-content-center">
            <NavLink
                className="header-container-item header-nav-link header-nav-link-logo"
                to="/"
                onClick={() => setShowSidebar(false)}
              >
              <img
                  src={Logo}
                  alt="Logo"
                  width={50}
                  height={50}
                />
            </NavLink>
          </div>

        </div>

        <div
            className="d-flex justify-content-end col-6"
        >


          <button className="btn btn-outline-secondary hide-small my-2 mx-1 mx-sm-2 p-2">
            <NavLink
              className="header-nav-link"
              onClick={() => setShowSidebar(false)}
              to="/contact">Contact</NavLink>
          </button>

          <Dropdown
              className="header-container-item my-2 mx-1 mx-sm-2 p-0"
              onClick={() => setShowSidebar(false)}
            >
            <Dropdown.Toggle
                className="btn btn-secondary dropdown-toggle"
                id="dropdown-basic">
              <i className="bi bi-person-circle"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu
                className="mt-1"
                align="end">
              <Dropdown.Item href="#/login">Login</Dropdown.Item>
              <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
              <Dropdown.Item href="#/signup">Sign up</Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

      </div>
    </header>
    </>
  )
}
