import * as Yup from "yup";

const fileMaxSize = 5 * 1024 * 1024;

const thumbnailImageResolution = {
  height: 400,
  width: 1000,
};

const urlSlugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const validationSchema = Yup.object().shape({
  category_id: Yup.number().required("Please select a category"),
  concern_id: Yup.number().required("Please select a concern"),
  title: Yup.string().required("Title is required"),
  popularity: Yup.string(),
  url: Yup.string()
    .matches(
      urlSlugRegex,
      "Invalid URL slug format. Please use only lowercase letters, numbers, and hyphens.",
    )
    .required("Blog URL slug is required"),
  // canonical_url: Yup.string()
  //   .matches(
  //     urlSlugRegex,
  //     "Invalid URL slug format. Please use only lowercase letters, numbers, and hyphens.",
  //   )
  //   .required("Canonical URL slug is required"),
  // og_tag: Yup.string().required("Og Tag is required"),
  // keywords: Yup.string().required("Keywords is required"),
  content: Yup.string().required("Content is required"),
  content1: Yup.string(),
  blog_date: Yup.string().required("Blog date is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test("fileSize", "File size must be less than 5MB", function (value) {
      if (typeof value === "string") {
        return true;
      }

      return value && value.size <= fileMaxSize;
    })
    .test(
      "resolution",
      `Image resolution must be ${thumbnailImageResolution.width} x ${thumbnailImageResolution.height} px.`,
      async function (value) {
        if (typeof value === "string") {
          return true;
        }

        if (!value) return false;
        return true;
        // const file = value;
        // return new Promise((resolve) => {
        //   const reader = new FileReader();
        //   reader.onload = (e) => {
        //     const img = new Image();
        //     img.onload = () => {
        //       resolve(
        //         img.width > thumbnailImageResolution.width &&
        //           img.height > thumbnailImageResolution.height,
        //       );
        //     };
        //     img.src = e.target.result;
        //   };
        //   if (isBlob(file)) reader.readAsDataURL(file);
        // });
      },
    ),
  thumbnail_image: Yup.mixed()
    .required("Image is required")
    .test("fileSize", "File size must be less than 5MB", function (value) {
      if (typeof value === "string") {
        return true;
      }

      return value && value.size <= fileMaxSize;
    })
    .test(
      "resolution",
      `Image resolution must be ${thumbnailImageResolution} x ${thumbnailImageResolution} px.`,
      async function (value) {
        if (typeof value === "string") {
          return true;
        }

        if (!value) return false;
        return true;
        // const file = value;
        // return new Promise((resolve) => {
        //   const reader = new FileReader();
        //   reader.onload = (e) => {
        //     const img = new Image();
        //     img.onload = () => {
        //       resolve(
        //         img.width > thumbnailImageResolution.width &&
        //           img.height > thumbnailImageResolution.height,
        //       );
        //     };
        //     img.src = e.target.result;
        //   };
        //   if (isBlob(file)) reader.readAsDataURL(file);
        // });
      },
    ),
  description: Yup.string().required("Description is required"),
});

export const initialValues = {
  category_id: "",
  title: "",
  image: "",
  thumbnail_image: "",
  url: "",
  description: "",
  canonical_url: "",
  og_tag: "",
  keywords: "",
  content: "",
  content1: "",
  blog_date: "",
  concern_id: "",
  popularity: "",
};