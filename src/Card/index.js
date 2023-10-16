import React, { useMemo } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import {
  Grid,
  Image,
  Title,
  UnstyledButton,
  Card,
  Text,
  Group,
} from "@mantine/core";
import { fetchVideos } from "../api/video";

export default function VideoCard() {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const queryClient = useQueryClient();

  const { isLoading, data: videos } = useQuery({
    queryKey: ["videos"],
    queryFn: () => fetchVideos(currentUser ? currentUser.token : ""),
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
      <Grid>
        {videos
          ? videos.map((v) => {
              return (
                <Grid.Col span={3} md={6} lg={4} sm={12}>
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
                          src={"http://10.1.104.3/" + v.thumbnail}
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
                        {v.user.map((users, index) => (
                          <Title order={4}>{users.name}</Title>
                        ))}
                        <img
                          src=""
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
                            123
                          </Text>
                          <Text size="sm" color="dimmed">
                            {v.views} views . {v.createdAt}
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
