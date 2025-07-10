import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";
import { BrowserRouter, NavLink } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container">
          <BrowserRouter>
            <NavLink className="navbar-brand text-white" to="/">
              Navbar
            </NavLink>
          </BrowserRouter>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto ">
              <li className="nav-item active">
                <Nav.Link href="/admin/dashboard" className="nav-link text-white">
                  Home
                </Nav.Link>
              </li>
              <li className="nav-item active">
                {!isLoggedIn ? (
                  <>
                    <Nav.Link href="/admin/login" className="nav-link text-white">
                      Login
                    </Nav.Link>
                  </>
                ) : (
                  <Nav.Link href="/admin/dashboard" className="nav-link text-white">
                    LogOut
                  </Nav.Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
