import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
} from "mdb-react-ui-kit";

import skin from "../assets/images/skin.png";
import ayurveda from "../assets/images/ayurveda.png";
import hair from "../assets/images/hair.png";
import nutrition from "../assets/images/nutrition.png";
import elderly from "../assets/images/elderly.png";
import diabetes from "../assets/images/diabetes.png";
import jointpain from "../assets/images/jointpain.png";
import asthma from "../assets/images/asthma.png";
import wellness from "../assets/images/wellness.png";
import Nav from "react-bootstrap/Nav";

export default function Navbar() {
  //   const [menu, setMenu] = useState("skin");
  return (
    <>
      <div className="categories">
        <div className="border-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 px-lg-0">
                <MDBNavbar expand="lg" light bgColor="light">
                  <MDBContainer fluid>
                    <MDBNavbarNav
                      className="me-auto ps-lg-0  navbar-nav"
                      style={{ paddingLeft: "0.15rem" }}
                    >
                      <MDBNavbarItem className="nav-item dropdown position-static">
                        <MDBDropdown>
                          <MDBDropdownToggle tag="a" className="nav-link nav-link dropdown-toggle">
                            All Categories
                          </MDBDropdownToggle>
                          <MDBDropdownMenu
                            className="mt-0 w-100 justify-content-center"
                            style={{
                              borderTopLeftRadius: "0",
                              borderTopRightRadius: "0",
                              minWidth: "776px",
                            }}
                          >
                            <MDBContainer>
                              <MDBRow className="my-4">
                                <MDBCol md="6" lg="3" className="mb-3 mb-lg-0">
                                  <MDBListGroup flush>
                                    <MDBListGroupItem tag="a" href="#" action>
                                      Lorem ipsum
                                    </MDBListGroupItem>
                                    <MDBListGroupItem tag="a" href="#" action>
                                      Dolor sit
                                    </MDBListGroupItem>
                                    <MDBListGroupItem tag="a" href="#" action>
                                      Amet consectetur
                                    </MDBListGroupItem>
                                    <MDBListGroupItem tag="a" href="#" action>
                                      Cras justo odio
                                    </MDBListGroupItem>
                                    <MDBListGroupItem tag="a" href="#" action>
                                      Adipisicing elit
                                    </MDBListGroupItem>
                                  </MDBListGroup>
                                </MDBCol>
                                <MDBCol md="6" lg="3" className="mb-3 mb-lg-0">
                                  <MDBListGroup flush>
                                    <MDBListGroupItem tag="a" href="#" action>
                                      Explicabo voluptas
                                    </MDBListGroupItem>
                                    <MDBListGroupItem tag="a" href="#" action>
                                      Perspiciatis quo
                                    </MDBListGroupItem>
                                    <MDBListGroupItem tag="a" href="#" action>
                                      Cras justo odio
                                    </MDBListGroupItem>
                                    <MDBListGroupItem tag="a" href="#" action>
                                      Laudantium maiores
                                    </MDBListGroupItem>
                                    <MDBListGroupItem tag="a" href="#" action>
                                      Provident dolor
                                    </MDBListGroupItem>
                                  </MDBListGroup>
                                </MDBCol>
                                <MDBCol md="6" lg="3" className="mb-3 mb-md-0">
                                  <MDBListGroup flush>
                                    <MDBListGroupItem tag="a" href="#" action>
                                      Iste quaerato
                                    </MDBListGroupItem>
                                    <MDBListGroupItem tag="a" href="#" action>
                                      Cras justo odio
                                    </MDBListGroupItem>
                                    <MDBListGroupItem tag="a" href="#" action>
                                      Est iure
                                    </MDBListGroupItem>
                                    <MDBListGroupItem tag="a" href="#" action>
                                      Praesentium
                                    </MDBListGroupItem>
                                    <MDBListGroupItem tag="a" href="#" action>
                                      Laboriosam
                                    </MDBListGroupItem>
                                  </MDBListGroup>
                                </MDBCol>
                                <MDBCol md="6" lg="3">
                                  <MDBListGroup flush>
                                    <MDBListGroupItem tag="a" href="#" action>
                                      Cras justo odio
                                    </MDBListGroupItem>
                                    <MDBListGroupItem tag="a" href="#" action>
                                      Saepe
                                    </MDBListGroupItem>
                                    <MDBListGroupItem tag="a" href="#" action>
                                      Vel alias
                                    </MDBListGroupItem>
                                    <MDBListGroupItem tag="a" href="#" action>
                                      Sunt doloribus
                                    </MDBListGroupItem>
                                    <MDBListGroupItem tag="a" href="#" action>
                                      Cum dolores
                                    </MDBListGroupItem>
                                  </MDBListGroup>
                                </MDBCol>
                              </MDBRow>
                            </MDBContainer>
                          </MDBDropdownMenu>
                        </MDBDropdown>
                      </MDBNavbarItem>
                    </MDBNavbarNav>
                  </MDBContainer>
                </MDBNavbar>
              </div>
              <div className="col-lg-10 d-flex justify-content-xl-around justify-content-start category-banners">
                <Nav defaultActiveKey="/home" as="ul">
                  <Nav.Item as="li">
                    <div className="category-images">
                      <img
                        src={skin}
                        width="80px"
                        height="80px"
                        alt="skin-logo"
                      />
                      <Nav.Link href="/skin">skin</Nav.Link>
                    </div>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <div className="category-images">
                      <img
                        src={hair}
                        width="80px"
                        height="80px"
                        alt="skin-logo"
                      />
                      <Nav.Link href="/hair">Hair</Nav.Link>
                    </div>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <div className="category-images">
                      <img
                        src={ayurveda}
                        width="80px"
                        height="80px"
                        alt="skin-logo"
                      />
                      <Nav.Link href="/ayurveda">Ayurveda</Nav.Link>
                    </div>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <div className="category-images">
                      <img
                        src={nutrition}
                        width="80px"
                        height="80px"
                        alt="skin-logo"
                      />
                      <Nav.Link href="/nutrition">Nutrition</Nav.Link>
                    </div>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <div className="category-images">
                      <img
                        src={elderly}
                        width="80px"
                        height="80px"
                        alt="skin-logo"
                      />
                      <Nav.Link href="/elderly">Elderly</Nav.Link>
                    </div>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <div className="category-images">
                      <img
                        src={diabetes}
                        width="80px"
                        height="80px"
                        alt="skin-logo"
                      />
                      <Nav.Link href="/diabetes">Diabetes</Nav.Link>
                    </div>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <div className="category-images">
                      <img
                        src={jointpain}
                        width="80px"
                        height="80px"
                        alt="skin-logo"
                      />
                      <Nav.Link href="/jointpain">JointPain</Nav.Link>
                    </div>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <div className="category-images">
                      <img
                        src={asthma}
                        width="80px"
                        height="80px"
                        alt="skin-logo"
                      />
                      <Nav.Link href="/asthma">Asthma</Nav.Link>
                    </div>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <div className="category-images">
                      <img
                        src={wellness}
                        width="80px"
                        height="80px"
                        alt="skin-logo"
                      />
                      <Nav.Link href="/wellness">wellness</Nav.Link>
                    </div>
                  </Nav.Item>
                </Nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
