// App.js
import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Style/menu.css"; // 导入CSS文件
import { Link } from "react-router-dom";
import { MdOutlineSubscriptions, MdOutlineVideoLibrary } from "react-icons/md";
import { BiSolidMicrophone } from "react-icons/bi";
import { AiFillHome } from "@react-icons/all-files/ai/AiFillHome";
import { GoHistory } from "@react-icons/all-files/go/GoHistory";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineLocalFireDepartment, MdUpload } from "react-icons/md";
import { IoMusicalNoteOutline } from "@react-icons/all-files/io5/IoMusicalNoteOutline";
import { SiYoutubegaming } from "@react-icons/all-files/si/SiYoutubegaming";
import { ImNewspaper } from "@react-icons/all-files/im/ImNewspaper";
import { GoTrophy } from "react-icons/go";
import { GrAddCircle } from "@react-icons/all-files/gr/GrAddCircle";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { PiFlagThin } from "react-icons/pi";
import { BiVideoPlus } from "react-icons/bi";
import { SiYoutubestudio } from "react-icons/si";

import { PiBell } from "react-icons/pi";
import { GoVideo, GoReport } from "react-icons/go";
import { RiThumbUpLine, RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoIosLogIn } from "react-icons/io";
import { PiUserSquareThin } from "react-icons/pi";
import { IoSettingsOutline } from "@react-icons/all-files/io5/IoSettingsOutline";
import { Menu, rem } from "@mantine/core";
import { UnstyledButton } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

