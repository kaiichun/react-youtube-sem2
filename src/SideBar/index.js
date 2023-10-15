import "../Style/menu.css";
import React from "react";
import { useCookies } from "react-cookie";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineSubscriptions, MdOutlineVideoLibrary } from "react-icons/md";
import { BiChevronDown } from "react-icons/bi";
import { AiFillHome } from "@react-icons/all-files/ai/AiFillHome";
import { GoHistory } from "@react-icons/all-files/go/GoHistory";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { IoMusicalNoteOutline } from "@react-icons/all-files/io5/IoMusicalNoteOutline";
import { SiYoutubegaming } from "@react-icons/all-files/si/SiYoutubegaming";
import { ImNewspaper } from "@react-icons/all-files/im/ImNewspaper";
import { GoTrophy } from "react-icons/go";
import { GrAddCircle } from "@react-icons/all-files/gr/GrAddCircle";
import { IoSettingsOutline } from "@react-icons/all-files/io5/IoSettingsOutline";
import { PiFlagThin } from "react-icons/pi";
import { GoReport } from "@react-icons/all-files/go/GoReport";
import {
  Container,
  Button,
  Title,
  Divider,
  Image,
  Group,
  Space,
  Navbar,
  ScrollArea,
} from "@mantine/core";
import { getUser } from "../api/auth";

