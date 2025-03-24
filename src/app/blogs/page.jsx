"use client";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import debounce from "lodash/debounce";
import { useEffect, useMemo, useState } from "react";
import "react-caroussel/dist/index.css";
import { Helmet } from "react-helmet-async";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ScrollToTop from "../../views/ScrollToTop";
import calendar from "../../public/images/calendar.svg";
import houseChimney from "../../public/images/house-chimney.png";
import user from "../../public/images/user.svg";
import "../../styles/blog.css";
import { fetchBlogsList } from "../../redux/action";
import BlogsHeader from "../../views/BlogsHeader";
import Footer from "../../views/Footer";

const debouncedFetch = debounce((query, callback) => {
  fetchBlogsList(query).then(callback);
}, 500);

dayjs.extend(isBetween);

const startOfWeek = dayjs().startOf("week");
const endOfWeek = dayjs().endOf("week");

export default function BlogHomePage() {
  // Use the hook to get search params
  const searchParams = useSearchParams();

  // Check if searchParams is successfully retrieved
  if (!searchParams) {
    return <div>Error: searchParams is not available.</div>;
  }

  const [latestBlog, setLatestBlog] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreBlog, setHasMoreBlog] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedConcern, setSelectedConcern] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const searchTerm = searchParams.get("search_term") || "";

  useEffect(() => {
    const query = {};
    query.pageSize = 4;
    query.page = 1;

    fetchBlogsList(query).then((res) => {
      if (res?.blogs) setLatestBlog(res?.blogs);
    });
  }, []);

  useEffect(() => {
    setBlogs([]);
    setSelectedCategory(null);
  }, [searchTerm]);

  useEffect(() => {
    const query = {};
    query.pageSize = 8;
    query.page = page;
    if (searchTerm) {
      query.search_term = searchTerm;
    }
    setLoading(true);
    debouncedFetch(query, (res) => {
      setLoading(false);
      if (res?.blogs.length) {
        setBlogs((p) => [...p, ...res.blogs]);
      }
      if (res?.pagination?.currentPage < res?.pagination?.totalPages) {
        setHasMoreBlog(true);
      } else {
        setHasMoreBlog(false);
      }
    });
  }, [page, searchTerm]);

  const blogsInCurrentWeek = latestBlog
    .filter((obj) => {
      const objDate = dayjs(obj.created_at);
      return objDate.isBetween(startOfWeek, endOfWeek, null, "[]");
    })
    .slice(0, 2);

  const trendingBlogs = latestBlog.slice(0, 3);

  const onLoadMoreClicked = () => {
    setPage((p) => p + 1);
  };

  const blogCategoryWise = useMemo(() => {
    if (blogs?.length) {
      return blogs.reduce((acc, item) => {
        if (acc[item.category_name]) {
          acc[item.category_name].push(item);
        } else {
          acc[item.category_name] = [item];
        }
        return acc;
      }, {});
    }
    return {};
  }, [blogs]);

  const blogConcernWise = useMemo(() => {
    if (blogs?.length) {
      return blogs.reduce((acc, item) => {
        if (acc[item.concern_name]) {
          acc[item.concern_name].push(item);
        } else {
          acc[item.concern_name] = [item];
        }
        return acc;
      }, {});
    }
    return {};
  }, [blogs]);

  console.log({ blogConcernWise });

  const onConcernSelect = (concern) => {
    setSelectedConcern(concern);
  };

  const onCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <Helmet>
        <title>Blogs - Cureka</title>
        <meta
          name="description"
          content="Explore Cureka's blog for insightful advice and tips on skincare, haircare routines and more. Keep following our blog for more contents."
        />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cureka" />
        <meta
          property="og:description"
          content="Explore Cureka's blog for insightful advice and tips on skincare, haircare routines and more. Keep following our blog for more contents."
        />
        <meta
          property="og:image"
          content="https://frontend.cureka.com/src/assets/images/logo.svg"
        />
      </Helmet>
      <BlogsHeader />
      <div className="container-fluid px-0">
        <div className="container">
          <div className="d-flex home-back-section pt-lg-4 pt-1">
            <Link href="/">
              <img
                className="img-fluid d-flex align-self-center"
                src={houseChimney}
                width="16px"
                height="16px"
                alt="home-icon"
              />
            </Link>

            <p className="section mb-0 ml-2">/ Blog</p>
          </div>
        </div>

        <div className="bottom-border"></div>

        <div className="container">
          {!searchTerm && (
            <div className="row">
              <div className="col-lg-12 px-lg-0 blog-home">
                <div id="blog-page">
                  <Carousel showArrows={false} showStatus={false} infiniteLoop>
                    {!!latestBlog?.length &&
                      latestBlog?.map((blog) => {
                        return (
                          <div>
                            <Link
                              // href={`/blogs/${blog.url}`}
                              key={blog.id}
                              className="text-decoration-none banner-container"
                              href="blogdetails"
                              target="_blank"
                            >
                              <div className="item blog-overlay">
                                <img
                                  src={blog.thumbnail_image}
                                  style={{ width: "100%", height: "390px" }}
                                  className="img-fluid object-fit-fill banner-img"
                                />
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                  </Carousel>
                </div>
              </div>
            </div>
          )}

          {!searchTerm && (
            <>
              <h1 className="doctors-heading mb-1 font-weight-bold text-center">
                Cureka: Blogs
              </h1>
              <div className="row m-0">
                <h2 className="trending-blog">Trending Blog</h2>
              </div>
              <div className="row recent-blog" id="blog-card">
                {!!trendingBlogs?.length &&
                  trendingBlogs?.map((blog, index) => {
                    return (
                      <div
                        key={blog.id}
                        className={`col-lg-4 col-md-6 ${
                          index !== 0 ? "blog-space" : ""
                        }`}
                      >
                        <div className="blog-img">
                          <img
                            src={blog.thumbnail_image}
                            className="img-fluid object-fit-fill mx-auto d-block"
                            alt="blog2"
                          />
                        </div>

                        <div className="">
                          <div className="card-body">
                            <div className="d-flex">
                              <img
                                src={user}
                                width="14px"
                                height="14px"
                                className="img-fluid"
                                alt="user"
                              />

                              <p className="user mb-0">Admin</p>

                              <div className="left-border"></div>

                              <img
                                src={calendar}
                                width="14px"
                                height="14px"
                                className="img-fluid"
                                alt="calendar"
                              />

                              <p className="user mb-0">
                                {dayjs(blog.blog_date).format("DD MMMM, YYYY")}
                              </p>
                            </div>

                            <h3 className="blog-heading">{blog.title}</h3>

                            <Link
                              href={`/blogs/${blog.url}`}
                              className="text-decoration-none readmore"
                              target="_blank"
                            >
                              Read More
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="row m-0">
                <h2 className="trending-blog">Latest Blog</h2>
              </div>
              <div className="row">
                {latestBlog?.[0] && (
                  <Link
                    href={`/blogs/${latestBlog?.[0]?.url}`}
                    target="_blank"
                    className="col-lg-6"
                  >
                    <img
                      src={latestBlog?.[0]?.image}
                      className="img-fluid"
                      width="580px"
                      height="348px"
                      alt="weeklyblog3"
                    />

                    <div className="d-flex image-space user-space">
                      <img
                        src={calendar}
                        width="20px"
                        height="20px"
                        className="img-fluid"
                        alt="calendar"
                      />

                      <p className="blog-user align-self-center mb-0">
                        {dayjs(latestBlog?.[0]?.blog_date).format(
                          "DD MMMM, YYYY"
                        )}
                      </p>

                      <div className="date-border"></div>

                      <img
                        src={user}
                        width="20px"
                        height="20px"
                        className="img-fluid"
                        alt="user"
                      />

                      <p className="blog-user align-self-center mb-0">
                        By Cureka Admin
                      </p>
                    </div>

                    {/* <h2 className="health">{latestBlog?.[0]?.category_name}</h2> */}

                    <h3 className="like-heading">{latestBlog?.[0]?.title}</h3>

                    <p className="like-para">{latestBlog?.[0]?.description}</p>
                  </Link>
                )}

                <div className="col-lg-6 mt-4">
                  {!!latestBlog?.length &&
                    latestBlog?.map((blog, index) => {
                      if (index === 0) {
                        return null;
                      }
                      return (
                        <Link
                          href={`/blogs/${blog.url}`}
                          key={blog.id}
                          className="releate d-lg-flex d-flex-column  mb-3"
                          target="_blank"
                        >
                          <div className="releate-img">
                            <img
                              className="img-fluid"
                              src={blog.thumbnail_image}
                              alt="blog4"
                            />
                          </div>

                          <div className="blog-left">
                            <div className="d-flex releate-blog align-self-center">
                              <img
                                src={calendar}
                                width="14px"
                                height="14px"
                                className="img-fluid"
                                alt="calendar"
                              />

                              <p className="blog-user align-self-center mb-0">
                                {dayjs(blog.blog_date).format("DD/MM/YYYY")}
                              </p>

                              <div className="date-border"></div>

                              <img
                                src={user}
                                width="14px"
                                height="14px"
                                className="img-fluid"
                                alt="user"
                              />

                              <p className="blog-user align-self-center mb-0">
                                Admin
                              </p>
                            </div>

                            {/* <h2 className="health">{blog.category_name}</h2> */}

                            <h3 className="protein">{blog.title}</h3>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
              <div className="row m-0">
                <h2 className="trending-blog mb-3">Explore by Category</h2>
              </div>
              <div className="d-lg-flex flex-wrap d-flex-column mb-4">
                <div className="facewash-space">
                  <button
                    onClick={() => onCategorySelect(null)}
                    className={`text-decoration-none ${
                      !selectedCategory ? "reorder-btn" : "face-btn"
                    }`}
                  >
                    All
                  </button>
                </div>
                {!!Object.keys(blogCategoryWise).length &&
                  Object.keys(blogCategoryWise).map((label) => {
                    return (
                      <div
                        onClick={() => onCategorySelect(label)}
                        key={label}
                        className="facewash-space explore-left"
                      >
                        <button
                          className={`text-decoration-none ${
                            selectedCategory === label
                              ? "reorder-btn"
                              : "face-btn"
                          }`}
                        >
                          {label}
                        </button>
                      </div>
                    );
                  })}
              </div>
            </>
          )}

          <div className="row mt-5 mb-lg-5 mb-2">
            {(
              (selectedCategory
                ? !!blogCategoryWise[selectedCategory]?.length &&
                  blogCategoryWise[selectedCategory]
                : blogs?.length && blogs) || []
            )?.map((blog) => {
              return (
                <Link
                  href={`/blogs/${blog.url}`}
                  key={blog.id}
                  target="_blank"
                  className="col-lg-6"
                >
                  <div className="releate d-lg-flex d-flex-column  mb-3">
                    <div className="releate-img">
                      <img
                        className="img-fluid"
                        src={blog.thumbnail_image}
                        width="280px"
                        height="168px"
                        alt="blog7"
                      />
                    </div>

                    <div className="blog-left">
                      <div className="d-flex releate-blog align-self-center">
                        <img
                          src={calendar}
                          width="14px"
                          height="14px"
                          className="img-fluid"
                          alt="calendar"
                        />

                        <p className="blog-user align-self-center mb-0">
                          {dayjs(blog.blog_date).format("DD/MM/YYYY")}
                        </p>

                        <div className="date-border"></div>

                        <img
                          src={user}
                          width="14px"
                          height="14px"
                          className="img-fluid"
                          alt="user"
                        />

                        <p className="blog-user align-self-center mb-0">
                          Admin
                        </p>
                      </div>

                      {/* <h2 className="health">{blog.category_name}</h2> */}

                      <h3 className="protein">{blog.title}</h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {!searchTerm && (
            <>
              <div className="row m-0">
                <h2 className="trending-blog mb-3 mt-0">Explore by Concern</h2>
              </div>

              <div className="d-lg-flex flex-wrap d-flex-column mb-4">
                <div className="facewash-space">
                  <button
                    onClick={() => onConcernSelect(null)}
                    className={`text-decoration-none ${
                      !selectedConcern ? "reorder-btn" : "face-btn"
                    }`}
                  >
                    All
                  </button>
                </div>
                {!!Object.keys(blogConcernWise).length &&
                  Object.keys(blogConcernWise).map((label) => {
                    return (
                      <div
                        onClick={() => onConcernSelect(label)}
                        key={label}
                        className="facewash-space explore-left"
                      >
                        <button
                          className={`text-decoration-none ${
                            selectedConcern === label
                              ? "reorder-btn"
                              : "face-btn"
                          }`}
                        >
                          {label}
                        </button>
                      </div>
                    );
                  })}
              </div>

              <div className="row mt-5 mb-lg-5 mb-2">
                {(
                  (selectedConcern
                    ? !!blogConcernWise[selectedConcern]?.length &&
                      blogConcernWise[selectedConcern]
                    : blogs?.length && blogs) || []
                )?.map((blog) => {
                  return (
                    <Link
                      href={`/blogs/${blog.url}`}
                      key={blog.id}
                      target="_blank"
                      className="col-lg-6"
                    >
                      <div className="releate d-lg-flex d-flex-column  mb-3">
                        <div className="releate-img">
                          <img
                            className="img-fluid"
                            src={blog.thumbnail_image}
                            width="280px"
                            height="168px"
                            alt="blog7"
                          />
                        </div>

                        <div className="blog-left">
                          <div className="d-flex releate-blog align-self-center">
                            <img
                              src={calendar}
                              width="14px"
                              height="14px"
                              className="img-fluid"
                              alt="calendar"
                            />

                            <p className="blog-user align-self-center mb-0">
                              {dayjs(blog.blog_date).format("DD/MM/YYYY")}
                            </p>

                            <div className="date-border"></div>

                            <img
                              src={user}
                              width="14px"
                              height="14px"
                              className="img-fluid"
                              alt="user"
                            />

                            <p className="blog-user align-self-center mb-0">
                              Admin
                            </p>
                          </div>

                          {/* <h2 className="health">{blog.category_name}</h2> */}

                          <h3 className="protein">{blog.title}</h3>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}

          <div className="row mb-5 justify-content-center">
            {hasMoreBlog && (
              <button
                disabled={loading}
                onClick={onLoadMoreClicked}
                className="text-decoration-done cursor-pointer rate-btn"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
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
