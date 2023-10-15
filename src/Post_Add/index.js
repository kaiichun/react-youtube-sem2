import React, { useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams, useNavigate, Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  Card,
  Button,
  Image,
  Group,
  Space,
  UnstyledButton,
  Text,
  Textarea,
} from "@mantine/core";
import {
  addPostDetails,
  deletePost,
  deletePostAdmin,
  fetchPosts,
  uploadPostImage,
  updatePost,
} from "../api/post";

export default function PostAdd() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [postimage, setPostimage] = useState("");
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
        title: currentUser.name + "new post added",
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

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      notifications.show({
        title: currentUser.name + "Post is Edited",
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

  const uploadPostImageMutation = useMutation({
    mutationFn: uploadPostImage,
    onSuccess: (data) => {
      setPostimage(data.postimage_url);
    },
    onError: (error) => {
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
        title: currentUser.name + "post is Deleted Successfully",
        color: "yellow",
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
        title: currentUser.name + " video is Deleted Successfully",
        color: "green",
      });
    },
  });

  const isAdmin = useMemo(() => {
    return cookies &&
      cookies.currentUser &&
      cookies.currentUser.role === "admin"
      ? true
      : false;
  }, [cookies]);

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
                <Group>
                  <div>
                    <Image
                      src={"http://localhost:1205/" + postimage}
                      width="100%"
                      height="220px"
                    />
                    <Button
                      color="dark"
                      mt="15px"
                      mb="15px"
                      onClick={() => setPostimage("")}
                    >
                      Remove
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
                      {isAdmin && (
                        <>
                          {cookies &&
                            cookies.currentUser &&
                            cookies.currentUser._id === id &&
                            cookies.currentUser.role === "admin" && (
                              <>
                                <UnstyledButton
                                  component={Link}
                                  to={"/post_edit/" + v._id}
                                >
                                  <BiEdit
                                    style={{ width: "20px", height: "20px" }}
                                  />
                                </UnstyledButton>
                              </>
                            )}

                          <Link
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                            }}
                            onClick={() => {
                              deleteAdminPostMutation.mutate({
                                id: v._id,
                                token: currentUser?.token || "",
                              });
                            }}
                          >
                            <RiDeleteBin6Line
                              style={{
                                width: "24px",
                                height: "24px",
                                paddingTop: "4px",
                              }}
                            />
                          </Link>
                        </>
                      )}

                      {cookies &&
                        cookies.currentUser &&
                        cookies.currentUser._id === id &&
                        cookies.currentUser.role === "user" && (
                          <>
                            <UnstyledButton
                              component={Link}
                              to={"/post_edit/" + v._id}
                            >
                              <BiEdit
                                style={{ width: "20px", height: "20px" }}
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
                                  paddingTop: "4px",
                                }}
                              />
                            </Link>
                          </>
                        )}
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
