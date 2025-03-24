"use client";

import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import box_open from "../../public/images/box_open.svg";
import exit from "../../public/images/exit.svg";
import heart from "../../public/images/heart.svg";
import houseChimney from "../../public/images/house-chimney.png";
import map from "../../public/images/map.svg";
import ticket from "../../public/images/ticket.svg";
import user from "../../public/images/user.svg";
import wallet from "../../public/images/wallet.svg";
import { logoutCustomer } from "../../redux/action/auth.action";
import { pagePaths } from "../../utils/constants/constant";
import lazyLoadable from "../../utils/lazyLoadable";
import Footer from "../../views/Footer";
import Header from "../../views/Header/index";
import ScrollToTop from "../../views/ScrollToTop";
import Image from "next/image";
const tabs = [
  {
    value: "my-orders",
    label: "My Orders",
    icon: box_open,
    tabElement: lazyLoadable(() => import("./components/OrdersTab")),
  },
  {
    value: "address",
    label: "Address",
    icon: map,
    tabElement: lazyLoadable(() => import("./components/AddressTab")),
  },
  {
    value: "my-wallet",
    label: "My Wallet",
    icon: wallet,
    tabElement: lazyLoadable(() => import("./components/MyWalletTab")),
  },
  {
    value: "my-wishlist",
    label: "My Wishlist",
    icon: heart,
    tabElement: lazyLoadable(() => import("./components/MyWishlistTab")),
  },
  {
    value: "my-coupons",
    label: "My Coupons",
    icon: ticket,
    tabElement: lazyLoadable(() => import("./components/MyCouponsTab")),
  },
  {
    value: "my-account",
    label: "My Account",
    icon: user,
    tabElement: lazyLoadable(() => import("./components/AccountTab")),
  },
];

export default function Orders() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams?.get("tab") || tabs[0].value;
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 200);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabChange = (tabValue) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("tab", tabValue);
    router.push(currentUrl.toString());
  };

  return (
    <>
      <Header showCategoryNavbar={false} />
      <div className="container-fluid px-0">
        <div className="container">
          <div className="d-flex home-back-section pt-1">
            <Link href={pagePaths.home}>
              <Image
                className="img-fluid d-flex align-self-center"
                src={houseChimney}
                width={30}
                height={35}
                alt="home-icon"
              />
            </Link>
            <p className="section mb-0 ml-3">/ &nbsp;&nbsp;&nbsp;My Account</p>
          </div>
        </div>
        <div className="bottom-border"></div>
      </div>

      {/* Order Section */}
      <div className="container">
        <div className="d-lg-flex d-flex-column justify-content-center order-space">
          <div className="col-lg-12 col-md-12 order-tabs">
            <Tab.Container activeKey={activeTab} defaultActiveKey={activeTab}>
              <Row>
                <Col md={4} lg={3}>
                  <div className="orderpills">
                    <Nav variant="pills" className="flex-column">
                      {tabs.map((item) => (
                        <Nav.Item style={{ width: "100%" }} key={item.value}>
                          <Nav.Link
                            onClick={() => handleTabChange(item.value)}
                            eventKey={item.value}
                          >
                            <Image
                              className="img-fluid mr-2"
                              src={item.icon}
                              alt={item.label}
                              width={20}
                              height={14}
                            />
                            {item.label}
                          </Nav.Link>
                        </Nav.Item>
                      ))}
                      <Nav.Item style={{ width: "100%" }}>
                        <Nav.Link
                          eventKey="logout"
                          className="logout"
                          onClick={logoutCustomer}
                          href="/"
                        >
                          <Image
                            className="img-fluid mr-2"
                            src={exit}
                            alt="exit"
                            width={14}
                            height={14}
                          />
                          Log Out
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                </Col>
                <Col md={8} lg={9}>
                  <Tab.Content>
                    {tabs.map((item) => (
                      <Tab.Pane key={item.value} eventKey={item.value}>
                        {activeTab === item.value && <item.tabElement />}
                      </Tab.Pane>
                    ))}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </div>
      </div>

      <Footer />
      <div>
        <ScrollToTop isVisible={isVisible} />
      </div>
    </>
  );
}
