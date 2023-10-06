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
// import Header from "../Header";
import { useCookies } from "react-cookie";
import { fetchVideos, deleteVideo, updateVideo } from "../api/video";

const Studio = () => {
  const [cookies] = useCookies(["currentUser"]);
  const { hovered, ref } = useHover();
  const { currentUser } = cookies;
  const queryClient = useQueryClient();
  const { isLoading, data: videos } = useQuery({
    queryKey: ["videos"],
    queryFn: () => fetchVideos(currentUser ? currentUser.token : ""),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["videos"],
      });
      notifications.show({
        title: "Video is Deleted Successfully",
        color: "grenn",
      });
    },
  });

  return (
    <>
      <Title>Channel content</Title>
      <Space h={30} />
      <ScrollArea w={1000} h="auto">
        <Table width={1400}>
          <thead>
            <tr>
              <th>Video</th>
              <th>Visibility</th>
              <th>Date</th>
              <th>Views</th>
              <th>Comment</th>
              <th>Likes (vs. dislikes)</th>
            </tr>
          </thead>
          <tbody>
            {videos
              ? videos.map((v) => {
                  return (
                    <tr key={v._id}>
                      <td>
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
                            </Group>
                          </div>
                        </Group>
                      </td>
                      {/* <td>${v.totalPrice}</td>
                      <td>
                        <Select
                          value={v.status}
                          disabled={v.status === "Pending"}
                          data={[
                            {
                              value: "Pending",
                              label: "Pending",
                              disabled: true,
                            },
                            { value: "Paid", label: "Paid" },
                            { value: "Failed", label: "Failed" },
                            { value: "Shipped", label: "Shipped" },
                            { value: "Delivered", label: "Delivered" },
                          ]}
                        />
                      </td> */}
                      <td>
                        <div>{v.createdAt}</div>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </ScrollArea>
    </>
  );
};

export default Studio;
