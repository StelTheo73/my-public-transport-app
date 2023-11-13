import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import "../static/css/Sidebar.css";
import textObject from "../assets/language/sidebar.json";

export const Sidebar = ({showSidebar, setShowSidebar, language}) => {
    const handleSidebarToggle = () => {
        setShowSidebar(!showSidebar);
    }

    return (
        <div className={`sidebar-wrapper ${showSidebar ? "show" : "hidden"}`}>
            <div className="sidebar">
                <div
                    className={`sidebar-content-wrapper bg-primary
                     d-flex flex-column justify-content-between align-items-center
                     ${showSidebar ? "show" : "hidden"}`}
                    >
                    <Nav className="flex-column justify-content-between mt-5">
                        <NavLink
                            className="sidebar-nav-link text-light my-2 px-2 h3"
                            href="#/announcements"
                            onClick={handleSidebarToggle}
                        >{textObject["announcements"][language]}
                        </NavLink>
                        <NavLink
                            className="sidebar-nav-link text-light my-2 px-2 h3"
                            href="#/terms"
                            onClick={handleSidebarToggle}
                        >{textObject["terms"][language]}
                        </NavLink>
                        <NavLink
                            className="sidebar-nav-link text-light my-2 px-2 h3"
                            to="/contact"
                            onClick={handleSidebarToggle}
                        >{textObject["contact"][language]}
                        </NavLink>
                    </Nav>
                </div>
            </div>
            <div
                className={`sidebar-overlay ${showSidebar ? "show" : "hidden"}`}
                onClick={handleSidebarToggle}
            >
            </div>
        </div>
    )
}
