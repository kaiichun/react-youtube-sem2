import {
  ScrollArea,
  Table,
  Button,
  TextInput,
  Divider,
  Select,
  UnstyledButton,
  LoadingOverlay,
} from "@mantine/core";

import { SlPencil } from "react-icons/sl";
import { CiYoutube } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import ReactPlayer from "react-player";
import { useNavigate, Link } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useHover } from "@mantine/hooks";
import { useCookies } from "react-cookie";
import { fetchVideos, addViews } from "../api/video";

import React from "react";
import {
  Container,
  Grid,
  Image,
  Title,
  Space,
  Card,
  Text,
  Group,
  Badge,
} from "@mantine/core";
import { GoVerified } from "react-icons/go";
import axios from "axios";

const Home = () => {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const queryClient = useQueryClient();
  const { isLoading, data: videos = [] } = useQuery({
    queryKey: ["videos"],
    queryFn: () => fetchVideos(),
  });
  return (
    <>
      <Grid>
        {videos
          ? videos
              .filter((v) => v.status === "Publish")
              .map((v) => {
                return (
                  <Grid.Col md={6} lg={4} sm={12} key={v._id}>
                    <UnstyledButton
                      component={Link}
                      to={"/watch/" + v._id}
                      variant="transparent"
                    >
                      <Card style={{ border: 0 }}>
                        <Card.Section
                          style={{
                            marginBottom: "0px",
                            paddingBottom: "0px",
                          }}
                        >
                          <Image
                            src={"http://localhost:1205/" + v.thumbnail}
                            height="200px"
                            alt="Thumbnail"
                            style={{
                              border: 0,
                              borderRadius: "5%",
                              position: "relative",
                            }}
                          />
                        </Card.Section>

                        <Group position="left">
                          <img
                            src={"http://localhost:1205/" + v.user.image}
                            alt="Profile Picture"
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "50%",
                            }}
                          />
                          <div
                            style={{
                              paddingTop: "18px",
                            }}
                          >
                            <Title order={4}>{v.title}</Title>
                            <Text size="sm" color="dimmed">
                              {v.user.name}
                            </Text>
                            <Text size="sm" color="dimmed">
                              {v ? (
                                <>{Number(v.views).toLocaleString()} views </>
                              ) : null}
                              .{" "}
                              {v.createdAt
                                ? new Date(v.createdAt)
                                    .toISOString()
                                    .split("T")[0]
                                : null}
                            </Text>
                          </div>
                        </Group>
                      </Card>
                    </UnstyledButton>
                  </Grid.Col>
                );
              })
          : null}
      </Grid>
    </>
  );
};

export default Home;
