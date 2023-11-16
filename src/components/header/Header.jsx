import { NavLink } from "react-router-dom";
import { LanguageSelector } from "./LanguageSelector";
import { UserDropdown } from "./UserDropdown";

import "./Header.css";
import textObject from "../../assets/language/header.json";
import Logo from "../../assets/images/logo.png";


export const Header = ({showSidebar, setShowSidebar, language, setLanguage}) => {
  const handleSidebarToggle = () => {
      setShowSidebar(!showSidebar);
  }

  return (
    <>
    <div className="header-back">
    </div>
    <header>
      <div className="row mx-1">

        <div className="d-flex justify-content-start col-6">
          <div className="d-flex align-items-center p-1 gap-3">
            <div className="d-flex align-items-center">
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
            <div className={`burger ${showSidebar?'open':''}` } htmlFor="burger" 
                onClick={handleSidebarToggle}>
              {/* <input type="checkbox" id="burger"/> */}
              <span className="burgerLine"/>
              <span className="burgerLine"/>
              <span className="burgerLine"/>
            </div>

          </div>
        </div>


        <div className="d-flex justify-content-end col-6">
          <div className="d-flex align-items-center px-sm-2 header-item-wrapper hide-small">
            <NavLink
              className="header-nav-link hide-small"
              onClick={() => setShowSidebar(false)}
              to="/contact">{textObject["contact"][language]}</NavLink>
          </div>
          <div className="d-flex align-items-center header-item-wrapper">
              <LanguageSelector language={language} setLanguage={setLanguage}/>
          </div>
          <div className="d-flex align-items-center px-2 header-item-wrapper">
              <UserDropdown language={language} textObject={textObject} setShowSidebar={setShowSidebar}/>
          </div>
        </div>

      </div>
    </header>
    </>
  )
}
