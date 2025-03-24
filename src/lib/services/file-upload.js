import toast from "react-hot-toast";
import api from "../../utils/api.utils";
import { apiUrls } from "../../utils/constants/api.constants";

export const uploadImage = async (file, category, onUploadProgress) => {
  const formData = new FormData();
  if (file) {
    const fileName = file.name;
    const modifiedFileName = fileName.replace(/\.(?=.*\.)/g, "_"); // removes extra dots from filename
    const modifiedFile = new File([file], modifiedFileName, {
      type: file.type,
    });
    formData.append("file", modifiedFile);
  }

  try {
    const response = await api.post(apiUrls.fileUploadUrl(category), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onUploadProgress(percentCompleted);
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Upload failed:", error);
    console.error("Upload failed:", error);
    throw error;
  }
};
