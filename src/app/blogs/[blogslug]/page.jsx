"use client";

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { useParams } from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs";

import ScrollToTop from "../../../views/ScrollToTop";
import BlogsHeader from "../../../views/BlogsHeader";
import Footer from "../../../views/Footer";
import {
  fetchApproveBlogsCommentList,
  fetchBlogBySlug,
  fetchBlogsList,
  postComment,
} from "../../../redux/action";

import calendarIcon from "../../../public/images/calendar.svg";
import houseIcon from "../../../public/images/house-chimney.png";
import userIcon from "../../../public/images/user.svg";
import userAvatar from "../../../public/images/user_icon.svg";
import Image from "next/image";
import ShopHeader from "@/views/Header/ShopHeader";

const BlogDetailsPage = () => {
  const params = useParams();
  console.log("params",params);  
  const blogSlug = params?.blogslug;
  console.log("blogSlug", blogSlug);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [blogData, setBlogData] = useState({});
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [concernBlogs, setConcernBlogs] = useState([]);
  const [listApproved, setListApproved] = useState([]);
  const [currentURL, setCurrentURL] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Fetch Blog Data
  useEffect(() => {
    fetchBlogBySlug(blogSlug).then((blogRes) => {
      console.log("Blog slug",blogRes);
      
      if (blogRes) setBlogData(blogRes);
    });
  }, [blogSlug]);

  // Fetch Related Blogs
  useEffect(() => {
    if (blogData?.category_id) {
      fetchBlogsList({
        pageSize: 4,
        page: 1,
        category_id: blogData.category_id,
      }).then((res) => setRelatedBlogs(res?.blogs || []));
    }
  }, [blogData.category_id]);

  // Fetch Concern Blogs
  useEffect(() => {
    if (blogData?.concern_id) {
      fetchBlogsList({
        pageSize: 4,
        page: 1,
        concern_id: blogData.concern_id,
      }).then((res) => setConcernBlogs(res?.blogs || []));
    }
  }, [blogData.concern_id]);

  // Fetch Approved Comments
  useEffect(() => {
    if (blogData?.id) {
      fetchApproveBlogsCommentList(blogData.id).then((res) =>
        setListApproved(res?.results || [])
      );
    }
  }, [blogData]);

  // Get Current URL
  useEffect(() => {
    setCurrentURL(window.location.href);
  }, []);
  // Scroll Visibility Handler
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Comment Submission
  const onBlogComment = (data) => {
    postComment({ ...data, blogId: blogData?.id });
    reset();
  };
  useEffect(() => {
    setCurrentURL(window.location.href);
  }, []);

  return (
    <>
      <Helmet>
        <title>{blogData?.title}</title>
        <meta name="description" content={blogData?.description} />
        <meta name="keywords" content={blogData?.keywords} />
        <link rel="canonical" href={currentURL} />
        <meta property="og:url" content={currentURL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cureka" />
        <meta property="og:description" content={blogData?.description} />
        <meta property="og:image" content={blogData?.thumbnail_image} />
      </Helmet>

      <ShopHeader />

      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="d-flex home-back-section pt-1">
          <Link href="/">
            <Image src={houseIcon} width={16} height={16} alt="home-icon" />
          </Link>
          <p className="section mb-0 ml-2">
            <Link href="/blogs"> / Blog </Link> /{" "}
            <Link href={`/blogs/${blogData?.url}`}>{blogData?.title}</Link>
          </p>
        </div>

        <div className="bottom-border"></div>

        <div className="row">
          <div className="col-lg-9">
            {/* Blog Image */}
            {blogData?.image && (
              <img
                src={blogData.image}
                alt="blog_image"
                width="800px"
                height="400px"
                className="img-fluid blogDetailsImage"
              />
            )}

            {/* Blog Meta Info */}
            <div className="d-flex align-items-center user-space">
              <Image src={calendarIcon} width={20} height={20} alt="calendar" />
              <p className="blog-user mb-0">
                {dayjs(blogData.blog_date).format("DD MMMM, YYYY")}
              </p>

              <div className="date-border"></div>

              <Image src={userIcon} width={20} height={20} alt="user" />
              <p className="blog-user mb-0">By Cureka Admin</p>
            </div>

            {/* Blog Title */}
            <h1 className="choose">{blogData.title}</h1>

            {/* Blog Content */}
            <div
              className="choose-wrapper"
              dangerouslySetInnerHTML={{ __html: blogData?.content }}
            />

            {/* Comments Section */}
            <div className="comment-section">
              <p className="comment">{listApproved.length} Comments</p>
              {listApproved.map((comment, index) => (
                <div className="d-flex usergaps" key={index}>
                  <Image
                    src={userAvatar}
                    width={26}
                    height={22}
                    alt="user_icon"
                  />
                  <div>
                    <p className="user-name">{comment.user_name}</p>
                    <p className="comment-date">{comment.approved_at}</p>
                    <p className="comment-para">{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Form */}
            <div className="reply-form">
              <form onSubmit={handleSubmit(onBlogComment)}>
                <p className="comment">Leave a Reply</p>

                <div className="form-group">
                  <label htmlFor="comment">Comment *</label>
                  <textarea
                    {...register("comment", {
                      required: "Comment is required.",
                    })}
                    className="form-control"
                    placeholder="Write here..."
                    rows="6"
                  />
                  {errors.comment && (
                    <small className="text-danger">
                      {errors.comment.message}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="user_name">Name *</label>
                  <input
                    {...register("user_name", {
                      required: "Name is required.",
                    })}
                    className="form-control"
                    placeholder="Enter your name"
                  />
                  {errors.user_name && (
                    <small className="text-danger">
                      {errors.user_name.message}
                    </small>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary mb-5"
                  style={{ backgroundColor: "#007bff", color: "#fff" }}
                >
                  Submit Comment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {isVisible && <ScrollToTop />}
    </>
  );
};

export default BlogDetailsPage;
