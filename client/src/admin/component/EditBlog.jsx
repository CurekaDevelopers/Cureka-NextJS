import "draft-js/dist/Draft.css";
import { useState } from "react";
import api from "../../utils/api.utils";
import DraftEditor from "../common/DraftEditor";

const EditBlog = ({ blogId, sendDataToParent }) => {
  const [title, setTitle] = useState("");
  // const [category_id, setCategory_id] = useState(1);
  // const [concern_id, setConcern_id] = useState(2);
  // const [url, setUrl] = useState("");
  // const [description, setDescription] = useState("");
  // const [canonical_url, setCanonical_url] = useState("");
  // const [og_tag, setOg_tag] = useState("");
  // const [keywords, setKeywords] = useState("");
  const [content, setContent] = useState();
  // const [content1, setContent1] = useState("");
  // const [blog_date, setBlog_date] = useState("");
  const [, setImage] = useState("sample_image_url.jpg");
  // const unique_id = uuid();
  const [receivedBlogId] = useState(blogId || null);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [dataToSend] = useState(false);

  const handleInputChange = (e) => {
    const { value } = e.target;
    console.log(e.target.value, "change");
    // setBlog_date(
    //   new Date()
    //     .toLocaleString("en-US", {
    //       year: "numeric",
    //       month: "2-digit",
    //       day: "2-digit",
    //     })
    //     .replace(/\//g, "-"),
    // );
    // setCategory_id(Math.round(Math.random() * 1000));
    // setCategory_id(1);
    // setConcern_id(2);
    // // setConcern_id(unique_id.slice(0, 8));
    // setUrl("sample_blog_url");
    // setDescription("sample descriptioon");
    // setCanonical_url("sample_url");
    // setOg_tag("sample_og_tag");
    // setKeywords("sample_keyword1, sample_keyword2");
    // setContent1("Additional content");
    setTitle(value);
    setContent(value);
  };

  const dummy = {
    category_id: 1,
    concern_id: 2,
    title: "Updated Sample Blog",
    image: "sample_image_url",
    url: "sample_blog_url",
    description: "This is a sample blog.",
    canonical_url: "sample_canonical_url",
    og_tag: "sample_og_tag",
    keywords: "sample_keyword1, sample_keyword2",
    content: "Sample blog content",
    content1: "Additional content",
    blog_date: "2023-12-15",
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target, "form");
    // const data = {
    //   category_id,
    //   concern_id,
    //   title,
    //   image,
    //   url,
    //   description,
    //   canonical_url,
    //   og_tag,
    //   keywords,
    //   content,
    //   content1,
    //   blog_date,
    // };

    try {
      const response = await api.put(`/update-blog/${receivedBlogId}`, dummy);

      console.log(response, "error");
      if (response.status === 200) {
        setShow(true);
        setMsg(response.data.message);
        setTimeout(() => {
          sendDataToParent(dataToSend);
        }, 1000);
      } else {
        setShow(false);
        setMsg(response.error);
      }
    } catch (error) {
      console.log(error, "error");
      setShow(false);
      setMsg(error.response.data.error);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div>
      <div className="change_form container mt-0">
        {/* <h3>Create Blog</h3> */}

        {msg && show ? (
          <>
            <div className="alert alert-success alert-dismissible mt-4 w-50">
              <button type="button" className="close" data-dismiss="alert">
                &times;
              </button>
              <strong>Success!</strong> {msg}
            </div>
          </>
        ) : null}
        {msg && !show && (
          <>
            <div className="alert alert-success alert-dismissible mt-4 w-50">
              <button type="button" className="close" data-dismiss="alert">
                &times;
              </button>
              <strong>Error!</strong> {msg}
            </div>
          </>
        )}
        <br />
        <form onSubmit={handleFormSubmit}>
          <fieldset>
            <div className="fields">
              <label className="label_fields">Title: </label>
              <input
                placeholder="Edit the title"
                type="text"
                name="title"
                value={title}
                onChange={handleInputChange}
                required
              />
            </div>
            <br />
            <div className="fields">
              <label className="label_fields">Content: </label>
              <DraftEditor name="content" value={content} onChange={handleInputChange} />
            </div>
            <br />
            <div className="fields">
              <label className="label_fields">Image: </label>
              <input
                className="image_border"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <br />
            <div className="field margin_btn">
              <button className="main_bt">Create Post</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
