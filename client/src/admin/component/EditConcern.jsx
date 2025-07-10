import "draft-js/dist/Draft.css";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import api from "../../utils/api.utils";
import DraftEditor from "../common/DraftEditor";

const EditConcern = () => {
  const [title, setTitle] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [concern_id, setConcern_id] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [canonical_url, setCanonical_url] = useState("");
  const [og_tag, setOg_tag] = useState("");
  const [keywords, setKeywords] = useState("");
  const [content, setContent] = useState();
  const [content1, setContent1] = useState("");
  const [concern_date, setConcern_date] = useState("");
  const [image, setImage] = useState(null);
  const unique_id = uuid();
  const [postStatus, setPostStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value, "change");
    setConcern_date(new Date().toLocaleString());
    setCategory_id(Math.round(Math.random() * 1000));
    setConcern_id(unique_id.slice(0, 8));
    setUrl("sample_concern_url");
    setDescription("sample descriptioon");
    setCanonical_url("sample_url");
    setOg_tag("sample_og_tag");
    setKeywords("sample_keyword1, sample_keyword2");
    setContent1("Additional content");
    if (name === "title") setTitle(value);
    else if (name === "content") setContent(value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target, "form");
    const data = {
      category_id,
      concern_id,
      title,
      image,
      url,
      description,
      canonical_url,
      og_tag,
      keywords,
      content,
      content1,
      concern_date,
    };

    try {
      const response = await api.post("/concerns/1", data);

      if (response.status === 201) {
        // Concern post created successfully
        setPostStatus("Concern post created successfully.");
      } else {
        // Handle error response
        setPostStatus("Error: Unable to create concern post.");
      }
    } catch (error) {
      // Handle network error or other errors
      setPostStatus("Error: " + error.message);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div>
      <div className="change_form container">
        {/* <h3>Create Concern</h3> */}

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
            <div className="fields">
              <label className="label_fields">Status: </label>
              <select
                className="form-select w-50"
                aria-label="Default select example"
                onChange={handleInputChange}
              >
                <option value="active" selected>
                  Active
                </option>
                <option value="inactive">In active</option>
              </select>
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
      {postStatus && <p>{postStatus}</p>}
    </div>
  );
};

export default EditConcern;
