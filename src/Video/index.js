import "../App.css";
import React, { useRef, useState, useMemo } from "react";
import { useCookies } from "react-cookie";
import { useParams, Link } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { RiThumbUpLine, RiThumbDownLine } from "react-icons/ri";
import { PiShareFatLight } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import {
  Container,
  Space,
  TextInput,
  Card,
  Button,
  Group,
  Grid,
  Text,
  Title,
  ScrollArea,
  UnstyledButton,
  Divider,
} from "@mantine/core";
import { subscribe, unSubscribe, likeVideo, unlikeVideo } from "../api/auth";
import { getVideos, addViews } from "../api/video";
import {
  addVideoComment,
  deleteComment,
  deleteCommentAdmin,
  fetchComments,
} from "../api/comment";

export default function Video({ videoSource }) {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const { id } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [comment, setCommet] = useState("");
  const queryClient = useQueryClient();
  const videoRef = useRef(null);

  const { isLoading, data: vid = {} } = useQuery({
    queryKey: ["video"],
    queryFn: () => getVideos(id),
  });

  const { data: comments = [] } = useQuery({
    queryKey: ["comments"],
    queryFn: () => fetchComments(id),
  });

  const {} = useQuery({
    queryKey: ["views"],
    queryFn: () => addViews(id),
  });

  const createCommentMutation = useMutation({
    mutationFn: addVideoComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleAddNewComment = async (event) => {
    event.preventDefault();
    createCommentMutation.mutate({
      data: JSON.stringify({
        comments: comment,
        videoId: id,
      }),
      token: currentUser ? currentUser.token : "",
    });
    setCommet("");
  };

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });

  const deleteCommentAdminMutation = useMutation({
    mutationFn: deleteCommentAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      notifications.show({
        title: currentUser.name + "(Admin) is DELETE the comment Successfully",
        color: "yellow",
      });
    },
  });

  const updateSubscribersMutation = useMutation({
    mutationFn: subscribe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["video"],
      });
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleSubscribeUpdate = async () => {
    updateSubscribersMutation.mutate({
      id: vid.user._id,
      token: currentUser ? currentUser.token : "",
    });
  };

  const updateUnsubscribersMutation = useMutation({
    mutationFn: unSubscribe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["video"],
      });
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleUnsubscribeUpdate = async () => {
    updateUnsubscribersMutation.mutate({
      id: vid.user._id,
      token: currentUser ? currentUser.token : "",
    });
  };

  const updateLikeMutation = useMutation({
    mutationFn: likeVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["video"],
      });
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleLikeUpdate = async (event) => {
    event.preventDefault();
    updateLikeMutation.mutate({
      id: id,
      token: currentUser ? currentUser.token : "",
    });
  };

  const updateUnlikeMutation = useMutation({
    mutationFn: unlikeVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["video"],
      });
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleUnlikeUpdate = async (event) => {
    event.preventDefault();
    updateUnlikeMutation.mutate({
      id: id,
      token: currentUser ? currentUser.token : "",
    });
  };

  const isAdmin = useMemo(() => {
    console.log(cookies);
    return cookies &&
      cookies.currentUser &&
      cookies.currentUser.role === "admin"
      ? true
      : false;
  }, [cookies]);

  return (
    <Container fluid>
      <Grid>
        <Grid.Col>
          <div>
            <Group>
              <video ref={videoRef} controls className="video-player">
                <source
                  src={"http://localhost:1205/" + vid.video}
                  type="video/mp4"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                />
              </video>
            </Group>
            <Space h="10px" />
            <Title size={24}> {vid.title}</Title>
            <Space h="15px" />
            <Group position="apart">
              <Group>
                {vid.user ? (
                  <>
                    <UnstyledButton
                      component={Link}
                      to={"/channel/" + vid.user._id}
                      variant="transparent"
                    >
                      <img
                        src={"http://localhost:1205/" + vid.user.image}
                        alt="Login Picture"
                        style={{
                          width: "46px",
                          height: "46px",
                          borderRadius: "50%",
                        }}
                      />
                    </UnstyledButton>
                    <div style={{ paddingTop: "2px" }}>
                      <Text size={15} fw={500}>
                        {vid.user.name}
                      </Text>
                      <Text size={12}>{vid.user.subscribers} subscribers</Text>
                      <Space h="5px" />
                    </div>
                  </>
                ) : null}
                {cookies.currentUser ? (
                  vid && vid.user && vid.user.subscribedUsers ? (
                    vid.user.subscribedUsers.includes(
                      cookies.currentUser._id
                    ) ? (
                      <Button
                        variant="filled"
                        color="gray"
                        radius="xl"
                        onClick={handleUnsubscribeUpdate}
                      >
                        Unsubscribed
                      </Button>
                    ) : (
                      <Button
                        variant="filled"
                        color="dark"
                        radius="xl"
                        onClick={handleSubscribeUpdate}
                      >
                        Subscribe
                      </Button>
                    )
                  ) : null
                ) : (
                  <Button
                    variant="filled"
                    color="dark"
                    radius="xl"
                    onClick={open}
                  >
                    Subscribe
                  </Button>
                )}

                <Modal
                  opened={opened}
                  onClose={close}
                  title="Authentication"
                  overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 5,
                  }}
                >
                  <Group position="center">
                    <Space h={40} />
                    <Text size="md">
                      Sign in to like videos, comment, and subscribe.
                    </Text>
                    <Group position="apart">
                      <Group position="apart">
                        <Button
                          variant="subtle"
                          color="rgba(73, 178, 252, 1)"
                          component={Link}
                          to="/signup"
                          size="xs"
                          radius="xs"
                        >
                          Create account
                        </Button>

                        <Button
                          variant="subtle"
                          color="rgba(73, 178, 252, 1)"
                          component={Link}
                          to="/login"
                          size="xs"
                          radius="xs"
                        >
                          Sign in
                        </Button>
                      </Group>
                    </Group>
                  </Group>
                </Modal>
              </Group>
              {cookies && cookies.currentUser ? (
                <>
                  <Group position="right">
                    <Button
                      variant="transparent"
                      color="gray"
                      size="md"
                      onClick={handleLikeUpdate}
                    >
                      <RiThumbUpLine />
                      {vid.user ? (
                        <>
                          {vid.likes.length >= 1000
                            ? vid.likes.length.toLocaleString()
                            : vid.likes.length}
                        </>
                      ) : (
                        0
                      )}
                    </Button>
                    <Button
                      variant="transparent"
                      color="gray"
                      size="md"
                      onClick={handleUnlikeUpdate}
                    >
                      <RiThumbDownLine /> Dislike
                    </Button>
                    <Button variant="transparent" color="gray" size="md">
                      <PiShareFatLight /> Share
                    </Button>
                  </Group>
                </>
              ) : (
                <>
                  <Group position="right">
                    <Button
                      variant="transparent"
                      color="gray"
                      size="md"
                      onClick={open}
                    >
                      <RiThumbUpLine />{" "}
                      {vid.user ? (
                        <>
                          {vid.likes.length >= 1000
                            ? vid.likes.length.toLocaleString()
                            : vid.likes.length}
                        </>
                      ) : (
                        0
                      )}
                    </Button>
                    <Button
                      variant="transparent"
                      color="gray"
                      size="md"
                      onClick={open}
                    >
                      <RiThumbDownLine /> Dislike
                    </Button>
                    <Button variant="transparent" color="gray" size="md">
                      <PiShareFatLight /> Share
                    </Button>
                  </Group>
                </>
              )}
            </Group>
            <Space h="20px" />
            <Card
              style={{ backgroundColor: "#F1F3F5" }}
              radius="md"
              className="mx-auto"
            >
              <Text fz="sm" fw={700}>
                {vid ? <>{Number(vid.views).toLocaleString()}</> : <>0</>} views
                •{" "}
                {vid.createdAt
                  ? new Date(vid.createdAt).toISOString().split("T")[0]
                  : null}
              </Text>
              <Space h="5px" />
              <Text fz="sm">{vid.description}</Text>
            </Card>
            <Space h="20px" />
          </div>

          <Space h={25} />
          <Group>
            {cookies && cookies.currentUser ? (
              <>
                <Group style={{ paddingLeft: "12px" }}>
                  <img
                    src={"http://localhost:1205/" + cookies.currentUser.image}
                    alt="Login Picture"
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                    }}
                  />
                  <div>
                    <TextInput
                      placeholder="Add a comment..."
                      variant="unstyled"
                      w={580}
                      radius="md"
                      value={comment}
                      onChange={(event) => setCommet(event.target.value)}
                    />
                  </div>
                  {comment.length > 0 && (
                    <div>
                      <Group position="right">
                        <Button
                          style={{ margin: "0px" }}
                          onClick={handleAddNewComment}
                        >
                          Comment
                        </Button>
                      </Group>
                    </div>
                  )}
                </Group>
              </>
            ) : (
              <>
                <Group style={{ paddingLeft: "12px" }}>
                  <VscAccount size="35px" p="0px" />
                  <TextInput
                    placeholder="Add a comment..."
                    variant="unstyled"
                    w={580}
                    radius="md"
                    value={comment}
                    onChange={(event) => setCommet(event.target.value)}
                  />
                  {comment.length > 0 && (
                    <div>
                      <Group position="right">
                        <Button style={{ margin: "0px" }} onClick={open}>
                          Comment
                        </Button>
                      </Group>
                    </div>
                  )}
                </Group>
              </>
            )}
          </Group>

          <ScrollArea.Autosize h={800}>
            {comments && comments.length > 0 ? (
              comments.map((com) => (
                <Grid.Col span={12}>
                  <Space h={15} />
                  <Divider w="100%" />
                  <Space h={15} />
                  <Group position="apart">
                    <Group>
                      <img
                        src={"http://localhost:1205/" + com.user.image}
                        alt="Login Picture"
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "50%",
                        }}
                      />
                      <div style={{ paddingTop: "8px", paddingLeft: "0px" }}>
                        <Text size={14}>
                          <strong style={{ paddingRight: "10px" }}>
                            {com.user.name}
                          </strong>
                          {com.user.createdAt
                            ? new Date(com.user.createdAt)
                                .toISOString()
                                .split("T")[0]
                            : null}
                        </Text>
                        <Text size={18}>{com.comments}</Text>
                      </div>
                    </Group>
                    {cookies &&
                    cookies.currentUser &&
                    cookies.currentUser._id === com.user._id ? (
                      <Group>
                        <Link
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                          }}
                          onClick={() => {
                            deleteCommentMutation.mutate({
                              id: com._id,
                              token: currentUser ? currentUser.token : "",
                            });
                          }}
                        >
                          <AiOutlineDelete
                            style={{
                              width: "20px",
                              height: "20px",
                            }}
                          />
                        </Link>
                      </Group>
                    ) : (
                      isAdmin && (
                        <Button
                          variant="outline"
                          color="red"
                          onClick={() => {
                            deleteCommentAdminMutation.mutate({
                              id: com._id,
                              token: currentUser ? currentUser.token : "",
                            });
                          }}
                        >
                          Delete
                        </Button>
                      )
                    )}
                  </Group>
                </Grid.Col>
              ))
            ) : (
              <>
                <Space h={15} />
                <Divider w="100%" />
                <Space h={100} />
                <Group position="center">
                  <Text size={16}>No comments yet</Text>
                </Group>
              </>
            )}
          </ScrollArea.Autosize>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
