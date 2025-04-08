"use client";
import { useEffect, useState } from "react";
import { Nav, Tab, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PopupModal from "../../views/Header/HomePopup";
import "../../styles/header.css";
import {
  fetchConcerns,
  fetchConcernsProducts,
  fetchCategories,
} from "../../redux/action";
import Image from "next/image";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { concerns, concernsProduct } = useSelector((state) => state.admin);
  const { nestedCategories } = useSelector((state) => state.customer);

  const [hoveredCategory, setHoveredCategory] = useState("");
  const [modalCategoryPopupShow, setmodalCategoryPopupShow] = useState(false);

  useEffect(() => {
    setHoveredCategory(nestedCategories[0]);
  }, [nestedCategories]);

  const onChangeHoveredCategory = (category) => () => {
    setHoveredCategory(category);
  };

  const handleConcernsProducts = (item) => {
    dispatch(fetchConcernsProducts({ item }));
  };
  useEffect(() => {
    dispatch(fetchConcerns());
  }, [dispatch]);

  const closeCartegoryPopupModal = () => {
    setmodalCategoryPopupShow(false);
  };

  return (
    <>
      <br />
      <div className="categories">
        <div className="border-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 px-lg-0 d-none d-lg-block">
                <nav
                  className="navbar navbar-expand-lg navbar-dark"
                  id="hover_category_btn"
                >
                  <div className="container-fluid">
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#main_nav"
                    >
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="main_nav">
                      <ul className="navbar-nav">
                        <li
                          className="nav-item dropdown ml-2"
                          id="has-megamenu"
                        >
                          <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            data-bs-toggle="dropdown"
                          >
                            All Categories{" "}
                          </a>
                          <div
                            className="dropdown-menu megamenu "
                            role="menu"
                            id="megamenutabs"
                          >
                            <Tab.Container
                              id="left-tabs-example"
                              activeKey={hoveredCategory?.slug}
                              defaultActiveKey={hoveredCategory?.slug}
                            >
                              <Row>
                                <Col lg={2} className="left-megamenu">
                                  <Nav
                                    variant="pills"
                                    className="flex-column megamenutabs"
                                  >
                                    {!!nestedCategories?.length &&
                                      nestedCategories?.map((item) => {
                                        return (
                                          <Nav.Item
                                            key={item.id}
                                            onMouseEnter={onChangeHoveredCategory(
                                              item
                                            )}
                                            onClick={() =>
                                              window.open(
                                                `/product-category/${item.slug}`,
                                                "_blank"
                                              )
                                            }
                                          >
                                            <Link
                                              href={`/product-category/${hoveredCategory?.slug}`}
                                            >
                                              <Nav.Link
                                                onClick={() =>
                                                  window.open(
                                                    `/product-category/${hoveredCategory?.slug}`,
                                                    "_blank"
                                                  )
                                                }
                                                eventKey={item.slug}
                                              >
                                                {item.name}
                                              </Nav.Link>
                                            </Link>
                                          </Nav.Item>
                                        );
                                      })}
                                  </Nav>
                                </Col>
                                <Col lg={10}>
                                  <Tab.Content className="p-0">
                                    <Tab.Pane
                                      eventKey={hoveredCategory?.slug}
                                      className="m-0"
                                    >
                                      <div className="menu-container">
                                        {!!hoveredCategory?.sub_categories
                                          ?.length &&
                                          hoveredCategory?.sub_categories.map(
                                            (subCategory) => {
                                              return (
                                                <div
                                                  key={subCategory.id}
                                                  className="menu-column"
                                                >
                                                  <Link
                                                    href={`/product-category/${hoveredCategory?.slug}/${subCategory.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                  >
                                                    <h2 className="items-title">
                                                      {subCategory.name}
                                                    </h2>
                                                  </Link>
                                                  <ul className="category-list">
                                                    {!!subCategory
                                                      ?.sub_sub_categories
                                                      ?.length &&
                                                      subCategory?.sub_sub_categories?.map(
                                                        (subSubCategory) => {
                                                          return (
                                                            <li
                                                              key={
                                                                subSubCategory.id
                                                              }
                                                              className="items"
                                                            >
                                                              <Link
                                                                href={`/product-category/${hoveredCategory?.slug}/${subCategory.slug}/${subSubCategory.slug}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                              >
                                                                {
                                                                  subSubCategory.name
                                                                }
                                                              </Link>
                                                            </li>
                                                          );
                                                        }
                                                      )}
                                                  </ul>
                                                  <div className="end-category"></div>
                                                </div>
                                              );
                                            }
                                          )}
                                      </div>
                                    </Tab.Pane>
                                  </Tab.Content>
                                </Col>
                              </Row>
                            </Tab.Container>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="col-lg-10 d-flex justify-content-start justify-content-xl-between category-banners">
                <Nav defaultActiveKey="/home" as="ul" className="category-nav ">
                  {!!concerns?.length &&
                    concerns.map((item) => (
                      <Nav.Item
                        as="li"
                        key={item.id}
                        onClick={() => handleConcernsProducts(item.slug)}
                      >
                        <Link
                          href={`/concern/${item.slug}`}
                          className="category-link text-decoration-none"
                        >
                          <div className="category-images text-center">
                            <img
                              src={item.image}
                              width="80px"
                              height="80px"
                              alt="skin-logo"
                              className="category-img"
                            />
                            <div
                              className="category-text text-truncate"
                              title={item.name}
                            >
                              {item.name}
                            </div>
                          </div>
                        </Link>
                      </Nav.Item>
                    ))}
                </Nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {concernsProduct && concernsProduct.popups && (
        <PopupModal
          show={modalCategoryPopupShow}
          onHide={closeCartegoryPopupModal}
          popupData={concernsProduct.popups}
        />
      )}
    </>
  );
}