import {
  Container,
  Grid,
  Button,
  Title,
  Divider,
  Image,
  Group,
  Space,
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  ScrollArea,
  Burger,
  useMantineTheme,
  Input,
  Avatar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { addProduct, uploadProductImage } from "./api/video";
import { useCookies } from "react-cookie";
import { useQuery, useMutation } from "@tanstack/react-query";
import Home from "./Home";
import SideBar from "./SideBar";
import MenuLogin from "./MenuLogin";
import SideBarLogin from "./SideBarLogin";
import SignUp from "./SignUp";
import Login from "./Login";
import Video from "./Video";
import { notifications } from "@mantine/notifications";

const App = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [isOpen, { close, open }] = useDisclosure(false);
  const [image, setImage] = useState("");
  const [cookies, setCookies, removeCookies] = useCookies(["currentUser"]);

  const uploadMutation = useMutation({
    mutationFn: uploadProductImage,
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
    <Router>
      <div className="App">
        <AppShell
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          navbar={opened === opened ? <SideBar /> : opened && <SideBar />}
          header={
            <Header height={{ base: 50, md: 70 }} p="md" style={{ border: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <MediaQuery largerThan="sm" styles={{ display: "" }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                  />
                </MediaQuery>
                <Group style={{ width: "100vw" }} position="apart">
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="logo">
                      <Image
                        src="https://www.logo.wine/a/logo/YouTube/YouTube-Logo.wine.svg"
                        alt="YouTube Logo"
                        width="120px"
                        height="56px"
                      />
                    </div>
                  </Link>
                  <div
                    style={{ width: "30%" }}
                    sx={{
                      position: "absolute",
                      left: "0px",
                      right: "0px",
                      margin: " auto",
                      display: "flex",
                      alignItems: " center",
                      justifyContent: "space-between",
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "3px",
                    }}
                  >
                    <Input
                      placeholder="Search"
                      radius="lg"
                      rightSection={<AiOutlineSearch />}
                    />
                  </div>
                  {cookies && cookies.currentUser ? (
                    <Group>
                      {/* <Button
                        variant="subtle"
                        color="gray"
                        radius="xl"
                        component={Link}
                        to="/upload"
                        style={{
                          margin: "8px",
                          padding: "7px",
                        }}
                      >
                        <BiVideoPlus className="Login-Icon" />
                      </Button> */}
                      <Modal
                        opened={isOpen}
                        onClose={close}
                        size="xl"
                        // width={600}
                        title="Upload videos"
                      >
                        <Divider />

                        {image && image !== "" ? (
                          <>
                            <Image
                              src={"http://localhost:8880/" + image}
                              width="50vw"
                              height="50vh"
                            />
                            <Button
                              color="dark"
                              mt="15px"
                              onClick={() => setImage("")}
                            >
                              Remove Image
                            </Button>
                          </>
                        ) : (
                          <Dropzone
                            multiple={false}
                            accept={IMAGE_MIME_TYPE}
                            border="none"
                            onDrop={(files) => {
                              handleImageUpload(files);
                            }}
                          >
                            <Space h="250px" />
                            <Group position="center">
                              <Group
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  background: "#C1C2C5",
                                  borderRadius: "50%",
                                }}
                              >
                                <MdUpload
                                  style={{
                                    margin: "auto",
                                    width: "50px",
                                    height: "50px",
                                  }}
                                />
                              </Group>
                            </Group>
                            <Space h="20px" />
                            <Group position="center">
                              <Text size="xs" fw={500}>
                                Drag and drop video files to upload
                              </Text>
                            </Group>
                            <Group position="center">
                              <Text size="xs" c="dimmed">
                                Your videos will be private until you publish
                                them.
                              </Text>
                            </Group>{" "}
                            <Space h="250px" />
                          </Dropzone>
                        )}
                      </Modal>
                      <Button
                        variant="subtle"
                        color="gray"
                        radius="xl"
                        style={{
                          margin: "8px",
                          padding: "7px",
                        }}
                        onClick={open}
                      >
                        <BiVideoPlus className="Login-Icon" />
                      </Button>
                      <Button
                        variant="subtle"
                        color="gray"
                        radius="xl"
                        component={Link}
                        to="/upload"
                        style={{
                          margin: "8px",
                          padding: "7px",
                        }}
                      >
                        <PiBell className="Login-Icon" />
                      </Button>
                      <Menu shadow="md" width={260}>
                        <Menu.Target>
                          <Button
                            variant="transparent"
                            style={{
                              margin: "8px",
                              padding: "0px",
                            }}
                          >
                            <img
                              src={cookies.currentUser.image}
                              alt="Login Picture"
                              style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "50%",
                              }}
                            />
                          </Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item>
                            <Group>
                              <img
                                src={cookies.currentUser.image}
                                alt="Login Picture"
                                style={{
                                  width: "38px",
                                  height: "38px",
                                  borderRadius: "50%",
                                }}
                              />
                              <div style={{ paddingTop: "8px" }}>
                                <Text size={17}>
                                  {cookies.currentUser.name}
                                </Text>
                                <Text size={8}>@{cookies.currentUser._id}</Text>
                                <Space h="5px" />
                                <Link>Manage your account</Link>
                              </div>
                            </Group>
                          </Menu.Item>
                          <Menu.Divider />
                          <Menu.Item>
                            <Group>
                              <PiUserSquareThin
                                style={{
                                  width: "21px",
                                  height: "20px",
                                  margin: "0",
                                }}
                              />
                              <span
                                style={{
                                  padding: "0",
                                  margin: "0",
                                }}
                              >
                                {" "}
                                Your channel
                              </span>
                            </Group>
                          </Menu.Item>
                          <Menu.Item>
                            <Group>
                              <SiYoutubestudio
                                style={{
                                  width: "21px",
                                  height: "20px",
                                  margin: "0",
                                }}
                              />
                              <span
                                style={{
                                  padding: "0",
                                  margin: "0",
                                }}
                              >
                                {" "}
                                YouTube Studio
                              </span>
                            </Group>
                          </Menu.Item>
                          <Menu.Item>
                            <UnstyledButton
                              variant="transparent"
                              size="sm"
                              onClick={() => {
                                // clear the currentUser cookie to logout
                                removeCookies("currentUser");
                              }}
                            >
                              <Group>
                                <IoIosLogIn
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    margin: "0",
                                  }}
                                />
                                <span
                                  style={{
                                    padding: "0",
                                    margin: "0",
                                  }}
                                >
                                  Sign out
                                </span>
                              </Group>
                            </UnstyledButton>
                          </Menu.Item>
                          <Menu.Divider />
                          <Menu.Item>
                            <Group>
                              <RiMoneyDollarCircleLine
                                style={{
                                  width: "21px",
                                  height: "20px",
                                  margin: "0",
                                }}
                              />
                              <span
                                style={{
                                  padding: "0",
                                  margin: "0",
                                }}
                              >
                                Purchases and memberships
                              </span>
                            </Group>
                          </Menu.Item>
                          <Menu.Divider />
                          <Menu.Item>
                            <Group>
                              <IoSettingsOutline
                                style={{
                                  width: "21px",
                                  height: "20px",
                                  margin: "0",
                                }}
                              />
                              <span
                                style={{
                                  padding: "0",
                                  margin: "0",
                                }}
                              >
                                Settings
                              </span>
                            </Group>
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  ) : (
                    <Button
                      component={Link}
                      to="/login"
                      variant="outline"
                      radius="xl"
                      size="sm"
                      leftIcon={<VscAccount size="20px" p="0px" />}
                      style={{
                        fontStyle: "bolder",
                        padding: "10px 10px",
                        fontWeight: "700",
                        backgroundColor: "transparent",
                        border: "1px solid #E9ECEF",
                        display: "flex",
                        alignItems: "center",
                        gap: "1px",
                      }}
                    >
                      Sign in
                    </Button>
                  )}
                </Group>
              </div>
            </Header>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/watch/:id" element={<Video />} />
          </Routes>
        </AppShell>
      </div>
    </Router>
  );
};

export default App;
