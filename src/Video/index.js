// App.js
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { fetcseos, getVideos, addViews } from "../api/video";
import {
  addVideoComment,
  fetchComments,
  getVideoCommemts,
} from "../api/comment";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import { Tabs } from "@mantine/core";
import {
  Container,
  Space,
  TextInput,
  Card,
  Button,
  Image,
  Group,
  Grid,
  Text,
  Title,
  Avatar,
  Flex,
  ScrollArea,
  UnstyledButton,
  Divider,
} from "@mantine/core";
import { RiThumbUpLine, RiThumbDownLine } from "react-icons/ri";
import { PiShareFatLight } from "react-icons/pi";
import VideoCard from "../Card";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { subscribe, unSubscribe, likeVideo, unlikeVideo } from "../api/auth";

export default function Video({ videoSource }) {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const { id } = useParams();
  const [inputValue, setInputValue] = useState("");
  const [comment, setCommet] = useState("");
  const [subscribedUsers, setSubscribedUsers] = useState("");
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

  // // create mutation};
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

  const updateSubscribersMutation = useMutation({
    mutationFn: subscribe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["video"],
      });
      notifications.show({
        title: "subscriber is updated successfully",
        color: "green",
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
      notifications.show({
        title: "unsubscriber successfully",
        color: "green",
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
      console.log(error);
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
      console.log(error);
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

  // const TotalLike = () => {
  //   let total = 0;
  //   v.user.likes.map((like) => (total = total + parseInt(like.likes)));
  //   return total;
  // };

  return (
    <Container fluid>
      <Grid>
        <Grid.Col span={12}>
          <div>
            <Group>
              <video ref={videoRef} controls width="100%" height="600">
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

                {vid &&
                vid.user &&
                vid.user.subscribedUsers &&
                vid.user.subscribedUsers.includes(cookies.currentUser._id) ? (
                  <Button
                    onClick={() => {
                      handleUnsubscribeUpdate();
                    }}
                  >
                    Unsubscribe
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      handleSubscribeUpdate();
                    }}
                  >
                    Subscribe
                  </Button>
                )}
              </Group>
              <Group position="right">
                <Button
                  variant="transparent"
                  color="gray"
                  size="md"
                  onClick={handleLikeUpdate}
                >
                  <RiThumbUpLine />
                  {vid.likes.length}
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
            </Group>
            <Space h="20px" />
            <Card style={{ backgroundColor: "#F1F3F5" }} radius="md">
              <Text fz="sm" fw={700}>
                {vid.views} views • {vid.createdAt}
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
                      w={680}
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
                <Group>
                  <TextInput
                    value=""
                    placeholder="Enter the description here"
                    style={{ border: "0px 0px 1px 0 px " }}
                  />
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
                        {com.user.createdAt}
                      </Text>
                      <Text size={18}>{com.comments}</Text>
                    </div>
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
