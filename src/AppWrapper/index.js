import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../Style/menu.css"; // 导入CSS文件
import { Link } from "react-router-dom";
import { MdOutlineSubscriptions, MdOutlineVideoLibrary } from "react-icons/md";
import { BiSolidMicrophone } from "react-icons/bi";
import { AiFillHome } from "@react-icons/all-files/ai/AiFillHome";
import { GoHistory } from "@react-icons/all-files/go/GoHistory";
import { VscAccount } from "react-icons/vsc";
import { RiUploadLine } from "react-icons/ri";

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
import { IoSettingsOutline } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";

import { PiUserSquareThin } from "react-icons/pi";

import { Menu, rem } from "@mantine/core";
import { UnstyledButton } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone";

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
  TextInput,
  NativeSelect,
  Avatar,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import {
  addProduct,
  addVideoDetails,
  addVideoImage,
  addVideo,
  uploadVideoImage,
  uploadVideo,
  fetchVideos,
} from "../api/video";
import { useCookies } from "react-cookie";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SideBar from "../SideBar";

import { notifications } from "@mantine/notifications";

const AppWrapper = ({ children }) => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [isOpen, { close, open }] = useDisclosure(false);
  const videoRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");
  const [status, setStatus] = useState("Draft");
  const [cookies, setCookies, removeCookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const queryClient = useQueryClient();

  const searchVideoMutation = useMutation({
    mutationFn: fetchVideos,
    onSuccess: (data) => {
      queryClient.setQueryData(["videos"], data);
      navigate("/");
    },
  });

  // // create mutation};
  const createMutation = useMutation({
    mutationFn: addVideoDetails,
    onSuccess: () => {
      notifications.show({
        title: "New Video Added",
        color: "green",
      });
      close();
      navigate("/studio");
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleAddNewVideo = async (event) => {
    event.preventDefault();
    createMutation.mutate({
      data: JSON.stringify({
        title: title,
        description: description,
        video: video,
        thumbnail: thumbnail,
        status: status,
      }),
      token: currentUser ? currentUser.token : "",
    });
    setTitle("");
    setDescription("");
    setVideo("");
    setThumbnail("");
  };

  const uploadThumbnailMutation = useMutation({
    mutationFn: uploadVideoImage,
    onSuccess: (data) => {
      setThumbnail(data.thumbnail_url);
      notifications.show({
        title: "Thumbnail uploaded successfully",
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

  const handleThumbnailUpload = (files) => {
    uploadThumbnailMutation.mutate(files[0]);
  };

  const uploadVideoMutation = useMutation({
    mutationFn: uploadVideo,
    onSuccess: (data) => {
      setVideo(data.video_url);
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

  const handleVideoUpload = (files) => {
    console.log(files);
    uploadVideoMutation.mutate(files[0]);
  };

  // useEffect(() => {
  //   let newList = video ? [...video] : [];

  //   if (searchTerm) {
  //     newList = newList.filter(
  //       (i) => i.title.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
  //     );
  //   }

  //   setCurrentVideo(newList);
  // }, [video, searchTerm]);

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={opened ? null : <SideBar />}
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
              />
            </MediaQuery>
            <Group style={{ width: "100vw" }} position="apart">
              <div className="col-sm-3 col-md-6">
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="logo">
                    <Image
                      src="https://images.squarespace-cdn.com/content/v1/5b9808cd3c3a53afb68435ff/1542829121850-V9O5PVS46SH13CE7OF88/star_spangled_yoodle_1920x600_v2.gif"
                      alt="YouTube Logo"
                      width="100px"
                      height="40px"
                    />
                  </div>
                </Link>
              </div>

              <div
                style={{ width: "30%" }}
                className="col-sm-3 col-md-6"
                sx={{
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
                  type="text"
                  onChange={(e) => {
                    searchVideoMutation.mutate(e.target.value);
                  }}
                  placeholder="Search"
                  radius="lg"
                  rightSection={<AiOutlineSearch />}
                />
              </div>
              <div className="col-sm-3 col-md-6">
                {cookies && cookies.currentUser ? (
                  <Group>
                    <Menu shadow="md" width={180}>
                      <Menu.Target>
                        <Button
                          variant="subtle"
                          color="gray"
                          radius="xl"
                          style={{
                            margin: "8px",
                            padding: "7px",
                          }}
                        >
                          <BiVideoPlus className="Login-Icon" />
                        </Button>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item>
                          <UnstyledButton
                            variant="transparent"
                            size="sm"
                            onClick={open}
                          >
                            <Group>
                              <RiUploadLine
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
                                Upload video
                              </span>
                            </Group>
                          </UnstyledButton>
                        </Menu.Item>
                        <Menu.Item>
                          <UnstyledButton
                            variant="transparent"
                            size="sm"
                            component={Link}
                            to={"/channel/" + cookies.currentUser._id}
                          >
                            <Group>
                              <IoCreateOutline
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
                                Create post
                              </span>
                            </Group>
                          </UnstyledButton>
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>

                    <Modal
                      opened={isOpen}
                      onClose={close}
                      size="xl"
                      width={700}
                      title="Upload videos"
                    >
                      {video && video !== "" ? (
                        <>
                          <Title order={4}>Details</Title>
                          <Group position="apart">
                            <Grid>
                              <Grid.Col md={12} lg={9} sm={12}>
                                <div className="">
                                  <TextInput
                                    label="Title"
                                    value={title}
                                    onChange={(event) =>
                                      setTitle(event.target.value)
                                    }
                                  />
                                  <TextInput
                                    label="Description"
                                    value={description}
                                    onChange={(event) =>
                                      setDescription(event.target.value)
                                    }
                                  />{" "}
                                  <Text>Thumbnail</Text>
                                  {thumbnail && thumbnail !== "" ? (
                                    <>
                                      <Image
                                        src={
                                          "http://localhost:1205/" + thumbnail
                                        }
                                        width="340px"
                                        height="220px"
                                      />
                                      <Button
                                        color="dark"
                                        mt="15px"
                                        mb="15px"
                                        onClick={() => setThumbnail("")}
                                      >
                                        Remove
                                      </Button>
                                    </>
                                  ) : (
                                    <Dropzone
                                      multiple={false}
                                      accept={IMAGE_MIME_TYPE}
                                      h={100}
                                      onDrop={(files) => {
                                        handleThumbnailUpload(files);
                                      }}
                                    >
                                      <Title order={6} align="center" py="20px">
                                        Upload thumbnail
                                      </Title>
                                    </Dropzone>
                                  )}
                                  <div>
                                    <span>Visibility : </span>
                                    <select
                                      className="form-control"
                                      id="user-role"
                                      value={status}
                                      onChange={(event) => {
                                        setStatus(event.target.value);
                                      }}
                                    >
                                      <option value="Draft">Draft</option>
                                      <option value="Publish">Publish</option>
                                    </select>
                                  </div>
                                </div>
                              </Grid.Col>
                              <Grid.Col md={12} lg={3} sm={12}>
                                <Space h={20} />
                                <Title order={6}>Video Preview</Title>
                                <Group>
                                  <video ref={videoRef} controls height="180">
                                    <source
                                      src={"http://localhost:1205/" + video}
                                      type="video/mp4"
                                      frameborder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowfullscreen
                                    />
                                  </video>
                                </Group>
                              </Grid.Col>
                              <Space h="20px" />
                            </Grid>
                          </Group>
                          <Group position="right">
                            <Button
                              mt="15px"
                              onClick={handleAddNewVideo}
                              // onClick={() => {
                              //   handleAddNewVideo.clean();
                              // }}
                            >
                              Publish
                            </Button>
                          </Group>
                        </>
                      ) : (
                        //

                        <Dropzone
                          multiple={false}
                          accept={[MIME_TYPES.mp4]}
                          border="none"
                          onDrop={(files) => {
                            handleVideoUpload(files);
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
                          </Group>
                          <Space h="250px" />
                        </Dropzone>
                      )}
                    </Modal>

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
                            src={
                              "http://localhost:1205/" +
                              cookies.currentUser.image
                            }
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
                              src={
                                "http://localhost:1205/" +
                                cookies.currentUser.image
                              }
                              alt="Login Picture"
                              style={{
                                width: "38px",
                                height: "38px",
                                borderRadius: "50%",
                              }}
                            />
                            <div style={{ paddingTop: "8px" }}>
                              <UnstyledButton
                                variant="transparent"
                                size="sm"
                                component={Link}
                                to={"/user_info/" + cookies.currentUser._id}
                              >
                                <Text size={17}>
                                  {cookies.currentUser.name}
                                </Text>
                                <Text size={8}>@{cookies.currentUser._id}</Text>
                                <Space h="5px" />
                                <Link
                                  to={"/user_info/" + cookies.currentUser._id}
                                >
                                  Manage your account
                                </Link>
                              </UnstyledButton>
                            </div>
                          </Group>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item>
                          <UnstyledButton
                            variant="transparent"
                            size="sm"
                            component={Link}
                            to={"/channel/" + cookies.currentUser._id}
                          >
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
                          </UnstyledButton>
                        </Menu.Item>
                        <Menu.Item>
                          <UnstyledButton
                            variant="transparent"
                            size="sm"
                            component={Link}
                            to="/studio"
                          >
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
                                YouTube Studio
                              </span>
                            </Group>
                          </UnstyledButton>
                        </Menu.Item>
                        <Menu.Item>
                          <UnstyledButton
                            variant="transparent"
                            size="sm"
                            onClick={() => {
                              // clear the currentUser cookie to logout
                              removeCookies("currentUser");
                              navigate("/login");
                              console.log("User logged out");
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
                          <UnstyledButton
                            variant="transparent"
                            size="sm"
                            component={Link}
                            to="https://www.youtube.com/premium"
                          >
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
                                Purchases memberships
                              </span>
                            </Group>
                          </UnstyledButton>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item>
                          <UnstyledButton
                            variant="transparent"
                            size="sm"
                            component={Link}
                            to="https://support.google.com/youtube/answer/2976814?hl=en"
                          >
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
                          </UnstyledButton>
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
              </div>
            </Group>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default AppWrapper;
