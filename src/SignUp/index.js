import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  Container,
  Space,
  TextInput,
  Card,
  Button,
  Group,
  Grid,
  PasswordInput,
  Text,
  Title,
  Avatar,
} from "@mantine/core";
import { registerUser } from "../api/auth";

const SignUp = () => {
  const [cookies, setCookie] = useCookies(["currentUser"]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [visible, { toggle }] = useDisclosure(false);

  // sign up mutation
  const signMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (user) => {
      setCookie("currentUser", user, {
        maxAge: 60 * 60 * 24 * 60, // expire in 14 days
      });
      queryClient.invalidateQueries({
        queryKey: ["signup"],
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
        })
      );
    }
  };

  return (
    <Container>
      <Space h="120px" />
      <Card
        withBorder
        p="20px"
        mx="auto"
        sx={{
          maxWidth: "500px",
        }}
      >
        <Space h="20px" />
        <Group position="center">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Avatar
              src={
                "https://compote.slate.com/images/2f2fc6b0-96b7-4bf7-812a-dcaa8c6ce3d6.gif"
              }
              style={{ width: "140px", height: "50px" }}
            ></Avatar>
          </Link>
        </Group>
        <Title order={4} align="center">
          Create a Google Account
        </Title>
        <Text align="center">Enter your details</Text>
        <Space h="20px" />
        <Grid gutter={20}>
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
