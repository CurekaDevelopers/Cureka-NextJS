import {useState,useEffect} from "react"
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { Link, useSearchParams } from "react-router-dom";
import box_open from "../../../assets/images/box_open.svg";
import exit from "../../../assets/images/exit.svg";
import heart from "../../../assets/images/heart.svg";
import houseChimney from "../../../assets/images/house-chimney.png";
import map from "../../../assets/images/map.svg";
import ticket from "../../../assets/images/ticket.svg";
import user from "../../../assets/images/user.svg";
import wallet from "../../../assets/images/wallet.svg";
import "../../../css/orders.css";
import { logoutCustomer } from "../../../redux/action/auth.action";
import { pagePaths } from "../../../routes/constant";
import lazyLoadable from "../../../routes/lazyLoadable";
import Footer from "../../../views/Footer";
import Header from "../../../views/Header";

const tabs = [
  {
    value: "my-orders",
    label: "My Orders",
    icon: box_open,
    tabElement: lazyLoadable(() => import("./OrdersTab")),
  },
  {
    value: "address",
    label: "Address",
    icon: map,
    tabElement: lazyLoadable(() => import("./AddressTab")),
  },
  {
    value: "my-wallet",
    label: "My Wallet",
    icon: wallet,
    tabElement: lazyLoadable(() => import("./MyWalletTab")),
  },
  {
    value: "my-wishlist",
    label: "My Wishlist",
    icon: heart,
    tabElement: lazyLoadable(() => import("./MyWishlistTab")),
  },
  {
    value: "my-coupons",
    label: "My Coupons",
    icon: ticket,
    tabElement: lazyLoadable(() => import("./MyCouponsTab")),
  },
  {
    value: "my-account",
    label: "My Account",
    icon: user,
    tabElement: lazyLoadable(() => import("./AccountTab")),
  },
];
import ScrollToTop from '../../../../src/views/ScrollToTop';

export default function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || tabs[0].value;
  const [isVisible, setIsVisible] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header showCategoryNavbar={false} />
      <div className="container-fluid px-0">
        <div className="container">
          <div className="d-flex home-back-section pt-1">
            <Link to={pagePaths.home}>
              <img
                className="img-fluid d-flex align-self-center"
                src={houseChimney}
                width="16px"
                height="16px"
                alt="home-icon"
              />
            </Link>

            <p className="section mb-0 ml-3">/ &nbsp;&nbsp;&nbsp;My Account</p>
          </div>
        </div>

        <div className="bottom-border"></div>
      </div>

      {/* <!-- order section starts --> */}
      <div className="container">
        <div className="d-lg-flex d-flex-column justify-content-center order-space">
          <div className="col-lg-12 col-md-12 order-tabs">
            <Tab.Container
              id="left-tabs-example"
              activeKey={activeTab}
              defaultActiveKey={activeTab}
            >
              <Row>
                <Col md={4} lg={3}>
                  <div className="orderpills">
                    <Nav variant="pills" className="flex-column">
                      {tabs.map((item) => {
                        return (
                          <Nav.Item style={{ width: "100%" }} key={item.value}>
                            <Nav.Link
                              onClick={() => {
                                searchParams.set("tab", item.value);
                                setSearchParams(searchParams);
                              }}
                              eventKey={item.value}
                            >
                              <img
                                className="img-fluid mr-2"
                                src={item.icon}
                                alt="gift-box"
                                width="14px"
                                height="14px"
                              />
                              {item.label}
                            </Nav.Link>
                          </Nav.Item>
                        );
                      })}
                      <Nav.Item style={{ width: "100%" }}>
                        <Nav.Link eventKey="seventh" className="logout" onClick={logoutCustomer}
                          href="/">
                          <img
                            className="img-fluid mr-2"
                            src={exit}
                            alt="exit"
                            width="14px"
                            height="14px"
                          />
                          Log Out
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                </Col>
                <Col md={8} lg={9}>
                  <Tab.Content>
                    {tabs.map((item) => {
                      return (
                        <Tab.Pane key={item.value} eventKey={item.value}>
                          {activeTab === item.value && <item.tabElement />}
                        </Tab.Pane>
                      );
                    })}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </div>
      </div>
      <Footer />
      <div className="">
        <ScrollToTop isVisible={isVisible} />
      </div>
    </>
  );
}
