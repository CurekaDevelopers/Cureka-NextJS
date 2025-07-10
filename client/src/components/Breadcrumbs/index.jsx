import { Link } from "react-router-dom";
import houseChimney from "../../assets/images/house-chimney.png";
// import { pagePaths } from "../routes/constant";

const Breadcrumbs = ({ title }) => {
  return (
    <div className="container">
      <div className="d-flex home-back-section">
        <Link to="/">
          <img
            className="img-fluid d-flex align-self-center"
            src={houseChimney}
            width="16px"
            height="16px"
            alt="home-icon"
          />
        </Link>

        <p className="section mb-0 ml-2">
          / <span className="ml-2">{title}</span>
        </p>
      </div>
    </div>
  );
};

export default Breadcrumbs;
