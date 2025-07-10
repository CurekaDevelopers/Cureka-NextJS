import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import LeftNavigation from "../LeftNavigation";
import TopBar from "../common/TopBar";
import msg2 from "../images/layout_img/msg2.png";
import msg3 from "../images/layout_img/msg3.png";
import user from "../images/layout_img/user_img.jpg";

const Profile = () => {
  return (
    <>
      <div className="inner_page profile_page">
        <div className="full_container">
          <div className="inner_container">
            <nav id="sidebar">
              <div className="sidebar_blog_1">
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
                    <div className="col-md-12 page_title">
                      <div>
                        <h2>Profile</h2>
                      </div>
                    </div>
                  </div>

                  <div className="row column1">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                      <div className="white_shd full margin_bottom_30">
                        <div className="full graph_head">
                          <div className="heading1 margin_0">
                            <h2>User profile</h2>
                          </div>
                        </div>
                        <div className="full price_table padding_infor_info">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="full dis_flex center_text">
                                <div className="profile_img">
                                  <img width="180" className="rounded-circle" src={user} alt="#" />
                                </div>
                                <div className="profile_contant">
                                  <div className="contact_inner">
                                    <h3>John Smith</h3>
                                    <p>
                                      <strong>About: </strong>Frontend Developer
                                    </p>
                                    <ul className="list-unstyled">
                                      <li>
                                        {/* <i class="fa fa-envelope-o"></i>*/}
                                        <FontAwesomeIcon
                                          icon={faEnvelope}
                                          style={{ color: "#58718a" }}
                                        />{" "}
                                        : test@gmail.com
                                      </li>
                                      <li>
                                        {/* <i class="fa fa-phone"></i>*/}
                                        <FontAwesomeIcon
                                          icon={faPhone}
                                          style={{ color: "#58718a" }}
                                        />
                                        : 987 654 3210
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="user_progress_bar">
                                    <div className="progress_bar">
                                      <span className="skill" style={{ width: "85%" }}>
                                        Web Applications <span className="info_valume">85%</span>
                                      </span>
                                      <div className="progress skill-bar ">
                                        <div
                                          className="progress-bar progress-bar-animated progress-bar-striped"
                                          role="progressbar"
                                          aria-valuenow="85"
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                          style={{ width: "85%" }}
                                        ></div>
                                      </div>
                                      <span className="skill" style={{ width: "78%" }}>
                                        Website Design <span className="info_valume">78%</span>
                                      </span>
                                      <div className="progress skill-bar">
                                        <div
                                          className="progress-bar progress-bar-animated progress-bar-striped"
                                          role="progressbar"
                                          aria-valuenow="78"
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                          style={{ width: "78%" }}
                                        ></div>
                                      </div>
                                      <span className="skill" style={{ width: "47%" }}>
                                        Automation & Testing{" "}
                                        <span className="info_valume">47%</span>
                                      </span>
                                      <div className="progress skill-bar">
                                        <div
                                          className="progress-bar progress-bar-animated progress-bar-striped"
                                          role="progressbar"
                                          aria-valuenow="54"
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                          style={{ width: "54%" }}
                                        ></div>
                                      </div>
                                      <span className="skill" style={{ width: "65%" }}>
                                        UI / UX <span className="info_valume">65%</span>
                                      </span>
                                      <div className="progress skill-bar">
                                        <div
                                          className="progress-bar progress-bar-animated progress-bar-striped"
                                          role="progressbar"
                                          aria-valuenow="65"
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                          style={{ width: "65%" }}
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="full inner_elements margin_top_30">
                                <div className="tab_style2">
                                  <div className="tabbar">
                                    <Tabs
                                      defaultActiveKey="RecentActivity"
                                      id="fill-tab-example"
                                      className="mb-3"
                                      fill
                                    >
                                      <Tab eventKey="RecentActivity" title="Recent Activity">
                                        <div className="msg_list_main">
                                          <ul className="msg_list">
                                            <li>
                                              <span>
                                                <img
                                                  src={msg2}
                                                  className="img-responsive"
                                                  alt="#"
                                                />
                                              </span>
                                              <span>
                                                <span className="name_user">Taison Jack</span>
                                                <span className="msg_user">
                                                  Sed ut perspiciatis unde omnis.
                                                </span>
                                                <span className="time_ago">12 min ago</span>
                                              </span>
                                            </li>
                                            <li>
                                              <span>
                                                <img
                                                  src={msg3}
                                                  className="img-responsive"
                                                  alt="#"
                                                />
                                              </span>
                                              <span>
                                                <span className="name_user">Mike John</span>
                                                <span className="msg_user">
                                                  On the other hand, we denounce.
                                                </span>
                                                <span className="time_ago">12 min ago</span>
                                              </span>
                                            </li>
                                          </ul>
                                        </div>
                                      </Tab>
                                      <Tab eventKey="Projects" title="Projects Worked on">
                                        <div
                                        // class="tab-pane fade"
                                        // id="project_worked"
                                        // role="tabpanel"
                                        // aria-labelledby="nav-profile-tab"
                                        >
                                          <p>
                                            Sed ut perspiciatis unde omnis iste natus error sit
                                            voluptatem accusantium doloremque laudantium, totam rem
                                            aperiam, eaque ipsa quae ab illo inventore veritatis et
                                            quasi architecto beatae vitae dicta sunt explicabo. Nemo
                                            enim ipsam voluptatem quia voluptas sit aspernatur aut
                                            odit aut fugit, sed quia consequuntur magni dolores eos
                                            qui ratione voluptatem sequi nesciunt.
                                          </p>
                                        </div>
                                      </Tab>
                                      <Tab eventKey="Profile" title="Profile">
                                        <div
                                        // class="tab-pane fade"
                                        // id="profile_section"
                                        // role="tabpanel"
                                        // aria-labelledby="nav-contact-tab"
                                        >
                                          <p>
                                            Sed ut perspiciatis unde omnis iste natus error sit
                                            voluptatem accusantium doloremque laudantium, totam rem
                                            aperiam, eaque ipsa quae ab illo inventore veritatis et
                                            quasi architecto beatae vitae dicta sunt explicabo. Nemo
                                            enim ipsam voluptatem quia voluptas sit aspernatur aut
                                            odit aut fugit, sed quia consequuntur magni dolores eos
                                            qui ratione voluptatem sequi nesciunt.
                                          </p>
                                        </div>
                                      </Tab>
                                    </Tabs>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2"></div>
                    </div>
                  </div>

                  <div className="container-fluid">
                    <div className="footer">
                      <p>
                        Copyright © 2018 Designed by html.design. All rights reserved.
                        <br />
                        <br />
                        Distributed By: <a href="https://themewagon.com/">ThemeWagon</a>
                      </p>
                    </div>
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

export default Profile;
