import { Dropdown } from "react-bootstrap";

export const UserDropdown = ({language, textObject, setShowSidebar}) => {
  return (
    <Dropdown
        className="header-container-item"
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
            <Dropdown.Item href="#/login">{textObject["login"][language]}</Dropdown.Item>
            <Dropdown.Item href="#/profile">{textObject["profile"][language]}</Dropdown.Item>
            <Dropdown.Item href="#/signup">{textObject["signup"][language]}</Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.Item href="#/logout">{textObject["logout"][language]}</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
  )
}
