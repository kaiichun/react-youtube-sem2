// App.js
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchVideos, getVideos, addViews } from "../api/video";
import { useCookies } from "react-cookie";
import {
  Container,
  Space,
  TextInput,
  Card,
  Button,
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
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Video() {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [viewCount, setViewCount] = useState(0);
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");
  const [views, setViews] = useState("");
  const [uploading, setUploading] = useState(false);
  const { isLoading, data: v = {} } = useQuery({
    queryKey: ["videos"],
    queryFn: () => getVideos(id),
  });

  const {} = useQuery({
    queryKey: ["views"],
    queryFn: () => addViews(id),
  });

  return (
    <Container fluid>
      <Grid>
        <Grid.Col span={9}>
          <div>
            <Group>
              <video
                width="100%"
                height="720"
                src={"http://localhost:1205/" + v.video}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            </Group>
            <Space h="10px" />
            <Title size={24}> {v.title}</Title>
            <Space h="15px" />
            <Group position="apart">
              <Group>
                {v.user ? (
                  <>
                    <img
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

                <Button>SUBSCRIBE</Button>
              </Group>
              <Group position="right">
                <Button variant="transparent" color="gray" size="md">
                  <RiThumbUpLine /> 12K
                </Button>
                <Button variant="transparent" color="gray" size="md">
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
          <Avatar
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            src="https:/"
          />
        </Group>

        {/* <Group>
            <Text style={{ fontSize: "14px" }}>John Doe 1 day ago</Text>
          </Group> */}

        <Group>
          {" "}
          <TextInput
            value=""
            placeholder="Enter the description here"
            style={{ border: "0px 0px 1px 0 px " }}
          />
        </Group>
      </Group>
    </Container>
  );
}
