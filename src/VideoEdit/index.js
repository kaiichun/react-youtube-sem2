import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Title,
  Space,
  Card,
  TextInput,
  NumberInput,
  Divider,
  Button,
  Group,
  Image,
  LoadingOverlay,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Link, useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getVideos, updateVideo, uploadVideoImage } from "../api/video";
import { useCookies } from "react-cookie";

function VideoEdit() {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");
  const [uploading, setUploading] = useState(false);
  const { isLoading } = useQuery({
    queryKey: ["videos", id],
    queryFn: () => getVideos(id),
    onSuccess: (data) => {
      setTitle(data.title);
      setDescription(data.description);
      setThumbnail(data.thumbnail);
      setVideo(data.video);
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
        video: video,
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
      notifications.show({
        title: "Thumbnail uploaded successfully",
        color: "yellow",
      });
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
          placeholder="Enter the product name here"
          label="Name"
          description="The name of the product"
          withAsterisk
          onChange={(event) => setTitle(event.target.value)}
        />
        <Space h="20px" />
        <TextInput
          value={description}
          placeholder="Enter the product name here"
          label="Description"
          description="The name of the product"
          withAsterisk
          onChange={(event) => setDescription(event.target.value)}
        />
        <Space h="20px" />
        {thumbnail && thumbnail !== "" ? (
          <>
            <Image
              src={"http://localhost:1205/" + thumbnail}
              width="50vw"
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
          Go back to Home
        </Button>
      </Group>
      <Space h="100px" />
    </Container>
  );
}
export default VideoEdit;
