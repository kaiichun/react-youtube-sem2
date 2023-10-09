// App.js
import {
  Container,
  Space,
  TextInput,
  Card,
  Button,
  Image,
  Group,
  Grid,
  PasswordInput,
  Text,
  Title,
  Avatar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { notifications } from "@mantine/notifications";
import {
  getUser,
  registerUser,
  updateUser,
  uploadProfileImage,
} from "../api/auth";
import { useQuery, useMutation } from "@tanstack/react-query";

const UserEdit = () => {
  const { id } = useParams();
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const [name, setName] = useState(currentUser ? currentUser.name : "");
  const [email, setEmail] = useState(currentUser ? currentUser.email : "");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [visible, { toggle }] = useDisclosure(false);
  const { isLoading } = useQuery({
    queryKey: ["auth", id],
    queryFn: () => getUser(id),
    onSuccess: (data) => {
      setName(data.name);
      setEmail(data.email);
      setImage(data.image);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      notifications.show({
        title: "User is updated successfully",
        color: "green",
      });
      navigate("/");
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleUserUpdate = async (event) => {
    // 阻止表单默认提交行为
    event.preventDefault();
    // 使用updateMutation mutation来更新商品信息
    updateUserMutation.mutate({
      id: id,
      data: JSON.stringify({
        name: name,
        email: email,
        image: image,
      }),
      token: currentUser ? currentUser.token : "",
    });
  };

  const uploadMutation = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: (data) => {
      setImage(data.image_url);
      notifications.show({
        title: "Image uploaded successfully",
        color: "yellow",
      });
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleImageUpload = (files) => {
    uploadMutation.mutate(files[0]);
  };

  return (
    <Container>
      <Space h="120px" />
      <Card
        withBorder
        // shadow="lg"
        p="20px"
        mx="auto"
        sx={{
          maxWidth: "500px",
        }}
      >
        <Space h="20px" />
        <Group position="center">
          <Avatar
            src={
              "https://compote.slate.com/images/2f2fc6b0-96b7-4bf7-812a-dcaa8c6ce3d6.gif"
            }
            style={{ width: "120px", height: "40px" }}
          ></Avatar>
        </Group>
        <Title order={4} align="center">
          Create a Google Account
        </Title>
        <Text align="center">Enter your details</Text>
        <Space h="20px" />
        <Grid gutter={20}>
          <Grid.Col span={12}>
            <Group position="center">
              {image && image !== "" ? (
                <>
                  <Image
                    src={"http://localhost:1205/" + image}
                    style={{ borderRadius: "50%", width: "130px" }}
                  />
                  <Button color="dark" mt="15px" onClick={() => setImage("")}>
                    Remove Image
                  </Button>
                </>
              ) : (
                <Dropzone
                  multiple={false}
                  accept={IMAGE_MIME_TYPE}
                  onDrop={(files) => {
                    handleImageUpload(files);
                  }}
                  style={{ borderRadius: "50%", width: "130px" }}
                >
                  <Title placeholder="Name" order={6} align="center" py="20px">
                    Click to upload image
                  </Title>
                </Dropzone>
              )}
            </Group>
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              value={name}
              placeholder="Name"
              label="Name"
              required
              onChange={(event) => setName(event.target.value)}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              value={email}
              disabled
              placeholder="Email"
              label="Email"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </Grid.Col>
        </Grid>
        <Space h="40px" />
        <Group position="center">
          <Button fullWidth onClick={handleUserUpdate}>
            Update
          </Button>
        </Group>
        <Space h="20px" />
      </Card>
      <Space h="10px" />
      <Group
        position="apart"
        mx="auto"
        sx={{
          maxWidth: "500px",
        }}
      >
        <Button
          component={Link}
          to="/login"
          variant="subtle"
          size="xs"
          color="gray"
        >
          Already have account
        </Button>
        <Button component={Link} to="/" variant="subtle" size="xs" color="gray">
          Go back
        </Button>
      </Group>
    </Container>
  );
};

export default UserEdit;
