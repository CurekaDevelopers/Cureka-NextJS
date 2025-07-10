import { BrowserRouter, NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section
        style={{
          backgroundColor: "royalblue",
          width: "100%",
          height: "90vh",
        }}
      >
        <div className="box">
          <h1>WELCOME TO REACT PROJECT</h1>
          <BrowserRouter>
            <NavLink to="/admin/profile" className="btn btn-warning">
              Get Started
            </NavLink>
          </BrowserRouter>
        </div>
      </section>
    </>
  );
};

export default Home;
