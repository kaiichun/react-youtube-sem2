import {
  ScrollArea,
  Container,
  Title,
  Table,
  Group,
  Button,
  Image,
  Space,
  TextInput,
  Divider,
  Grid,
  Text,
  Select,
  LoadingOverlay,
} from "@mantine/core";

import { SlPencil } from "react-icons/sl";
import { CiYoutube } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useHover } from "@mantine/hooks";
import { useCookies } from "react-cookie";
import {
  fetchVideos,
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
      notifications.show({
        title: "Video is updated successfully",
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

  const deleteMutation = useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vid"],
      });
      notifications.show({
        title: "Video is Deleted Successfully",
        color: "grenn",
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
        title: "Video is Deleted Successfully",
        color: "green",
      });
    },
  });

  return (
    <>
      <Title>Channel content</Title>
      <Space h={30} />
      <ScrollArea w={1200} h="auto">
        <table width={1300}>
          <thead>
            <tr>
              <th>Video</th>
              <th></th>
              <th>Visibility</th>
              <th>Date</th>
              <th>Views</th>
              <th>Comment</th>
              <th>Likes (vs. dislikes)</th>
            </tr>
          </thead>
          <tbody>
            {video ? (
              video.map((v) => {
                return (
                  <tr key={v._id}>
                    <td width={"500px"}>
                      <Group>
                        {v.thumbnail && v.thumbnail !== "" ? (
                          <>
                            <Image
                              src={"http://localhost:1205/" + v.thumbnail}
                              width="120px"
                              height="68px"
                            />
                          </>
                        ) : (
                          <Image
                            src={
                              "https://www.aachifoods.com/templates/default-new/images/no-prd.jpg"
                            }
                            width="50px"
                          />
                        )}

                        <div>
                          <Text fw={700}>{v.title}</Text>
                          <Space h="10px" />
                          <Group>
                            <Link
                              to={"/video_edit/" + v._id}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <SlPencil
                                style={{
                                  width: "17px",
                                  height: "20px",
                                }}
                              />
                            </Link>

                            <Link
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
                            </Link>

                            {cookies.currentUser.role === "user" ? (
                              <Link
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
                                    width: "20px",
                                    height: "20px",
                                  }}
                                />
                              </Link>
                            ) : cookies.currentUser.role === "admin" ? (
                              <Link
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
                                    width: "20px",
                                    height: "20px",
                                  }}
                                />
                              </Link>
                            ) : null}
                          </Group>
                        </div>
                      </Group>
                    </td>
                    <td>
                      <select
                        className="form-control"
                        id="user-role"
                        value={v.status}
                        onChange={(newValue) => {
                          updateMutation.mutate({
                            id: v._id,
                            data: JSON.stringify({
                              status: newValue,
                            }),
                            token: currentUser ? currentUser.token : "",
                          });
                        }}
                      >
                        <option value="Draft">Draft</option>
                        <option value="Publish">Publish</option>
                      </select>
                    </td>
                    <td>
                      <div>{v.createdAt}</div>
                    </td>
                    <td>
                      <div>{v.views}</div>
                    </td>
                    <td>
                      <div>{v.comment}asd</div>
                    </td>
                    <td>
                      <div>
                        {v.likes.length} ({v.unlikes.length})
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
