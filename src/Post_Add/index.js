import { Dropzone, IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone";
import React, { useEffect, useState } from "react";
import { LiaPhotoVideoSolid } from "react-icons/lia";

import {
  Container,
  Grid,
  Card,
  Button,
  Title,
  Divider,
  Image,
  Group,
  Space,
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  Textarea,
  MediaQuery,
  ScrollArea,
  Burger,
  useMantineTheme,
  Input,
  TextInput,
  Avatar,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import {
  addProduct,
  addVideoDetails,
  addVideoImage,
  addVideo,
  uploadVideoImage,
  uploadVideo,
  fetchVideos,
} from "../api/video";
import { useCookies } from "react-cookie";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { addPostDetails, fetchPosts, uploadPostImage } from "../api/post";

export default function PostAdd() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [postimage, setPostimage] = useState("");
  const [video, setVideo] = useState("");
  const [cookies, setCookies, removeCookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const queryClient = useQueryClient();

  const { data: posts = [] } = useQuery({
    queryKey: ["post"],
    queryFn: () => fetchPosts(id),
  });

  //   const searchVideoMutation = useMutation({
  //     mutationFn: fetchPosts,
  //     onSuccess: (data) => {
  //       queryClient.setQueryData(["posts"], data);
  //     },
  //   });

  const createPostMutation = useMutation({
    mutationFn: addPostDetails,
    onSuccess: () => {
      notifications.show({
        title: "New Video Added",
        color: "green",
      });
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleAddNewPost = async (event) => {
    event.preventDefault();
    createPostMutation.mutate({
      data: JSON.stringify({
        content: content,
        postimage: postimage,
      }),
      token: currentUser ? currentUser.token : "",
    });
    setContent("");
    setPostimage("");
  };

  const uploadPostImageMutation = useMutation({
    mutationFn: uploadPostImage,
    onSuccess: (data) => {
      setPostimage(data.postimage_url);
      notifications.show({
        title: "postimage uploaded successfully",
        color: "yellow",
      });
    },
    onError: (error) => {
      console.log(error);
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handlePostImageUpload = (files) => {
    uploadPostImageMutation.mutate(files[0]);
  };

  return (
    <>
      {cookies && cookies.currentUser ? (
        <Group position="center">
          <Card radius="md" withBorder style={{ width: "700px" }}>
            <div style={{ width: "700px" }}>
              <Group>
                <img
                  src={"http://localhost:1205/" + cookies.currentUser.image}
                  alt="Login Picture"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                  }}
                />
                <Text size={16} style={{ paddingBottom: "10px" }}>
                  {cookies.currentUser.name}
                </Text>
              </Group>

              <Space h="10px" />
              <div>
                <Textarea
                  variant="unstyled"
                  placeholder="Post an update to your fans"
                  radius="xs"
                  w={550}
                  minRows={2}
                  maxRows={4}
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                />
              </div>

              <Space h="40px" />
              {postimage && postimage !== "" ? (
                <Group position="center">
                  <div>
                    <img
                      src={"http://localhost:1205/" + postimage}
                      height="300px"
                      position="absolute"
                    />
                    <Button
                      color="dark"
                      mt="15px"
                      onClick={() => setPostimage("")}
                      style={{
                        bottom: "120px",
                        right: " 60px",
                        opacity: "0.2",
                      }}
                    >
                      X
                    </Button>
                  </div>
                </Group>
              ) : (
                <Dropzone
                  multiple={false}
                  accept={IMAGE_MIME_TYPE}
                  w={80}
                  h={60}
                  styles={{ margin: "0px" }}
                  onDrop={(files) => {
                    handlePostImageUpload(files);
                  }}
                >
                  <Group position="center">
                    <Text align="center" style={{ padding: "0px" }}>
                      Image
                    </Text>
                  </Group>
                </Dropzone>
              )}
            </div>
            <Space h="10px" />
            <Group position="right">
              <Button style={{ margin: "0px" }} onClick={handleAddNewPost}>
                Publish
              </Button>
            </Group>
          </Card>
        </Group>
      ) : (
        <></>
      )}

      <Group>
        <img
          src={"http://localhost:1205/" + posts.postimage}
          alt="Login Picture"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
          }}
        />
        <div style={{ paddingTop: "8px", paddingLeft: "0px" }}>
          <Text size={14}>
            <strong>{posts.content}</strong>
          </Text>
        </div>
      </Group>
    </>
  );
}
