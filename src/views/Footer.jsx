import React from "react";
import Logo from "../assets/images/Logo.png";
import clock from "../assets/images/clock.png";
import envelope from "../assets/images/envelope.png";
import fb from "../assets/images/fb.png";
import food from "../assets/images/food.png";
import gpay from "../assets/images/gpay.png";
import linkedin from "../assets/images/linkedin.png";
import maestro from "../assets/images/maestro.png";
import map from "../assets/images/map.png";
import master from "../assets/images/master.png";
import paytm from "../assets/images/paytm.png";
import phone from "../assets/images/phone.png";
import phonepay from "../assets/images/phonepay.png";
import pinterest from "../assets/images/pinterest.png";
import rupay from "../assets/images/rupay.png";
import twitter from "../assets/images/twitter.png";
import upi from "../assets/images/upi.png";
import visa from "../assets/images/visa.png";
import youtube from "../assets/images/youtube.png";
export default function Footer() {
  return (
    <>
      <footer>

        <section id="footer-section">

          <div className="container-fluid footer">

            <div className="container footer-space">

              <div className="row">

                <div className="col-lg-3 col-md-6">

                  <img className="d-block mb-3" src={Logo} width="112px" height="47px" alt="footerlogo" />

                  <h2 className="support">For Support & Order Inquiries</h2>

                  <div className='d-flex'>

                    <img className="mr-3 icon-map" src={map} width="10px" height="11px" alt="map" />

                    <p className='address'>Wedjat Health Solutions Pvt. Ltd,75/1, Alagar Kovil Main Rd,Surveyor Colony, Madurai,
                      TamilNadu 625007</p>

                  </div>

                  <div className='d-flex'>

                    <img className="mr-3 icon-map" src={phone} width="12px" height="12px" alt="phone" />

                    <p className='address'>Call us at: +91 9655928004</p>

                  </div>

                  <div className='d-flex'>

                    <img className="mr-3 icon-map" src={envelope} width="12px" height="12px" alt="envelope" />

                    <p className='address'>Email: care@cureka.com</p>

                  </div>

                  <div className='d-flex'>

                    <img className="mr-3 icon-map" src={clock} width="12px" height="12px" alt="clock" />

                    <p className='address'>Mon to Sat - 10:00 AM to 6:00 PM</p>

                  </div>

                </div>

                <div className="col-lg-2 col-md-6">

                  <h2 className="title">Categories</h2>

                  <ul className="category-list">

                    <li className="list-unstyled">

                      <a href="#">Nutrition</a>

                    </li>

                    <li className="list-unstyled">

                      <a href="#">Healthcare Devices</a>

                    </li>

                    <li className="list-unstyled">

                      <a href="#">Herbal & Ayurveda</a>

                    </li>

                    <li className="list-unstyled">

                      <a href="#">Wellness</a>

                    </li>

                    <li className="list-unstyled">

                      <a href="#">Pain Relief</a>

                    </li>

                    <li className="list-unstyled">

                      <a href="#">Hair Care</a>

                    </li>

                    <li className="list-unstyled">

                      <a href="skin">Skin Care</a>

                    </li>

                  </ul>

                </div>

                <div className="col-lg-2 col-md-6">

                  <h2 className="title">Customer Care</h2>

                  <ul className="category-list">

                    <li className="list-unstyled">

                      <a href="orders">My Account</a>

                    </li>

                    <li className="list-unstyled">

                      <a href="blog">Blog</a>

                    </li>

                    <li className="list-unstyled">

                      <a href="#">Medical Expert</a>

                    </li>

                    <li className="list-unstyled">

                      <a href="faq">FAQ</a>

                    </li>

                    <li className="list-unstyled">

                      <a href="aboutus">About Us</a>

                    </li>

                    <li className="list-unstyled">

                      <a href="contactus">Contact</a>

                    </li>

                  </ul>

                </div>

                <div className="col-lg-2 col-md-6">

                  <h2 className="title">Our Policies</h2>

                  <ul className="category-list">

                    <li className="list-unstyled">

                      <a href="#">Terms and Conditions</a>

                    </li>

                    <li className="list-unstyled">

                      <a href="#">Cancellation & Refund</a>

                    </li>

                    <li className="list-unstyled">

                      <a href="#">Disclaimer of Warranties</a>

                    </li>

                    <li className="list-unstyled">

                      <a href="privacypolicy">Privacy Policy</a>

                    </li>

                    <li className="list-unstyled">

                      <a href="#">Help Center</a>

                    </li>

                    <li className="list-unstyled">

                      <a href="#">Submit a Dispute</a>

                    </li>

                  </ul>

                </div>

                <div className="col-lg-3 col-md-6 mb-3 mb-lg-0">

                  <div className="signup">

                    <div className="signup-form">

                      <h2 className='signup-heading'>Sign Up for latest Updates & Newsletter</h2>

                      <p className="signup-para ">It is a long established fact that a reader will be distracted</p>

                      <div className="form-group">

                        <input className="form-control" type="text" placeholder="Enter Your Email Id" />

                      </div>

                      <a href="#">

                        <div className="send">

                          <button className="send-btn border-0">Send</button>

                        </div>

                      </a>

                    </div>

                  </div>

                </div>

              </div>

              <div className="footer-border"></div>

              <div className="d-lg-flex justify-content-between d-flex-column">

                <div className="food-logo">

                  <div className="food">

                    <img src={food} width="320px" height="42px" alt="footer-secondlogo" />

                  </div>

                </div>

                <div className="social">

                  <div className="d-flex">

                    <a className="text-decoration-none" href="#">

                      <div className="img-space">

                        <img src={fb} className="social-icons" width="7px" height="14px" />

                      </div>

                    </a>

                    <a className="text-decoration-none" href="#">

                      <div className="img-space">

                        <img src={twitter} className="social-icons" width="14px" height="11px" />

                      </div>

                    </a>

                    <a className="text-decoration-none" href="#">

                      <div className="img-space">

                        <img src={linkedin} className="social-icons" width="14px" height="11px" />

                      </div>

                    </a>

                    <a className="text-decoration-none" href="#">

                      <div className="img-space">

                        <img src={youtube} className="social-icons" width="14px" height="14px" />

                      </div>

                    </a>

                    <a className="text-decoration-none" href="#">

                      <div className="img-space">

                        <img src={pinterest} className="social-icons" width="11px" height="13px" />

                      </div>

                    </a>

                  </div>

                </div>

              </div>

              <div className="footer-border"></div>

              <div className="d-lg-flex justify-content-between d-flex-column">

                <div className="Copyright">

                  <p className="copyright-text">Copyright © 2024 Cureka. All rights reserved.</p>

                </div>

                <div className="d-flex flex-wrap justify-content-around">

                  <div className="payment-logo">

                    <div className="payment-img">

                      <img src={visa} width="50px" height="24px" alt="visa-logo" />

                    </div>

                  </div>

                  <div className="payment-logo">

                    <div className="payment-img">

                      <img src={master} width="50px" height="24px" alt="master-logo" />

                    </div>

                  </div>

                  <div className="payment-logo">

                    <div className="payment-img">

                      <img src={maestro} width="50px" height="24px" alt="visa-logo" />

                    </div>

                  </div>

                  <div className="payment-logo">

                    <div className="payment-img">

                      <img src={rupay} width="50px" height="24px" alt="visa-logo" />

                    </div>

                  </div>

                  <div className="payment-logo">

                    <div className="payment-img">

                      <img src={upi} width="50px" height="24px" alt="visa-logo" />

                    </div>

                  </div>

                  <div className="payment-logo">

                    <div className="payment-img">

                      <img src={paytm} width="50px" height="24px" alt="visa-logo" />

                    </div>

                  </div>


                  <div className="payment-logo">

                    <div className="payment-img">

                      <img src={gpay} width="50px" height="24px" alt="visa-logo" />

                    </div>

                  </div>

                  <div className="payment-logo">

                    <div className="payment-img">

                      <img src={phonepay} width="50px" height="24px" alt="visa-logo" />

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

      </footer>
    </>
  );
}
