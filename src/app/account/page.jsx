"use client";
import { useState, useEffect, useMemo, Suspense } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../views/Footer";
import Header from "../../views/Header/index";
import ScrollToTop from "../../views/ScrollToTop";
import { logoutCustomer } from "../../redux/action/auth.action";
import { pagePaths } from "../../utils/constants/constant";
import lazyLoadable from "../../utils/lazyLoadable";

// Images
import box_open from "../../public/images/box_open.svg";
import exit from "../../public/images/exit.svg";
import heart from "../../public/images/heart.svg";
import houseChimney from "../../public/images/house-chimney.png";
import map from "../../public/images/map.svg";
import ticket from "../../public/images/ticket.svg";
import user from "../../public/images/user.svg";
import wallet from "../../public/images/wallet.svg";

// Lazy load components
const OrdersTab = lazyLoadable(() => import("./components/OrdersTab"));
const AddressTab = lazyLoadable(() => import("./components/AddressTab"));
const MyWalletTab = lazyLoadable(() => import("./components/MyWalletTab"));
const MyWishlistTab = lazyLoadable(() => import("./components/MyWishlistTab"));
const MyCouponsTab = lazyLoadable(() => import("./components/MyCouponsTab"));
const AccountTab = lazyLoadable(() => import("./components/AccountTab"));

// Memoized tab data
const useTabs = () =>
  useMemo(
    () => [
      {
        value: "my-orders",
        label: "My Orders",
        icon: box_open,
        component: OrdersTab,
      },
      { value: "address", label: "Address", icon: map, component: AddressTab },
      {
        value: "my-wallet",
        label: "My Wallet",
        icon: wallet,
        component: MyWalletTab,
      },
      {
        value: "my-wishlist",
        label: "My Wishlist",
        icon: heart,
        component: MyWishlistTab,
      },
      {
        value: "my-coupons",
        label: "My Coupons",
        icon: ticket,
        component: MyCouponsTab,
      },
      {
        value: "my-account",
        label: "My Account",
        icon: user,
        component: AccountTab,
      },
    ],
    []
  );

export default function Orders() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabs = useTabs();

  const activeTab = useMemo(
    () => searchParams?.get("tab") || tabs[0].value,
    [searchParams, tabs]
  );

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setIsVisible(window.scrollY > 200);
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabChange = (tabValue) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("tab", tabValue);
    router.replace(newUrl.toString()); // Use `replace` to avoid history stack pollution
  };

  return (
    <>
      <Header showCategoryNavbar={false} />
      <br />
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
                priority // Important images load faster
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
                {/* Sidebar Tabs */}
                <Col md={4} lg={3}>
                  <div className="orderpills">
                    <Nav variant="pills" className="flex-column">
                      {tabs.map(({ value, label, icon }) => (
                        <Nav.Item style={{ width: "100%" }} key={value}>
                          <Nav.Link
                            onClick={() => handleTabChange(value)}
                            eventKey={value}
                          >
                            <Image
                              className="img-fluid mr-2"
                              src={icon}
                              alt={label}
                              width={20}
                              height={14}
                              loading="lazy"
                            />
                            {label}
                          </Nav.Link>
                        </Nav.Item>
                      ))}
                      {/* Logout Button */}
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

                {/* Tab Content */}
                <Col md={8} lg={9}>
                  <Tab.Content>
                    {tabs.map(({ value, component: Component }) => (
                      <Tab.Pane key={value} eventKey={value}>
                        {activeTab === value && (
                          <Suspense fallback={<div>Loading...</div>}>
                            <Component />
                          </Suspense>
                        )}
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
