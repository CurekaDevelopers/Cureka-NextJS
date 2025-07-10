import LeftNavigation from "../LeftNavigation";
import TopBar from "../common/TopBar";
import user from "../images/layout_img/user_img.jpg";
import logo from "../images/logo/Logo.png";

const Settings = () => {
  return (
    <>
      <div className="inner_page profile_page">
        <div className="full_container">
          <div className="inner_container">
            <nav id="sidebar">
              <div className="sidebar_blog_1">
                <div className="sidebar-header">
                  <div className="logo_section">
                    <a href="index.html">
                      <img className="logo_icon img-responsive" src={logo} alt="#" />
                    </a>
                  </div>
                </div>
                <div className="sidebar_user_info">
                  <div className="icon_setting"></div>
                  <div className="user_profle_side">
                    <div className="user_img">
                      <img className="img-responsive" src={user} alt="#" />
                    </div>
                    <div className="user_info">
                      <h6>John David</h6>
                      <p>
                        <span className="online_animation"></span> Online
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sidebar_blog_2">
                <h4>General</h4>
                <ul className="list-unstyled components">
                  <LeftNavigation />
                </ul>
              </div>
            </nav>
            <div id="content">
              <TopBar />
              <div className="midde_cont">
                <div className="container-fluid">
                  <div className="row column_title">
                    <div className="col-md-12">
                      <div className="mt-4 page_title">
                        <h2>Settings</h2>
                      </div>
                    </div>
                  </div>
                  <div className="row column1">
                    <h1>Coming Soon</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
