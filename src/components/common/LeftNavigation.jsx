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
import Link from "next/link";

function LeftNavigation() {
  return (
    <ul className="list-unstyled bg-transparent">
      <li>
        <Link href="/admin/dashboard">
          <FontAwesomeIcon
            className="mr-3"
            icon={faGaugeHigh}
            style={{ color: "#ff9800", marginRight: "20px" }}
          />
          <span> Dashboard</span>
        </Link>
      </li>
      <li>
        <Link href="/admin/usermanagement">
          <FontAwesomeIcon
            className="mr-3"
            icon={faUser}
            style={{ color: "#ff9800", marginRight: "20px" }}
          />
          <span> User Management</span>
        </Link>
      </li>
      <li>
        <Link href="/admin/blogs">
          <FontAwesomeIcon
            className="mr-3"
            icon={faNewspaper}
            style={{ color: "#009688" }}
          />
          <span> Blog Management</span>
        </Link>
      </li>
      <li>
        <Link href="/admin/categories">
          <FontAwesomeIcon
            className="mr-3"
            icon={faBarsProgress}
            style={{ color: "#e91e63" }}
          />
          <span> Category Management</span>
        </Link>
      </li>
      <li>
        <Link href="/admin/brandmanagement">
          <FontAwesomeIcon
            className="mr-3"
            icon={faCubesStacked}
            style={{ color: "#24ecf0" }}
          />
          <span> Brand Management</span>
        </Link>
      </li>
      <li>
        <Link href="/admin/concernmanagement">
          <FontAwesomeIcon
            className="mr-3"
            icon={faFile}
            style={{ color: "#d406ef" }}
          />
          <span> Concern Management</span>
        </Link>
      </li>
      <li>
        <Link href="/admin/policymanagement">
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
