import * as Yup from "yup";
import { status } from "../../../utils/constants/common.constants";

const fileMaxSize = 5 * 1024 * 1024;
const thumbnailImageResolution = {
    height: 250,
    width: 250,
};

export const validationSchema = Yup.object().shape({
    name: Yup.string().required("Standard Size name is required"),


});

export const initialValues = {
    name: "",
    status: status.active,
    artical_type_id: ""
};
