import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { SlPencil } from "react-icons/sl";
import { CiYoutube } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { notifications } from "@mantine/notifications";
import {
  ScrollArea,
  Title,
  Group,
  Button,
  UnstyledButton,
  Image,
  Space,
  Text,
  Select,
} from "@mantine/core";
import {
  deleteVideo,
  updateVideo,
  fetchPersonalVideo,
  deleteVideoAdmin,
} from "../api/video";

const Studio = () => {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const queryClient = useQueryClient();
  const { isLoading, data: video = [] } = useQuery({
    queryKey: ["vid"],
    queryFn: () => fetchPersonalVideo(currentUser ? currentUser.token : ""),
  });

  const isAdmin = useMemo(() => {
    return cookies &&
      cookies.currentUser &&
      cookies.currentUser.role === "admin"
      ? true
      : false;
  }, [cookies]);

  const updateMutation = useMutation({
    mutationFn: updateVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vid"],
      });
      notifications.show({
        title: currentUser.name + " video visibility change successfully",
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

  const deleteMutation = useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vid"],
      });
      notifications.show({
        title: currentUser.name + " you is successfully delete video",
        color: "green",
      });
    },
  });

  const deleteAdminMutation = useMutation({
    mutationFn: deleteVideoAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vid"],
      });
      notifications.show({
        title: currentUser.name + "(Admin) is successfully delete video",
        color: "green",
      });
    },
  });

  return (
    <>
      <Title>Channel content</Title>
      <Space h={30} />
      <ScrollArea style={{ width: "100%", overflowX: "auto" }}>
        <table width={1450}>
          <thead>
            <tr>
              {isAdmin && <th>Users</th>}

              <th>Video</th>
              <th>Visibility</th>
              <th>Date</th>
              <th>Views</th>
              <th>Likes (vs. dislikes)</th>
            </tr>
          </thead>
          <tbody>
            {video ? (
              video.map((v) => {
                return (
                  <tr key={v._id}>
                    {isAdmin && (
                      <td width={"250px"}>
                        <Group>
                          <UnstyledButton
                            component={Link}
                            to={"/channel/" + v.user._id}
                            variant="transparent"
                          >
                            <img
                              src={"http://10.1.104.3/" + v.user.image}
                              alt="Login Picture"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                              }}
                            />
                          </UnstyledButton>
                          <div>
                            {v.user.name}
                            <br />
                            <small>
                              {v ? (
                                <>
                                  {Number(v.user.subscribers).toLocaleString()}
                                </>
                              ) : (
                                <>0 (0)</>
                              )}{" "}
                              subscribers{" "}
                            </small>
                          </div>
                        </Group>
                      </td>
                    )}

                    <td width={"650px"}>
                      <Group position="left">
                        {v.thumbnail && v.thumbnail !== "" ? (
                          <>
                            <Image
                              src={"http://10.1.104.3/" + v.thumbnail}
                              width="140px"
                              height="78px"
                            />
                          </>
                        ) : (
                          <Image
                            src={
                              "https://media.istockphoto.com/id/1147544806/vector/no-thumbnail-image-vector-graphic.jpg?s=170667a&w=0&k=20&c=-r15fTq303g-Do1h-F1jLdxddwkg4ZTtkdQK1XP2sFk="
                            }
                            width="140px"
                            height="78px"
                          />
                        )}

                        <div>
                          <Text fw={700} fz={14}>
                            {v.title}
                          </Text>
                          <Space h="10px" />
                          <Group>
                            <Button
                              variant="transparent"
                              color="gray"
                              size="xs"
                              radius="md"
                              component={Link}
                              to={"/video_edit/" + v._id}
                              disabled={
                                cookies &&
                                cookies.currentUser &&
                                cookies.currentUser._id !== v.user._id
                              }
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <SlPencil
                                style={{
                                  width: "16px",
                                  height: "18px",
                                }}
                              />
                            </Button>

                            <Button
                              variant="transparent"
                              color="gray"
                              size="xs"
                              radius="md"
                              component={Link}
                              to={"/watch/" + v._id}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <CiYoutube
                                style={{
                                  width: "20px",
                                  height: "20px",
                                }}
                              />
                            </Button>

                            {cookies.currentUser.role === "user" ? (
                              <Button
                                variant="transparent"
                                color="gray"
                                size="xs"
                                radius="md"
                                component={Link}
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                }}
                                onClick={() => {
                                  deleteMutation.mutate({
                                    id: v._id,
                                    token: currentUser ? currentUser.token : "",
                                  });
                                }}
                              >
                                <AiOutlineDelete
                                  style={{
                                    width: "18px",
                                    height: "18px",
                                  }}
                                />
                              </Button>
                            ) : cookies.currentUser.role === "admin" ? (
                              <Button
                                variant="transparent"
                                color="gray"
                                size="xs"
                                radius="md"
                                component={Link}
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                }}
                                onClick={() => {
                                  deleteAdminMutation.mutate({
                                    id: v._id,
                                    token: currentUser ? currentUser.token : "",
                                  });
                                }}
                              >
                                <AiOutlineDelete
                                  style={{
                                    width: "18px",
                                    height: "18px",
                                  }}
                                />
                              </Button>
                            ) : null}
                          </Group>
                        </div>
                      </Group>
                    </td>
                    <td width={"120px"}>
                      <Group position="center">
                        <Select
                          value={v.status}
                          disabled={
                            cookies &&
                            cookies.currentUser &&
                            cookies.currentUser._id !== v.user._id
                          }
                          data={[
                            {
                              value: "Publish",
                              label: "Publish",
                            },
                            {
                              value: "Draft",
                              label: "Draft",
                            },
                          ]}
                          onChange={(newValue) => {
                            updateMutation.mutate({
                              id: v._id,
                              data: JSON.stringify({
                                status: newValue,
                              }),
                              token: currentUser ? currentUser.token : "",
                            });
                          }}
                        />
                      </Group>
                    </td>
                    <td width={"100px"}>
                      <div>
                        <Group position="center">
                          {v.createdAt
                            ? new Date(v.createdAt).toISOString().split("T")[0]
                            : null}
                        </Group>
                      </div>
                    </td>
                    <td width={"100px"}>
                      <div>
                        <Group position="center">
                          {v ? (
                            <>{Number(v.views).toLocaleString()}</>
                          ) : (
                            <>0 (0)</>
                          )}
                        </Group>
                      </div>
                    </td>
                    <td width={"130px"}>
                      <div>
                        <Group position="center">
                          {v ? (
                            <>
                              {v.likes.length} ({v.unlikes.length})
                            </>
                          ) : (
                            <>0 (0)</>
                          )}
                        </Group>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>
                  <Group position="center">
                    <Text size={16}>No content</Text>
                  </Group>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </ScrollArea>
    </>
  );
};

export default Studio;
