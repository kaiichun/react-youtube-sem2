import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import {
  UnstyledButton,
  Grid,
  Image,
  Title,
  Card,
  Text,
  Group,
} from "@mantine/core";
import { fetchVideos } from "../api/video";

export default function Home() {
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
                          {v.thumbnail && v.thumbnail !== "" ? (
                            <>
                              <Image
                                src={"http://10.1.104.3:1205/" + v.thumbnail}
                                height="220px"
                                alt="Thumbnail"
                                style={{
                                  border: 0,
                                  borderRadius: "5%",
                                  position: "relative",
                                }}
                              />
                            </>
                          ) : (
                            <Image
                              src={
                                "https://media.istockphoto.com/id/1147544806/vector/no-thumbnail-image-vector-graphic.jpg?s=170667a&w=0&k=20&c=-r15fTq303g-Do1h-F1jLdxddwkg4ZTtkdQK1XP2sFk="
                              }
                              height="220px"
                              alt="Thumbnail"
                              style={{
                                border: 0,
                                borderRadius: "5%",
                                position: "relative",
                              }}
                            />
                          )}
                        </Card.Section>

                        <Group position="left">
                          <img
                            src={
                              v && v.user && v.user.image
                                ? "http://10.1.104.3:1205/" + v.user.image
                                : ""
                            }
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
                            {v && v.user && v.user.name ? (
                              <Text size="sm" color="dimmed">
                                {v.user.name}
                              </Text>
                            ) : null}
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
}
