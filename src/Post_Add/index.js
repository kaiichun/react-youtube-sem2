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
} from "../api/post";

export default function PostAdd() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [postimage, setPostimage] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [video, setVideo] = useState("");
  const [cookies, setCookies, removeCookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const queryClient = useQueryClient();

  const { data: posts = [] } = useQuery({
    queryKey: ["postcontent"],
    queryFn: () => fetchPosts(),
  });

  const createPostMutation = useMutation({
    mutationFn: addPostDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postcontent"],
      });
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

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postcontent"],
      });
      notifications.show({
        title: "Post is Deleted Successfully",
        color: "grenn",
      });
    },
  });

  const deleteAdminPostMutation = useMutation({
    mutationFn: deletePostAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postcontent"],
      });
      notifications.show({
        title: "Video is Deleted Successfully",
        color: "grenn",
      });
    },
  });
  return (
    <>
      {cookies && cookies.currentUser && cookies.currentUser._id === id ? (
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
                <Text size={18} style={{ paddingBottom: "8px" }}>
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
      <Space h="30px" />

      {posts && posts.length > 0 ? (
        posts
          .filter((f) => f.user._id === id)
          .map((v) => {
            return (
              <>
                <Group position="center">
                  <Card radius="md" withBorder style={{ width: "700px" }}>
                    <div style={{ paddingTop: "8px", paddingLeft: "0px" }}>
                      <Text size={18}>
                        <strong>{v.content}</strong>
                      </Text>
                    </div>
                    <Space h="15px" />
                    {v.postimage && (
                      <img
                        src={"http://localhost:1205/" + v.postimage}
                        alt="Login Picture"
                        style={{
                          width: "100%",
                          height: "500px",
                          borderRadius: "1%",
                        }}
                      />
                    )}
                    <Space h="20px" />
                    <Text fz="xs" c="dimmed">
                      {v.createdAt}
                    </Text>
                    <Group position="right">
                      {cookies &&
                      cookies.currentUser &&
                      cookies.currentUser._id === id ? (
                        cookies.currentUser.role === "user" ? (
                          <>
                            <UnstyledButton onClick={open}>
                              <BiEdit
                                style={{
                                  width: "20px",
                                  height: "20px",
                                }}
                              />
                            </UnstyledButton>
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                              onClick={() => {
                                deletePostMutation.mutate({
                                  id: v._id,
                                  token: currentUser ? currentUser.token : "",
                                });
                              }}
                            >
                              <RiDeleteBin6Line
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  paddingTop: "6px",
                                }}
                              />
                            </Link>
                            <Modal
                              opened={opened}
                              onClose={close}
                              title="Edit Post"
                              centered
                            >
                              {cookies &&
                              cookies.currentUser &&
                              cookies.currentUser._id === id ? (
                                <Group position="center">
                                  <Card
                                    radius="md"
                                    withBorder
                                    style={{ width: "700px" }}
                                  >
                                    <div style={{ width: "700px" }}>
                                      <Group>
                                        <img
                                          src={
                                            "http://localhost:1205/" +
                                            cookies.currentUser.image
                                          }
                                          alt="Login Picture"
                                          style={{
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "50%",
                                          }}
                                        />
                                        <Text
                                          size={18}
                                          style={{ paddingBottom: "8px" }}
                                        >
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
                                          onChange={(event) =>
                                            setContent(event.target.value)
                                          }
                                        />
                                      </div>

                                      <Space h="40px" />
                                      {postimage && postimage !== "" ? (
                                        <Group position="center">
                                          <div>
                                            <img
                                              src={
                                                "http://localhost:1205/" +
                                                postimage
                                              }
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
                                            <Text
                                              align="center"
                                              style={{ padding: "0px" }}
                                            >
                                              Image
                                            </Text>
                                          </Group>
                                        </Dropzone>
                                      )}
                                    </div>
                                    <Space h="10px" />
                                    <Group position="right">
                                      <Button
                                        style={{ margin: "0px" }}
                                        onClick={handleAddNewPost}
                                      >
                                        Publish
                                      </Button>
                                    </Group>
                                  </Card>
                                </Group>
                              ) : null}
                            </Modal>
                          </>
                        ) : cookies.currentUser.role === "admin" ? (
                          <>
                            <BiEdit
                              style={{
                                width: "20px",
                                height: "20px",
                              }}
                            />
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                              onClick={() => {
                                deleteAdminPostMutation.mutate({
                                  id: v._id,
                                  token: currentUser ? currentUser.token : "",
                                });
                              }}
                            >
                              <RiDeleteBin6Line
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  paddingTop: "6px",
                                }}
                              />
                              x``
                            </Link>
                          </>
                        ) : null
                      ) : null}
                    </Group>
                  </Card>
                </Group>
                <Space h="30px" />
              </>
            );
          })
      ) : (
        <>
          <Group position="center">
            <Text size={16}>No Post</Text>
          </Group>
        </>
      )}
    </>
  );
}
