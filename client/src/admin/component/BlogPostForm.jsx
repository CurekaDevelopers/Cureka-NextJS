import "draft-js/dist/Draft.css";
import { useState } from "react";
import api from "../../utils/api.utils";
import DraftEditor from "../common/DraftEditor";

const BrandPostForm = ({ sendDataToParent }) => {
  const [title, setTitle] = useState("");
  // const [category_id, setCategory_id] = useState(0);
  // const [concern_id, setConcern_id] = useState(0);
  // const [url, setUrl] = useState("");
  // const [description, setDescription] = useState("");
  // const [canonical_url, setCanonical_url] = useState("");
  // const [og_tag, setOg_tag] = useState("");
  // const [keywords, setKeywords] = useState("");
  const [content, setContent] = useState("This is the main content of the brand.");
  // const [content1, setContent1] = useState("This is the main content of the brand.");
  // const [brand_date, setBrand_date] = useState("");
  // const [image, setImage] = useState("sample-image.jpg");
  // const unique_id = uuid();
  const [postStatus, setPostStatus] = useState(null);
  const [dataToSend, setDataToSend] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // setBrand_date(
    //   new Date()
    //     .toLocaleString("en-US", {
    //       year: "numeric",
    //       month: "2-digit",
    //       day: "2-digit",
    //     })
    //     .replace(/\//g, "-"),
    // );
    // setCategory_id(Math.round(Math.random() * 1000));
    // setConcern_id(unique_id.slice(0, 8));
    // setUrl("sample_brand_url");
    // setDescription("sample description");
    // setCanonical_url("http://canonical-url.com");
    // setOg_tag("sample_og_tag");
    // setKeywords("sample_keyword1, sample_keyword2");
    // setContent1("Additional content");
    if (name === "title") setTitle(value);
    else if (name === "content") setContent(value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target, "form");
    const data = {
      category_id: 1,
      concern_id: 2,
      title: "Sample Brand",
      image: "sample-image.jpg",
      url: "http://sample-brand-url.com",
      description: "This is a sample brand description.",
      canonical_url: "http://canonical-url.com",
      og_tag: "sample-og-tag",
      keywords: "sample, keywords, brand",
      content: "This is the main content of the brand.",
      content1: "This is additional content.",
      brand_date: "2023-11-13",
    };

    try {
      const response = await api.post("/create-brand", data);
      console.log(response, "res");
      if (response.status === 201) {
        // Brand post created successfully
        setPostStatus("Brand post created successfully.");
        setTimeout(() => {
          setDataToSend(false);
          sendDataToParent(dataToSend);
        }, 1000);
      } else {
        // Handle error response
        setPostStatus("Error: Unable to create brand post.");
      }
    } catch (error) {
      // Handle network error or other errors
      setPostStatus("Error: " + error.message);
    }
  };
  const handleImageChange = () => {
    // const file = e.target.files[0];
    // setImage("file");
  };

  return (
    <div>
      <div className="change_form container mt-0">
        {/* <h3>Create Brand</h3> */}
        {postStatus && (
          <div className="alert alert-success alert-dismissible mt-4 w-50">
            <button type="button" className="close" data-dismiss="alert">
              &times;
            </button>
            {postStatus}
          </div>
        )}
        <br />
        <form onSubmit={handleFormSubmit}>
          <fieldset>
            <div className="fields">
              <label className="label_fields_thumbnail">Category List: </label>
              <select type="text" name="data[cat_id]" className="fields_option">
                <option value="">Select Category</option>
                <option value="8">Nutrition</option>
                <option value="7">Joint Pains</option>
                <option value="6">Hair Care</option>
                <option value="5">Toys</option>
                <option value="4">Ayurveda</option>
                <option value="2">Skin</option>
              </select>
            </div>
            <br />

            <div className="fields">
              <label className="label_fields_thumbnail">Thumbnail Image: </label>
              <input type="file" name="thumb_image" className="image_border" accept="image/*" />
              <p style={{ color: "#ff0000" }} id="note">
                <strong>Note* : </strong> Image Size Shoud Be 250 * 100
              </p>
              <p id="ads-pic-error" className="error" htmlFor="user_mobile"></p>
            </div>
            <br />

            <div className="fields">
              <label className="label_fields_thumbnail">Blog Title: </label>
              <input
                placeholder="Enter the title"
                type="text"
                name="title"
                value={title}
                onChange={handleInputChange}
                required
              />
            </div>
            <br />

            <div className="fields">
              <label className="label_fields_thumbnail">Blog URL: </label>
              <input type="text" name="data[blog_url]" value="" />
            </div>
            <br />
            <div className="fields">
              <label className="label_fields_thumbnail">Blog Description: </label>
              <input type="text" name="data[blog_description]" />
            </div>
            <br />
            <div className="fields">
              <label className="label_fields_thumbnail">Canonical: </label>
              <input type="text" name="data[canonical]" value="" />
            </div>
            <br />
            <div className="fields">
              <label className="label_fields_thumbnail">Og Tag: </label>
              <input type="text" name="data[og_tag]" value="" />
            </div>
            <br />
            <div className="fields">
              <label className="label_fields_thumbnail">Keywords: </label>
              <input type="text" name="data[keywords]" value="" />
            </div>
            <br />
            <div className="fields">
              <label className="label_fields">Content: </label>
              {/* <textarea
                      name="content"
                      value={content}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: "400px",
                        height: "100px",
                        border: "none",
                      }}
                    /> */}
              <DraftEditor name="content" value={content} onChange={handleInputChange} />
            </div>
            <br />
            <div className="fields">
              <label className="label_fields_thumbnail">Blog Date: </label>
              <input type="date" name="data[blog_date]" value="" />
            </div>
            <br />
            <div className="fields">
              <label className="label_fields_thumbnail">Blog Image: </label>
              <input
                className="image_border"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <br />
            <div className="fields">
              <label className="label_fields">Content 1: </label>
              {/* <textarea
                      name="content"
                      value={content}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: "400px",
                        height: "100px",
                        border: "none",
                      }}
                    /> */}
              <DraftEditor name="content" value={content} onChange={handleInputChange} />
            </div>
            <br />
            <div className="fields">
              <label className="label_fields">Content 2: </label>
              {/* <textarea
                      name="content"
                      value={content}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: "400px",
                        height: "100px",
                        border: "none",
                      }}
                    /> */}
              <DraftEditor name="content" value={content} onChange={handleInputChange} />
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

export default BrandPostForm;
