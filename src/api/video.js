import axios from "axios";

import { API_URL } from "./data";
import { Title } from "@mantine/core";

export const fetchVideos = async (keyword = "") => {
  const response = await axios({
    method: "GET",
    url: API_URL + "/videos?" + (keyword !== "" ? "keyword=" + keyword : ""),
  });
  console.log(response.data);
  return response.data;
};

export const fetchPersonalVideo = async (token = "") => {
  const response = await axios({
    method: "GET",
    url: API_URL + "/videos/studio",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  console.log(response.data);
  return response.data;
};

export const fetchTrendingVideos = async (token = "") => {
  const response = await axios({
    method: "GET",
    url: API_URL + "/videos/trending",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  console.log(response.data);
  return response.data;
};

export const fetchChannels = async () => {
  const response = await axios.get(API_URL + "/videos/channels");
  return response.data;
};

export const getVideos = async (id) => {
  const response = await axios({
    method: "GET",
    url: API_URL + "/videos/" + id,
  });
  return response.data;
};

export const getChannel = async (id) => {
  const response = await axios({
    method: "GET",
    url: API_URL + "/videos/channel/" + id,
  });
  return response.data;
};

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

export const deleteVideoAdmin = async ({ id = "", token = "" }) => {
  const response = await axios({
    method: "DELETE",
    url: API_URL + "/videos/admin/" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};
