import Link from "next/link";

import houseChimney from "../../public/images/house-chimney.png";
// import { pagePaths } from "../routes/constant";
import Image from "next/image";
const Breadcrumbs = ({ title }) => {
  return (
    <div className="container">
      <div className="d-flex home-back-section">
        <Link href="/">
          <Image
            className="img-fluid d-flex align-self-center"
            src={houseChimney}
            width={16}
            height={16}
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
