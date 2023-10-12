import axios from "axios";

import { API_URL } from "./data";
import { Title } from "@mantine/core";

export const fetchPosts = async () => {
  const response = await axios({
    method: "GET",
    url: API_URL + "/posts",
  });
  console.log(response.data);
  return response.data;
};

export const addPostDetails = async ({ data, token = "" }) => {
  const response = await axios({
    method: "POST",
    url: API_URL + "/posts",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: data,
  });
  return response.data;
};

export const addPostImage = async (file) => {
  const formData = new FormData();
  formData.append("postimage", file);
  const response = await axios({
    method: "POST",
    url: API_URL + "/posts",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
  return response.data;
};

export const uploadPostImage = async (file) => {
  const formData = new FormData();
  formData.append("postimage", file);
  const response = await axios({
    method: "POST",
    url: API_URL + "/uploadpostimage",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
  return response.data;
};

export const deletePost = async ({ id = "", token = "" }) => {
  const response = await axios({
    method: "DELETE",
    url: API_URL + "/posts/" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

export const deletePostAdmin = async ({ id = "", token = "" }) => {
  const response = await axios({
    method: "DELETE",
    url: API_URL + "/posts/admin/" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};
