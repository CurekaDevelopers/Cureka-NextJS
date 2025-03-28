"use client"; // Ensure it's at the top

import logo from "../../../../public/images/admin/cureka-admin-logo.svg";

export default function Header() {
  return (
    <>
      <div className="container-fluid mt-50">
        <div className="border-bottom">
          <div className="container px-0" id="header">
            <nav className="justify-content-between navbar navbar-expand-lg navbar-light bg-white pb-3 px-0 pr-0">
              <div className="mobilelogo">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-target="#mySidenav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick="openNav()"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <a className="navbar-brand" href="index">
                  <img
                    className="img-fluid"
                    src={logo}
                    width="112px"
                    height="47px"
                    alt="cureka-logo"
                  />
                </a>
              </div>
              <h3 style={{ float: "right" }} className="align-self-end">
                Dashboard
              </h3>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
