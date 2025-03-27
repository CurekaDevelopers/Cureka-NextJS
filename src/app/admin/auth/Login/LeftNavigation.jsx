import {
  faBarsProgress,
  faCubesStacked,
  faExclamation,
  faFile,
  faGaugeHigh,
  faNewspaper,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function LeftNavigation() {
  return (
    // <Navbar  variant="light" expand="lg">
    //   <Navbar.Collapse id="basic-navbar-nav">
    //     <Nav>
    //     <ul className="bg-transparent">
    //     <li>
    //         {/* <Nav.Link to="/admin/dashboard">Dashboard</Nav.Link> */}
    //         <Nav.Link to="/admin/profile"><FontAwesomeIcon icon={faUser} style={{color: "#3d7ef0",}}  /> Profile</Nav.Link>
    //     </li>
    //     <li>
    //         <Nav.Link to="/admin/login"><FontAwesomeIcon  icon={faRightToBracket} style={{ color: "#009688" }} /> Login</Nav.Link>

    //       </li>
    //       <li>
    //           <Nav.Link to="/admin/register"><FontAwesomeIcon  icon={faRegistered} style={{ color: "#e91e63" }}/> Register</Nav.Link>
    //       </li>
    //       </ul>
    //     </Nav>
    //   </Navbar.Collapse>
    // </Navbar>

    <ul className="list-unstyled bg-transparent">
      <li>
        <Link to="/admin/dashboard" data-toggle="collapse" aria-expanded="false">
          <FontAwesomeIcon
            className="mr-3"
            icon={faGaugeHigh}
            style={{ color: "#ff9800", marginright: "20" }}
          />
          <span> Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/admin/usermanagement" data-toggle="collapse" aria-expanded="false">
          <FontAwesomeIcon
            className="mr-3"
            icon={faUser}
            style={{ color: "#ff9800", marginright: "20" }}
          />
          <span> User Management</span>
        </Link>
      </li>
      <li>
        <Link to="/admin/blogs" data-toggle="collapse" aria-expanded="false">
          <FontAwesomeIcon className="mr-3" icon={faNewspaper} style={{ color: "#009688" }} />
          <span> Blog Management</span>
        </Link>
      </li>
      <li>
        <Link to="/admin/categories" data-toggle="collapse" aria-expanded="false">
          <FontAwesomeIcon className="mr-3" icon={faBarsProgress} style={{ color: "#e91e63" }} />

          <span> Category Management</span>
        </Link>
      </li>
      <li>
        <Link to="/admin/brandmanagement" data-toggle="collapse" aria-expanded="false">
          <FontAwesomeIcon className="mr-3" icon={faCubesStacked} style={{ color: "#24ecf0" }} />

          <span> Brand Management</span>
        </Link>
      </li>
      <li>
        <Link to="/admin/concernmanagement" data-toggle="collapse" aria-expanded="false">
          <FontAwesomeIcon className="mr-3" icon={faFile} style={{ color: "#d406ef" }} />

          <span> Concern Management</span>
        </Link>
      </li>
      <li>
        <Link to="/admin/policymanagement" data-toggle="collapse" aria-expanded="false">
          <FontAwesomeIcon
            className="mr-3"
            icon={faExclamation}
            style={{ color: "#ff9705", width: "14px" }}
          />

          <span> Policy Management</span>
        </Link>
      </li>
    </ul>
  );
}

export default LeftNavigation;
