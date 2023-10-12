import PostAdd from "../Post_Add";
import { useCookies } from "react-cookie";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
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
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  UnstyledButton,
  Text,
  Textarea,
  MediaQuery,
  ScrollArea,
  Burger,
  useMantineTheme,
  Input,
  TextInput,
  Tabs,
  Avatar,
  Loader,
} from "@mantine/core";
import { fetchPosts } from "../api/post";
import { fetchUsers, subscribe, unSubscribe } from "../api/auth";
import { fetchChannels, fetchVideos, getChannel } from "../api/video";
import { getSpaceUntilMaxLength } from "@testing-library/user-event/dist/utils";

const Channel = () => {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const { id } = useParams();
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
      // id: v.user._id,
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
      // id: v.user._id,
      id: id,

      token: currentUser ? currentUser.token : "",
    });
  };

  return (
    <>
      {users
        ? users
            .filter((f) => f._id === id)
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
                          src={"http://localhost:1205/" + v.image}
                          alt="Login Picture"
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                          }}
                        />
                      </UnstyledButton>
                      <div style={{ paddingTop: "2px" }}>
                        <Text size={18} fw={500}>
                          {v.name}
                        </Text>
                        <Text size={12}>{v.subscribers} subscribers</Text>
                        <Space h="5px" />
                      </div>
                    </Group>
                    {v &&
                    v.subscribedUsers &&
                    v.subscribedUsers.includes(cookies.currentUser._id) ? (
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

                  <Space h="20px" />
                  <Divider />
                  <Space h="20px" />
                </>
              );
            })
        : null}

      <Tabs color="gray" variant="pills" defaultValue="Home">
        <Tabs.List grow>
          <Tabs.Tab value="Home">Home</Tabs.Tab>
          <Tabs.Tab value="messages">Post</Tabs.Tab>
        </Tabs.List>
        <Space h="20px" />
        <Tabs.Panel value="Home">
          <Grid className="abc">
            {videos
              ? videos
                  .filter((f) => f.user._id === id && f.status === "Publish")
                  .map((v) => {
                    return (
                      <>
                        <></>
                        <Grid.Col span={3} md={6} lg={4} sm={12}>
                          <Container>
                            {" "}
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
                                  <div
                                    style={{
                                      paddingTop: "18px",
                                    }}
                                  >
                                    <Title order={4}>{v.title}</Title>

                                    <Text size="sm" color="dimmed">
                                      {v.views} views . {v.createdAt}
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
              : null}{" "}
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="messages">
          <PostAdd />
        </Tabs.Panel>
      </Tabs>

      {/* {channels
        ? channels.map((m) => {
            <Text>{m.title}</Text>;
            {
              m.user
                .filter((f) => f._id === id)
                .map((c) => {
                  <Card style={{ border: 0 }} key={c._id}>
                    <Card.Section
                      style={{
                        marginBottom: "0px",
                        paddingBottom: "0px",
                      }}
                    >
                      <Image
                        src={"http://localhost:1205/" + c.thumbnail}
                        height="200px"
                        alt="Thumbnail"
                        style={{
                          border: 0,
                          borderRadius: "5%",
                          position: "relative",
                        }}
                      />
                    </Card.Section>
                  </Card>;
                });
            }
          })
        : null} */}

      {/* {v.user ? (
        <>
          <Group>
            <img
              src={"http://localhost:1205/" + v.user.image}
              alt="Login Picture"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
            />
            <div style={{ paddingTop: "40px" }}>
              <Text size={22} fw={500}>
                {v.user.name}
              </Text>
              <Text size={14}>{v.user.subscribers} subscribers</Text>
              <Space h="5px" />
            </div>
          </Group>
          <Space h={30} />
          <Divider />
          <Space h={30} />
        </>
      ) : null}
      <div>
        <Grid>
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
                  <div>
                    <Text size={22} fw={500}>
                      {v.title}
                    </Text>
                    <Text size="sm" color="dimmed">
                      {v.views} views . {v.createdAt}
                    </Text>
                  </div>
                </Group>
              </Card>
            </UnstyledButton>
          </Grid.Col>
        </Grid>
      </div> */}
    </>
  );
};

export default Channel;
