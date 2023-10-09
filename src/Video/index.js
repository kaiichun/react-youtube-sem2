// App.js
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { fetchVideos, getVideos, addViews } from "../api/video";
import {
  addVideoComment,
  fetchComments,
  getVideoCommemts,
} from "../api/comment";
import axios from "axios";
import { useCookies } from "react-cookie";
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
  const [comment, setCommet] = useState("");
  const [subscribedUsers, setSubscribedUsers] = useState("");
  const queryClient = useQueryClient();
  const videoRef = useRef(null);

  const { isLoading, data: v = {} } = useQuery({
    queryKey: ["video"],
    queryFn: () => getVideos(id),
  });

  const {} = useQuery({
    queryKey: ["views"],
    queryFn: () => addViews(id),
  });

  // // create mutation};
  const createCommentMutation = useMutation({
    mutationFn: addVideoComment,
    onSuccess: () => {},
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
      id: v.user._id,
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
      id: v.user._id,
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
        <Grid.Col span={9}>
          <div>
            <Group>
              <video ref={videoRef} controls width="640" height="360">
                <source
                  src={"http://localhost:1205/" + v.video}
                  type="video/mp4"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                />
              </video>
            </Group>
            <Space h="10px" />
            <Title size={24}> {v.title}</Title>
            <Space h="15px" />
            <Group position="apart">
              <Group>
                {v.user ? (
                  <>
                    <Image
                      src={"http://localhost:1205/" + v.user.image}
                      alt="Login Picture"
                      style={{
                        width: "46px",
                        height: "46px",
                        borderRadius: "50%",
                      }}
                    />
                    <div style={{ paddingTop: "2px" }}>
                      <Text size={15} fw={500}>
                        {v.user.name}
                      </Text>
                      <Text size={12}>{v.user.subscribers} subscribers</Text>
                      <Space h="5px" />
                    </div>
                  </>
                ) : null}

                {cookies && cookies.currentUser.subscribedUsers ? (
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
                  <RiThumbUpLine /> {v.user.likes}
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
                {v.views} views • {v.createdAt}
              </Text>
              <Space h="5px" />
              <Text fz="sm">{v.description}</Text>
            </Card>
            {/* <Comments /> */}
          </div>
        </Grid.Col>
      </Grid>
      <Group>
        <Group position="left">
          {cookies && cookies.currentUser ? (
            <>
              <Group>
                <img
                  src={cookies.currentUser.image}
                  alt="Login Picture"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                  }}
                />
              </Group>
              <Group>
                <TextInput
                  value={comment}
                  placeholder="Enter the description here"
                  style={{ border: "0px 0px 1px 0 px " }}
                  onChange={(event) => setCommet(event.target.value)}
                />
                <Button onClick={handleAddNewComment}>Comment</Button>
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

        {/* <Group>
            <Text style={{ fontSize: "14px" }}>John Doe 1 day ago</Text>
          </Group> */}
      </Group>
    </Container>
  );
}
