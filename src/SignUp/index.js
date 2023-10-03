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
import { Link, useNavigate } from "react-router-dom";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { notifications } from "@mantine/notifications";
import { registerUser, uploadProfileImage } from "../api/auth";

const SignUp = () => {
  const [cookies, setCookie] = useCookies(["currentUser"]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [visible, { toggle }] = useDisclosure(false);

  // sign up mutation
  const signMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (user) => {
      setCookie("currentUser", user, {
        maxAge: 60 * 60 * 24 * 60, // expire in 14 days
      });
      // redirect to home
      navigate("/");
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });
  // handle submit
  const handleSubmit = () => {
    if (!name || !email || !password || !confirmPassword) {
      notifications.show({
        title: "Please fill in all fields",
        color: "red",
      });
    } else if (password !== confirmPassword) {
      notifications.show({
        title: "Password and Confirm Password not match",
        color: "red",
      });
    } else {
      signMutation.mutate(
        JSON.stringify({
          name: name,
          email: email,
          password: password,
          image: image,
        })
      );
    }
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
            <Space h="20px" />

            <PasswordInput
              value={password}
              placeholder="Password"
              label="Password"
              visible={visible}
              onVisibilityChange={toggle}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              value={email}
              placeholder="Email"
              label="Email"
              required
              onChange={(event) => setEmail(event.target.value)}
            />

            <Space h="20px" />
            <PasswordInput
              value={confirmPassword}
              placeholder="Confirm Password"
              label="Confirm Password"
              visible={visible}
              onVisibilityChange={toggle}
              required
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </Grid.Col>
        </Grid>
        <Space h="40px" />
        <Group position="center">
          <Button onClick={handleSubmit}>Sign up</Button>
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

export default SignUp;
