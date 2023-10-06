import {
  PasswordInput,
  TextInput,
  Group,
  Container,
  Title,
  Text,
  Space,
  Button,
  Card,
  Avatar,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function Login() {
  const [cookies, setCookie] = useCookies(["currentUser"]);
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      // store user data into cookies
      setCookie("currentUser", user, {
        maxAge: 60 * 60 * 24 * 30,
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

  const handleSubmit = () => {
    // make sure email & password are not empty.
    if (!email || !password) {
      notifications.show({
        title: "Please fill in both email and password.",
        color: "red",
      });
    } else {
      loginMutation.mutate(
        JSON.stringify({
          email: email,
          password: password,
        })
      );
    }
  };

  return (
    <Container>
      <Space h="160px" />
      <Card
        withBorder
        mx="auto"
        sx={{
          maxWidth: "500px",
        }}
      >
        <Space h="30px" />
        <Group position="center">
          <Avatar
            src={
              "https://compote.slate.com/images/2f2fc6b0-96b7-4bf7-812a-dcaa8c6ce3d6.gif"
            }
            style={{ width: "120px", height: "40px" }}
          ></Avatar>
        </Group>
        <Title order={4} align="center">
          Sign in
        </Title>
        <Text align="center">to continue to YouTube</Text>
        <Space h="30px" />
        <TextInput
          value={email}
          placeholder="Email"
          required
          style={{ marginLeft: "40px", marginRight: "40px" }}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Space h="15px" />
        <PasswordInput
          value={password}
          placeholder="Password"
          required
          style={{ marginLeft: "40px", marginRight: "40px" }}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Space h="30px" />
        <Group
          position="apart"
          style={{ marginLeft: "40px", marginRight: "40px" }}
        >
          <Button
            variant="subtle"
            color="rgba(73, 178, 252, 1)"
            component={Link}
            to="/signup"
            size="xs"
            radius="xs"
          >
            Create account
          </Button>

          <Button size="xs" radius="sm" onClick={handleSubmit}>
            Login
          </Button>
        </Group>
        <Space h="100px" />
      </Card>
      <Group
        position="right"
        mx="auto"
        sx={{
          maxWidth: "500px",
          paddingRight: "8px",
          paddingTop: "10px",
          textDecorationLine: "none",
        }}
      >
        <Button
          variant="subtle"
          color="gray"
          component={Link}
          to="https://support.google.com/accounts?hl=en&visit_id=638318542210869798-2506381406&rd=2&p=account_iph#topic=3382296"
          size="xs"
          radius="xs"
        >
          Help
        </Button>
        <Button
          variant="subtle"
          color="gray"
          component={Link}
          to="https://policies.google.com/privacy?gl=MY&hl=en"
          size="xs"
          radius="xs"
        >
          Privacy
        </Button>
        <Button
          variant="subtle"
          color="gray"
          component={Link}
          to="https://policies.google.com/terms?gl=MY&hl=en"
          size="xs"
          radius="xs"
        >
          Terms
        </Button>
      </Group>
    </Container>
  );
}
