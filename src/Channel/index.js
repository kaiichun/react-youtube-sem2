import { useCookies } from "react-cookie";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
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
  UnstyledButton,
  Text,
  Tabs,
  Modal,
} from "@mantine/core";
import { fetchUsers, subscribe, unSubscribe } from "../api/auth";
import { fetchVideos, getChannel } from "../api/video";
import PostAdd from "../Post_Add";

export default function Channel() {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const { id } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();

  const { data: v = {} } = useQuery({
    queryKey: ["channels", id],
    queryFn: () => getChannel(id),
  });

  const { isLoading, data: videos = [] } = useQuery({
    queryKey: ["videos"],
    queryFn: () => fetchVideos(),
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });

  const updateSubscribersMutation = useMutation({
    mutationFn: subscribe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
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
      id: id,
      token: currentUser ? currentUser.token : "",
    });
  };

  const updateUnsubscribersMutation = useMutation({
    mutationFn: unSubscribe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
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
      id: id,
      token: currentUser ? currentUser.token : "",
    });
  };

  return (
    <>
      {users
        ? users
            .filter((f) => f && f._id === id)
            .map((v) => {
              return (
                <>
                  <Group position="apart">
                    <Group>
                      <UnstyledButton
                        component={Link}
                        to={"/channel/" + v._id}
                        variant="transparent"
                      >
                        <img
                          src={"http://10.1.104.3:1205/" + v.image}
                          alt="Channel Img"
                          style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                          }}
                        />
                      </UnstyledButton>
                      <div style={{ paddingTop: "2px" }}>
                        <Text size={22} fw={500}>
                          {v.name}
                        </Text>
                        <Text size={14}>{v.subscribers} subscribers</Text>
                        <Space h="5px" />
                      </div>
                    </Group>
                    {cookies.currentUser ? (
                      v && v.subscribedUsers ? (
                        v.subscribedUsers.includes(cookies.currentUser._id) ? (
                          <Button
                            variant="filled"
                            color="gray"
                            radius="xl"
                            onClick={handleUnsubscribeUpdate}
                          >
                            Unsubscribe
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

                  <Space h="20px" />
                  <Divider />
                  <Space h="20px" />
                </>
              );
            })
        : null}

      <Tabs color="gray" variant="pills" defaultValue="Post">
        <Tabs.List grow>
          <Tabs.Tab value="Home">Video</Tabs.Tab>
          <Tabs.Tab value="Post">Post</Tabs.Tab>
        </Tabs.List>
        <Space h="20px" />
        <Tabs.Panel value="Home">
          <Grid className="abc">
            {videos ? (
              videos
                .filter(
                  (f) =>
                    f && f.user && f.user._id === id && f.status === "Publish"
                )
                .map((v) => {
                  return (
                    <>
                      <></>
                      <Grid.Col md={6} lg={4} sm={12}>
                        <Container>
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
                                      src={
                                        "http://10.1.104.3:1205/" + v.thumbnail
                                      }
                                      height="200px"
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
                                    height="200px"
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
                                <div
                                  style={{
                                    paddingTop: "18px",
                                  }}
                                >
                                  <Title order={4}>{v.title}</Title>

                                  <Text size="sm" color="dimmed">
                                    {v ? (
                                      <>
                                        {Number(v.views).toLocaleString()} views{" "}
                                      </>
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
                        </Container>
                      </Grid.Col>
                    </>
                  );
                })
            ) : (
              <Grid.Col>
                <Group position="center">
                  <Text size={16}>No comments yet</Text>
                </Group>
              </Grid.Col>
            )}
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="Post">
          <PostAdd />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
