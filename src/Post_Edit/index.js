import { Dropzone, IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone";
import React, { useEffect, useState } from "react";
import { LiaPhotoVideoSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";

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
  UnstyledButton,
  Text,
  Textarea,
  Modal,
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
import {
  addProduct,
  addVideoDetails,
  addVideoImage,
  addVideo,
  uploadVideoImage,
  uploadVideo,
  fetchVideos,
  deleteVideoAdmin,
} from "../api/video";
import { useCookies } from "react-cookie";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import {
  addPostDetails,
  deletePost,
  deletePostAdmin,
  fetchPosts,
  uploadPostImage,
  updatePost,
  fetchPost,
  getPosts,
} from "../api/post";

export default function PostEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [postimage, setPostimage] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [video, setVideo] = useState("");
  const [userId, setUserId] = useState("");

  const [cookies, setCookies, removeCookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const queryClient = useQueryClient();

  const { isLoading } = useQuery({
    queryKey: ["updatecontent", id],
    queryFn: () => getPosts(id),
    onSuccess: (data) => {
      setContent(data.content);
      setPostimage(data.postimage);
      setUserId(data.user);
      console.log(data);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      notifications.show({
        title: "Post Edited",
        color: "green",
      });
      navigate("/");
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleUpdatePosts = async (event) => {
    event.preventDefault();
    updateMutation.mutate({
      id: id,
      data: JSON.stringify({
        content: content,
      }),
      token: currentUser ? currentUser.token : "",
    });
  };

  return (
    <>
      {" "}
      {cookies &&
      cookies.currentUser &&
      cookies.currentUser._id === userId._id ? (
        <Group position="center">
          <Card radius="md" withBorder style={{ width: "700px" }}>
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
              <Text size={18} style={{ paddingBottom: "8px" }}>
                {cookies.currentUser.name}
              </Text>
            </Group>

            <Space h="10px" />
            <div>
              <TextInput
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
              <div>
                <img
                  src={"http://localhost:1205/" + postimage}
                  style={{
                    width: "100%",
                    height: "500px",
                    borderRadius: "1%",
                  }}
                />
              </div>
            ) : null}

            <Space h="10px" />
            <Group position="right">
              <Button style={{ margin: "0px" }} onClick={handleUpdatePosts}>
                Update
              </Button>
            </Group>
          </Card>
          <Group position="center">
            <Button
              component={Link}
              to={"/channel/" + cookies.currentUser._id}
              variant="subtle"
              size="xs"
              color="gray"
            >
              Back to Post
            </Button>
          </Group>
        </Group>
      ) : null}
    </>
  );
}
