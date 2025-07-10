import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "react-caroussel/dist/index.css";
import { Helmet } from 'react-helmet-async';
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useParams } from "react-router-dom";
import ScrollToTop from '../../../../src/views/ScrollToTop';
import calendar from "../../../assets/images/calendar.svg";
import housechimney from "../../../assets/images/house-chimney.png";
import user from "../../../assets/images/user.svg";
import user_icon from "../../../assets/images/user_icon.svg";
import CarouselSlider from "../../../components/CarouselSlider";
import "../../../css/blog.css";
import { fetchApproveBlogsCommentList, fetchBlogBySlug, fetchBlogsList, postComment } from "../../../redux/action";
import BlogsHeader from "../../../views/BlogsHeader";
import Footer from "../../../views/Footer";



export default function BlogDetailsPage() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({})

  const { blogSlug } = useParams();
  const [blogData, setBlogData] = useState({});
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [concernBlogs, setConcernBlogs] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  useEffect(() => {
    fetchBlogBySlug(blogSlug).then((blogRes) => {
      if (blogRes) {
        setBlogData(blogRes);
      }
    });
  }, [blogSlug]);

  useEffect(() => {
    if (blogData?.category_id) {
      const query = {};
      query.pageSize = 4;
      query.page = 1;
      query.category_id = blogData?.category_id;
      fetchBlogsList(query).then((res) => {
        if (res?.blogs) setRelatedBlogs(res?.blogs);
      });
    }
  }, [blogData?.category_id]);

  useEffect(() => {
    if (blogData?.concern_id) {
      const query = {};
      query.pageSize = 4;
      query.page = 1;
      query.concern_id = blogData?.concern_id;
      fetchBlogsList(query).then((res) => {
        if (res?.blogs) setConcernBlogs(res?.blogs);
      });
    }
  }, [blogData?.concern_id]);


  const [listApproved, setListApproved] = useState([])
  useEffect(() => {
    if (blogData?.id) {
      fetchApproveBlogsCommentList(blogData?.id).then((res) => {

        if (res && res?.results?.length > 0) {
          setListApproved(res?.results)
        }

      });
    }

  }, [blogData])

  const onBlogComment = (e) => {

    const payload = {
      ...e,
      blogId: blogData?.id
    }
    postComment(payload)
    reset()
  }
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
  const modifiedContent = blogData?.content?.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ');
  const modifiedContent1 = blogData?.content1?.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ');

  return (
    <>
      <Helmet>
        <title>{blogData?.title}</title>
        <meta name="description" content={blogData?.description} />
        <meta name="keywords" content={blogData?.keywords} />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cureka" />
        <meta property="og:description" content={blogData?.description} />
        <meta property="og:image" content={blogData?.thumbnail_image} />

      </Helmet>
      <BlogsHeader />
      <div className="container">
        <div className="d-flex home-back-section pt-1">
          <Link to="{pagePaths.home}">
            <img
              className="img-fluid d-flex align-self-center"
              src={housechimney}
              width="16px"
              height="16px"
              alt="home-icon"
            />
          </Link>
          <p className="section mb-0 ml-2">
            <a className="section" href={`/blogs`} target="_blank"> / Blog </a> / <a className="section" href={`/blogs/${blogData.url}`} target="_blank">
              {blogData.title}
            </a>
          </p>
        </div>
        {/* <h1 style={{ display: 'none' }}>{blogData.title}</h1> */}
        <div className="bottom-border"></div>

        <div className="">
          <div className="row">
            <div className="col-lg-9 image-space">
              <img src={blogData.image} className="img-fluid blogDetailsImage" alt="blog_image" />

              <div className="d-flex image-space user-space">
                <img
                  src={calendar}
                  width="20px"
                  height="20px"
                  className="img-fluid"
                  alt="calendar"
                />

                <p className="blog-user align-self-center mb-0">
                  {dayjs(blogData.blog_date).format("DD MMMM, YYYY")}
                </p>

                <div className="date-border"></div>

                <img src={user} width="20px" height="20px" className="img-fluid" alt="user" />

                <p className="blog-user align-self-center mb-0">By Cureka Admin</p>
              </div>

              {/* <h2 className="health">{blogData.category_name}</h2> */}

              <h1 className="choose">{blogData.title}</h1>
              <div
                className="choose-wrapper"
                dangerouslySetInnerHTML={{ __html: modifiedContent }}
              ></div>
              <div
                className="choose-wrapper"
                dangerouslySetInnerHTML={{ __html: modifiedContent1 }}
              ></div>

              <div className="comment-section">
                <p className="comment">{listApproved?.length} Comments</p>

                {listApproved?.length > 0 && listApproved?.map((res, i) => {
                  return (<div className="d-flex usergaps">
                    <img
                      className="img-fluid align-self-start"
                      src={user_icon}
                      width="26px"
                      height="22px"
                      alt="user_icon"
                    />
                    <div className="">
                      <p className="user-name">{res?.user_name}</p>

                      <p className="comment-date">{res?.approved_at}</p>

                      <p className="comment-para">
                        {res?.comment}
                      </p>
                    </div>
                  </div>)
                })}

                {/* <div className="d-flex usergaps user-leftspace">
                  <img
                    className="img-fluid align-self-start"
                    src={user_icon}
                    width="26px"
                    height="22px"
                    alt="user_icon"
                  />

                  <div>
                    <p className="user-name">Cureka Admin</p>

                    <p className="comment-date">February 11, 2023 at 11:16 pm</p>

                    <p className="comment-para">
                      Home workouts are fine if you can do them with high intensity
                    </p>
                  </div>
                </div>

                <div className="d-flex usergaps">
                  <img
                    className="img-fluid align-self-start"
                    src={user_icon}
                    width="26px"
                    height="22px"
                    alt="user_icon"
                  />

                  <div>
                    <p className="user-name">Emilia Clarke</p>

                    <p className="comment-date">February 11, 2023 at 10:16 pm</p>

                    <p className="comment-para">
                      Can I maintain a good physics with mass gainer by home workouts and morning
                      only or hitting the gym is compulsory ?
                    </p>
                  </div>
                </div>

                <div className="d-flex usergaps user-leftspace">
                  <img
                    className="img-fluid align-self-start"
                    src={user_icon}
                    width="26px"
                    height="22px"
                    alt="user_icon"
                  />

                  <div>
                    <p className="user-name">Cureka Admin</p>

                    <p className="comment-date">February 11, 2023 at 11:16 pm</p>

                    <p className="comment-para">
                      Home workouts are fine if you can do them with high intensity
                    </p>
                  </div>
                </div>

                <div className="d-flex usergaps">
                  <img
                    className="img-fluid align-self-start"
                    src={user_icon}
                    width="26px"
                    height="22px"
                    alt="user_icon"
                  />

                  <div>
                    <p className="user-name">Emilia Clarke</p>

                    <p className="comment-date">February 11, 2023 at 10:16 pm</p>

                    <p className="comment-para">
                      I am using mb weight gainer 2 scoop daily will this have any effect on my
                      kidney . Does it contain alot protein?
                    </p>
                  </div>
                </div>

                <div className="d-flex usergaps user-leftspace">
                  <img
                    className="img-fluid align-self-start"
                    src={user_icon}
                    width="26px"
                    height="22px"
                    alt="user_icon"
                  />

                  <div>
                    <p className="user-name">Cureka Admin</p>

                    <p className="comment-date">February 11, 2023 at 11:16 pm</p>

                    <p className="comment-para">
                      {
                        '"The first step to gaining weight or putting on mass is to calculate the number of calories that you require to achieve your goal, and the second step is to calculate the number of calories that you are consuming. In this way, you will be able to fulfil the remaining calories from the weight gainer you are using. Also, do not consume more than 1.5-1.8 grams of protein per kilogram of your body weight. You won\'t experience any side effects if you stay within the recommended dosage and manage calories properly"'
                      }
                    </p>
                  </div>
                </div> */}
              </div>

              <div className="reply-form">
                <form onSubmit={handleSubmit(onBlogComment)}>
                  <p className="comment">Leave a Reply</p>

                  <p className="choose-para">
                    Your email address will not be published. Required fields are marked
                    <span className="required-star">*</span>
                  </p>

                  <div className="row" id="reply-form">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="message" htmlFor="message">
                          Comment<span className="required-star">*</span>
                        </label>

                        <textarea
                          className="form-control"
                          style={{ height: "130" }}
                          {...register('comment', { required: 'Comment is required.' })}
                          name="comment"
                          placeholder=" Write here..."
                          id="comment"
                          cols="10"
                          rows="6"
                        />


                        {errors && errors?.comment && <small className="text-danger">{errors?.comment?.message}</small>}
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="firstname" htmlFor="name">
                          Name<span className="required-star">*</span>
                        </label>

                        <input
                          className="form-control"
                          id="user_name"
                          name="user_name"
                          {...register('user_name', { required: 'Name is required.' })}

                          placeholder="Enter your name"
                        />
                        {errors && errors?.user_name && <small className="text-danger">{errors?.user_name?.message}</small>}

                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="email" htmlFor="email">
                          Email<span className="required-star">*</span>
                        </label>

                        <input
                          className="form-control"
                          id="user_email"
                          type='email'
                          name="user_email"
                          {...register('user_email', { required: 'Email is required.' })}

                          placeholder="Enter your mail address"
                        />
                        {errors && errors?.user_email && <small className="text-danger">{errors?.user_email?.message}</small>}

                      </div>
                    </div>
                  </div>

                  <div className="submit-top">
                    <button type='submit' style={{ border: 'none' }}>
                      <a className="text-decaration-none readmore">Submit Comment</a>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-3 px-lg-0 col-space">
              <div className="blogs">
                <h2 className="blog-head">Related Blogs</h2>
                {!!relatedBlogs?.length &&
                  relatedBlogs.map((blog) => {
                    return (

                      <a
                        href={`/blogs/${blog.url}`}
                        key={blog.id}
                        target="_blank"
                        className="releate"
                        rel="noreferrer"
                      >
                        <img
                          className="img-fluid related-img"
                          src={blog.thumbnail_image}
                          alt="blog4"
                        />

                        <div className="d-flex releate-blog">
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

                          <p className="blog-user align-self-center mb-0">Admin</p>
                        </div>



                        <h3 className="protein">{blog.title}</h3>

                        <div className="bottom-border blog-bottom-space"></div>
                      </a>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 px-lg-0">
              <div className="bottom-border d-lg-block d-none"></div>

              <h2 className="comment">You may also like</h2>
            </div>
          </div>

          <div className="liked-products mb-5">
            <div className="row">

              <div className="col-lg-12 px-lg-0 blog-home">
                <div id="likedproducts">
                  {/* <CarouselSlider settings={{ slidesToShow: isMobile ? 2 : 3 }}>
                    {!!concernBlogs?.length &&
                      concernBlogs?.map((blog) => {
                        return (
                          <>
                            <div className="item mr-3">
                              <Link to={`/blogs/${blog.url}`} key={blog.id} className="item mb-4">
                                <img
                                  className="img-fluid"
                                  src={blog.thumbnail_image}
                                  width="380px"
                                  height="228px"
                                  alt="blogone"
                                />

                                <div className="d-flex owl-topspace">
                                  <img
                                    className="img-fluid"
                                    src={calendar}
                                    width="20px"
                                    height="20px"
                                    alt="calendar"
                                  />

                                  <p className="blog-user mb-0">
                                    {" "}
                                    {dayjs(blog.blog_date).format("DD MMMM, YYYY")}
                                  </p>

                                  <div className="date-border"></div>

                                  <img
                                    className="img-fluid"
                                    src={user}
                                    width="20px"
                                    height="20px"
                                    alt="user"
                                  />

                                  <p className="blog-user mb-0">By Cureka Admin</p>
                                </div>

                                <h2 className="health">{blog.category_name}</h2>

                                <p className="like-para">{blog.title}</p>

                              </Link>
                            </div>
                          </>
                        );
                      })}
                  </CarouselSlider> */}
                  {concernBlogs?.length > 1 ? (
                    <CarouselSlider settings={{ slidesToShow: isMobile ? 2 : 3 }}>
                      {concernBlogs.map((blog) => (
                        <div className="item mr-3" key={blog.id}>
                          <Link to={`/blogs/${blog.url}`} className="item mb-4">
                            <img
                              className="img-fluid"
                              src={blog.thumbnail_image}
                              width="380px"
                              height="228px"
                              alt="blogone"
                            />
                            <div className="d-flex owl-topspace">
                              <img
                                className="img-fluid"
                                src={calendar}
                                width="20px"
                                height="20px"
                                alt="calendar"
                              />
                              <p className="blog-user mb-0">
                                {dayjs(blog.blog_date).format("DD MMMM, YYYY")}
                              </p>
                              <div className="date-border"></div>
                              <img
                                className="img-fluid"
                                src={user}
                                width="20px"
                                height="20px"
                                alt="user"
                              />
                              <p className="blog-user mb-0">By Cureka Admin</p>
                            </div>

                            <h3 className="like-para">{blog.title}</h3>
                          </Link>
                        </div>
                      ))}
                    </CarouselSlider>
                  ) : (
                    concernBlogs.map((blog) => (
                      <div className="item mr-3" key={blog.id}>
                        <Link to={`/blogs/${blog.url}`} className="item mb-4">
                          <img
                            className="img-fluid"
                            src={blog.thumbnail_image}
                            width="380px"
                            height="228px"
                            alt="blogone"
                          />
                          <div className="d-flex owl-topspace">
                            <img
                              className="img-fluid"
                              src={calendar}
                              width="20px"
                              height="20px"
                              alt="calendar"
                            />
                            <p className="blog-user mb-0">
                              {dayjs(blog.blog_date).format("DD MMMM, YYYY")}
                            </p>
                            <div className="date-border"></div>
                            <img
                              className="img-fluid"
                              src={user}
                              width="20px"
                              height="20px"
                              alt="user"
                            />
                            <p className="blog-user mb-0">By Cureka Admin</p>
                          </div>
                          {/* <h2 className="health">{blog.category_name}</h2> */}
                          <h3 className="like-para">{blog.title}</h3>
                        </Link>
                      </div>
                    ))
                  )}

                </div>
              </div>
            </div>
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
