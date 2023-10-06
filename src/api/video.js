import axios from "axios";

import { API_URL } from "./data";

export const fetchVideos = async (token = "") => {
  const response = await axios({
    method: "GET",
    url: API_URL + "/videos",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  console.log(response.data);
  return response.data;
};

export const getVideos = async (id) => {
  const response = await axios({
    method: "GET",
    url: API_URL + "/videos/" + id,
  });
  console.log(response.data);
  return response.data;
};

// export const getVideos = async (id) => {
//   const response = await axios.get(API_URL + "/videos/" + id);
//   return response.data;
// };

export const addVideoDetails = async ({ data, token = "" }) => {
  const response = await axios({
    method: "POST",
    url: API_URL + "/videos",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: data,
  });
  return response.data;
};

export const addViews = async (id, data) => {
  const response = await axios({
    method: "PUT",
    url: API_URL + "/videos/view/" + id,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
  return response.data;
};

// export const addViews = async (id, data) => {
//   const response = await axios({
//     method: "PUT",
//     url: API_URL + "videos/view/" + id,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: data,
//   });
//   return response.data;
// };

// export const addToCart = (product) => {
//   // get all the items from the current cart
//   const cart = getCartItems();
//   // find if the product already exists in the cart or not
//   const existing_product = cart.find((i) => i._id === product._id);
//   // if product exists, increase the quantity
//   if (existing_product) {
//     existing_product.view++;
//     // existing_product.quantity = existing_product.quantity + 1;
//   } else {
//     // product doesn't exists, add it to cart
//     cart.push({
//       ...product, // clone the product data
//       quantity: 1, // set quantity to 1
//     });
//   }

export const addVideo = async (file) => {
  const formData = new FormData();
  formData.append("video", file);
  const response = await axios({
    method: "POST",
    url: API_URL + "/videos",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
  return response.data;
};

export const uploadVideo = async (file) => {
  const formData = new FormData();
  formData.append("video", file);
  const response = await axios({
    method: "POST",
    url: API_URL + "/uploadvideo",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
  return response.data;
};

export const addVideoImage = async (file) => {
  const formData = new FormData();
  formData.append("thumbnail", file);
  const response = await axios({
    method: "POST",
    url: API_URL + "/thumbnail",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
  return response.data;
};

export const uploadVideoImage = async (file) => {
  const formData = new FormData();
  formData.append("thumbnail", file);
  const response = await axios({
    method: "POST",
    url: API_URL + "/uploadthumbnail",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
  return response.data;
};

export const updateVideo = async ({ id, data, token = "" }) => {
  const response = await axios({
    method: "PUT",
    url: API_URL + "/videos/" + id,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: data,
  });
  return response.data;
};

export const deleteVideo = async ({ id = "", token = "" }) => {
  const response = await axios({
    method: "DELETE",
    url: API_URL + "/videos/" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};
