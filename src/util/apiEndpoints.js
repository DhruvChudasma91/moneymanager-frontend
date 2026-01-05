export const BASE_URL = "http://localhost:8080/api/v1.0";

const CLOUDINARY_CLOUD_NAME = "dcp8kateo"; 
export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    GET_USER_INFO: "/me",
    GET_ALL_CATEGORIES: "/categories",
    ADD_CATEGORY: "/categories",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}