export default function SideBar() {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const { id } = useParams();
  const { isLoading, data: users } = useQuery({
    queryKey: ["auth", id],
    queryFn: () => getUser(id),
  });

  return (
    <Navbar width={{ base: 280 }} style={{ border: 0 }}>
      {/* 这里是小屏幕版本的导航栏内容 */}
      <ScrollArea scrollbarSize={10} scrollHideDelay={10}>
        <Container>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="item">
              <AiFillHome className="Menu-Icon" />
              Home
            </div>
          </Link>

          <Link style={{ textDecoration: "none", color: "inherit" }}>
            <div className="item">
              <MdOutlineSubscriptions className="Menu-Icon" />
              Subscriptions
            </div>
          </Link>

          <Divider mt="6px" mb="6px" />

          <Link style={{ textDecoration: "none", color: "inherit" }}>
            <div className="item">
              <MdOutlineVideoLibrary className="Menu-Icon" />
              Library
            </div>
          </Link>
          <Link style={{ textDecoration: "none", color: "inherit" }}>
            <div className="item">
              <GoHistory className="Menu-Icon" />
              History
            </div>
          </Link>

          <Divider mt="6px" mb="6px" />

          <Title order={6} style={{ paddingLeft: "12px" }}>
            Subscriptions
          </Title>
          {cookies && cookies.currentUser ? (
            <>
              <Link style={{ textDecoration: "none", color: "inherit" }}>
                <div className="item">
                  <img
                    src={"http://localhost:1205/" + cookies.currentUser.image}
                    alt="Login Picture"
                    className="Channel-Icon"
                    style={{
                      paddingTop: "2px",
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                    }}
                  />
                  {cookies.currentUser.name}
                </div>

                {cookies.currentUser.subscribedUsers &&
                cookies.currentUser.subscribedUsers.length > 0 ? (
                  <div className="subscribed-users">
                    {cookies.currentUser.subscribedUsers
                      .slice(0, 6)
                      .map((user, index) => (
                        <div key={index} className="subscribed-user">
                          <Link
                            to={"/channel/" + user._id}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                            }}
                          >
                            <div className="item">
                              <img
                                src={"http://localhost:1205/" + user.image}
                                alt="Login Picture"
                                className="Channel-Icon"
                                style={{
                                  paddingTop: "2px",
                                  width: "26px",
                                  height: "26px",
                                  borderRadius: "50%",
                                }}
                              />
                              {user.name}
                            </div>
                          </Link>
                        </div>
                      ))}
                    {cookies.currentUser.subscribedUsers.length > 6 ? (
                      <div className="show-more-button">
                        <button>Show More</button>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </Link>
              <div className="item">
                <BiChevronDown className="Menu-Icon" />
                Show More
              </div>
            </>
          ) : (
            <>
              <div className="login" style={{ paddingLeft: "12px" }}>
                <p>
                  Sign in to like videos,
                  <br /> comment, and subscribe.{" "}
                </p>
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
                    width: "100px",
                    backgroundColor: "transparent",
                    border: "1px solid #E9ECEF",
                    display: "flex",
                    alignItems: "center",
                    gap: "1px",
                  }}
                >
                  Sign in
                </Button>
              </div>
            </>
          )}

          <Divider mt="8px" mb="10px" />
          <Title className="title" order={6} style={{ paddingLeft: "12px" }}>
            Explore
          </Title>
          <Link style={{ textDecoration: "none", color: "inherit" }}>
            <div className="item">
              <MdOutlineLocalFireDepartment className="Menu-Icon" />
              Trending
            </div>
          </Link>
          <Link style={{ textDecoration: "none", color: "inherit" }}>
            <div className="item">
              <IoMusicalNoteOutline className="Menu-Icon" />
              Music
            </div>
          </Link>
          <Link style={{ textDecoration: "none", color: "inherit" }}>
            <div className="item">
              <GoTrophy className="Menu-Icon" />
              Sports
            </div>
          </Link>
          <Link style={{ textDecoration: "none", color: "inherit" }}>
            <div className="item">
              <SiYoutubegaming className="Menu-Icon" />
              Gaming
            </div>
          </Link>
          <Link style={{ textDecoration: "none", color: "inherit" }}>
            <div className="item">
              <ImNewspaper className="Menu-Icon" />
              News
            </div>
          </Link>
          {cookies && cookies.currentUser ? null : (
            <>
              <Divider mt="8px" mb="10px" />
              <div className="item">
                <GrAddCircle className="Menu-Icon" />
                Browser Channel
              </div>
            </>
          )}
          <Divider mt="8px" mb="10px" />
          <div className="title">
            <Title order={5} style={{ paddingLeft: "6px" }}>
              More from YouTube
            </Title>
          </div>
          <div className="item">
            <Link
              to="https://www.youtube.com/premium"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="logo">
                <Group>
                  <Image
                    src="https://static.vecteezy.com/system/resources/thumbnails/024/983/601/small/youtube-logo-transparent-free-png.png"
                    alt="YouTube Premium Logo"
                    width="24px"
                    height="22px"
                    style={{ paddingLeft: "2px", paddingRight: "14px" }}
                  />
                  YouTube Premium
                </Group>
              </div>
            </Link>
          </div>
          <Divider mt="8px" mb="10px" />
          <Link
            to="https://support.google.com/youtube/answer/2976814?hl=en"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="item">
              <IoSettingsOutline className="Menu-Icon" />
              Settings
            </div>
          </Link>
          <Link
            to="https://www.youtube.com/reporthistory"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="item">
              <PiFlagThin className="Menu-Icon" />
              Report
            </div>
          </Link>
          <Link
            to="https://support.google.com/youtube/?hl=en&sjid=8798751577450272532-AP#topic=9257498"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="item">
              <GoReport className="Menu-Icon" />
              Help
            </div>
          </Link>
          <Space h="20px" />
          <Container
            sx={{
              paddingLeft: "20px",
            }}
          >
            <Group fz="xs" p="0" pb="0" pt="0" mt="0">
              <Link
                to="https://about.youtube/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span sx={{ color: "#606060" }}>About</span>
              </Link>
              <Link
                to="https://blog.youtube/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span sx={{ color: "#606060" }}>Press</span>
              </Link>
              <Link
                to="https://www.youtube.com/howyoutubeworks/policies/copyright/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span sx={{ color: "#606060" }}>Copyright</span>
              </Link>
            </Group>
            <Group fz="xs" p="0" pb="0" pt="0" mt="0">
              <Link
                to="https://www.youtube.com/t/contact_us/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span sx={{ color: "#606060" }}>Contact us</span>
              </Link>
              <Link
                to="https://www.youtube.com/creators/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span sx={{ color: "#606060" }}>Creators</span>
              </Link>
              <Link
                to="https://www.youtube.com/ads/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span sx={{ color: "#606060" }}>Advertise</span>
              </Link>
            </Group>
            <Group fz="xs" p="0" pb="0" pt="0" mt="0">
              <Link
                to="https://developers.google.com/youtube"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span sx={{ color: "#606060" }}>Developers</span>
              </Link>
            </Group>
            <Space h="10px" />
            <Group fz="xs" p="0" pb="0" pt="0" mt="0">
              <Link
                to="https://www.youtube.com/t/terms"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span sx={{ color: "#606060", margin: "0px 1px 0px 0px" }}>
                  Terms
                </span>
              </Link>
              <Link
                to="https://policies.google.com/privacy?hl=en"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span sx={{ color: "#606060", margin: "0px 1px  px 0px 0px" }}>
                  Privacy
                </span>
              </Link>
              <Link
                to="https://www.youtube.com/howyoutubeworks/policies/community-guidelines/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span sx={{ color: "#606060", margin: "0px 2px 0px 0px" }}>
                  Policy & Safety
                </span>
              </Link>
            </Group>
            <Group fz="xs" p="0" pb="0" pt="0" mt="0">
              <Link
                to="https://www.youtube.com/howyoutubeworks/?utm_campaign=ytgen&utm_source=ythp&utm_medium=LeftNav&utm_content=txt&u=https%3A%2F%2Fwww.youtube.com%2Fhowyoutubeworks%3Futm_source%3Dythp%26utm_medium%3DLeftNav%26utm_campaign%3Dytgen"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span sx={{ color: "#606060", margin: "0px 1px 0px 0px" }}>
                  How YouTube works
                </span>
              </Link>
            </Group>
            <Group fz="xs" p="0" pb="0" pt="0" mt="0">
              <Link
                to="https://www.youtube.com/new"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span sx={{ color: "#606060", margin: "0px 1px 0px 0px" }}>
                  Test new features
                </span>
              </Link>
            </Group>
            <Space h="20px" />
            <div>
              <span
                style={{
                  color: "gray",
                  fontSize: "14px",
                  textDecorationStyle: "blod",
                }}
              >
                &copy; 2023 Google LLC
              </span>
            </div>
            <Space h="30px" />
          </Container>
        </Container>
      </ScrollArea>
    </Navbar>
  );
}
