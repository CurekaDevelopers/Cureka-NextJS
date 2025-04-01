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

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { concerns, concernsProduct } = useSelector((state) => state.admin);
  const { nestedCategories } = useSelector((state) => state.customer);

  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [modalCategoryPopupShow, setModalCategoryPopupShow] = useState(false);

  // 🔹 Debugging: Check Redux Data
  useEffect(() => {
    console.log("nestedCategories from Redux:", nestedCategories);
  }, [nestedCategories]);

  useEffect(() => {
    dispatch(fetchConcerns());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (nestedCategories.length > 0) {
      setHoveredCategory(nestedCategories[0]); // ✅ Set first category as default
    } else {
      setHoveredCategory(null);
    }
  }, [nestedCategories]);

  const onChangeHoveredCategory = (category) => {
    setHoveredCategory(category);
  };

  const handleConcernsProducts = (item) => {
    dispatch(fetchConcernsProducts({ item }));
  };

  const closeCategoryPopupModal = () => {
    setModalCategoryPopupShow(false);
  };

  return (
    <>
      <br />
      <br />
      <div className="categories">
        <div className="border-bottom">
          <div className="container">
            <div className="row">
              {/* Categories Menu */}
              <div className="col-lg-2 px-lg-0 d-none d-lg-block">
                <nav className="navbar navbar-expand-lg navbar-dark">
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
                        <li className="nav-item dropdown">
                          <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            data-bs-toggle="dropdown"
                          >
                            All Categories
                          </a>
                          <div className="dropdown-menu megamenu">
                            <Tab.Container
                              activeKey={hoveredCategory?.slug || ""}
                              defaultActiveKey={hoveredCategory?.slug || ""}
                            >
                              <Row>
                                {/* Left Sidebar Category List */}
                                <Col lg={2} className="left-megamenu">
                                  <Nav variant="pills" className="flex-column">
                                    {nestedCategories?.length > 0 &&
                                      nestedCategories.map((item) => {
                                        if (
                                          item.nav_link
                                            ?.trim()
                                            .toLowerCase() !== "active"
                                        )
                                          return null;
                                        return (
                                          <Nav.Item
                                            key={item.id}
                                            onMouseEnter={() =>
                                              onChangeHoveredCategory(item)
                                            }
                                          >
                                            <Nav.Link eventKey={item.slug}>
                                              <Link
                                                href={`/product-category/${item.slug}`}
                                                legacyBehavior
                                              >
                                                <a>{item.name}</a>
                                              </Link>
                                            </Nav.Link>
                                          </Nav.Item>
                                        );
                                      })}
                                  </Nav>
                                </Col>

                                {/* Right Sub-Categories List */}
                                <Col lg={10}>
                                  <Tab.Content className="p-0">
                                    <Tab.Pane
                                      eventKey={hoveredCategory?.slug || ""}
                                      className="m-0"
                                    >
                                      <div className="menu-container">
                                        {hoveredCategory?.sub_categories
                                          ?.length > 0 ? (
                                          hoveredCategory.sub_categories.map(
                                            (subCategory) => (
                                              <div
                                                key={subCategory.id}
                                                className="menu-column"
                                              >
                                                {/* Sub-category title */}
                                                <h2 className="items-title">
                                                  <Link
                                                    href={`/product-category/${hoveredCategory.slug}/${subCategory.slug}`}
                                                  >
                                                    {subCategory.name}
                                                  </Link>
                                                </h2>

                                                {/* Sub-subcategories list */}
                                                <ul className="category-list">
                                                  {subCategory
                                                    ?.sub_sub_categories
                                                    ?.length > 0 ? (
                                                    subCategory.sub_sub_categories.map(
                                                      (subSubCategory) => (
                                                        <li
                                                          key={
                                                            subSubCategory.id
                                                          }
                                                          className="items"
                                                        >
                                                          <Link
                                                            href={`/product-category/${hoveredCategory.slug}/${subCategory.slug}/${subSubCategory.slug}`}
                                                          >
                                                            {
                                                              subSubCategory.name
                                                            }
                                                          </Link>
                                                        </li>
                                                      )
                                                    )
                                                  ) : (
                                                    <li>No subcategories</li>
                                                  )}
                                                </ul>
                                              </div>
                                            )
                                          )
                                        ) : (
                                          <p>No categories available</p>
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

              {/* Category Banners */}
              <div className="col-lg-10 d-flex justify-content-start justify-content-xl-between category-banners">
                <Nav defaultActiveKey="/home" as="ul">
                  {concerns.map((item) => (
                    <Nav.Item
                      as="li"
                      key={item.id}
                      onClick={() => handleConcernsProducts(item.slug)}
                    >
                      <Link href={`/concern/${item.slug}`} legacyBehavior>
                        <a className="category-images">
                          <img
                            src={item.image}
                            width="80"
                            height="80"
                            alt={item.name}
                          />
                        </a>
                      </Link>
                      {/* Move Nav.Link outside the Link */}
                      <Nav.Link
                        href={`/concern/${item.slug}`}
                        className="category-text text-truncate"
                        title={item.name}
                      >
                        {item.name}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {concernsProduct?.popups && (
        <PopupModal
          show={modalCategoryPopupShow}
          onHide={closeCategoryPopupModal}
          popupData={concernsProduct.popups}
        />
      )}
    </>
  );
}
