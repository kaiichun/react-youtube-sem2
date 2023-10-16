import React, { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {
  Container,
  Title,
  Space,
  Card,
  TextInput,
  Button,
  Group,
  Image,
  LoadingOverlay,
} from "@mantine/core";
import { getVideos, updateVideo, uploadVideoImage } from "../api/video";

function VideoEdit() {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [uploading, setUploading] = useState(false);
  const { isLoading } = useQuery({
    queryKey: ["videos", id],
    queryFn: () => getVideos(id),
    onSuccess: (data) => {
      setTitle(data.title);
      setDescription(data.description);
      setThumbnail(data.thumbnail);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateVideo,
    onSuccess: () => {
      // show add success message
      // 显示添加成功消息
      notifications.show({
        title: "Video is updated successfully",
        color: "green",
      });

      navigate("/studio");
    },
    onError: (error) => {
      console.log(error);
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleupdateVideo = async (event) => {
    // 阻止表单默认提交行为
    event.preventDefault();
    // 使用updateMutation mutation来更新商品信息
    updateMutation.mutate({
      id: id,
      data: JSON.stringify({
        title: title,
        description: description,
        thumbnail: thumbnail,
      }),
      token: currentUser ? currentUser.token : "",
    });
  };

  const uploadMutation = useMutation({
    mutationFn: uploadVideoImage,
    onSuccess: (data) => {
      setThumbnail(data.thumbnail_url);
      setUploading(false);
    },
    onError: (error) => {
      setUploading(false);
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleThumbnailUpload = (files) => {
    uploadMutation.mutate(files[0]);
    setUploading(true);
  };

  return (
    <Container>
      <Space h="50px" />
      <Card withBorder shadow="md" p="20px">
        <LoadingOverlay visible={isLoading} />
        <TextInput
          value={title}
          placeholder="Enter the title at here"
          label="Title"
          onChange={(event) => setTitle(event.target.value)}
        />
        <Space h="20px" />
        <TextInput
          value={description}
          placeholder="Enter the description at here"
          label="Description"
          onChange={(event) => setDescription(event.target.value)}
        />
        <Space h="20px" />
        <span>Thumbnail</span>
        {thumbnail && thumbnail !== "" ? (
          <>
            <Image
              src={"http://10.1.104.3:1205/" + thumbnail}
              width="100%"
              height="50vh"
            />
            <Button color="dark" mt="15px" onClick={() => setThumbnail("")}>
              Remove Image
            </Button>
          </>
        ) : (
          <Dropzone
            multiple={false}
            accept={IMAGE_MIME_TYPE}
            onDrop={(files) => {
              handleThumbnailUpload(files);
            }}
          >
            <Title order={4} align="center" py="20px">
              Click to upload or Drag image to upload
            </Title>
          </Dropzone>
        )}
        <Space h="20px" />

        <Button fullWidth onClick={handleupdateVideo}>
          Update
        </Button>
      </Card>
      <Space h="20px" />
      <Group position="center">
        <Button
          component={Link}
          to="/studio"
          variant="subtle"
          size="xs"
          color="gray"
        >
          Back to Studio
        </Button>
      </Group>
      <Space h="100px" />
    </Container>
  );
}
export default VideoEdit;
