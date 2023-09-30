// Menu.js
import "../Style/menu.css"; // 导入CSS文件
import { Link } from "react-router-dom";
import { MdOutlineSubscriptions, MdOutlineVideoLibrary } from "react-icons/md";
import { BiSolidMicrophone } from "react-icons/bi";
import { AiFillHome } from "@react-icons/all-files/ai/AiFillHome";
import { GoHistory } from "@react-icons/all-files/go/GoHistory";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { IoMusicalNoteOutline } from "@react-icons/all-files/io5/IoMusicalNoteOutline";
import { SiYoutubegaming } from "@react-icons/all-files/si/SiYoutubegaming";
import { ImNewspaper } from "@react-icons/all-files/im/ImNewspaper";
import { GoTrophy } from "react-icons/go";
import { GrAddCircle } from "@react-icons/all-files/gr/GrAddCircle";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { IoSettingsOutline } from "@react-icons/all-files/io5/IoSettingsOutline";
import { PiFlagThin } from "react-icons/pi";
import { GoReport } from "@react-icons/all-files/go/GoReport";
import {
  Container,
  Grid,
  Button,
  Title,
  Divider,
  Image,
  Group,
  Space,
} from "@mantine/core";
import Home from "../Home";

import React, { useState, useEffect } from "react";
import {
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
} from "@mantine/core";

export default function SideBar() {
  return (
    <Navbar width={{ base: 300 }} style={{ border: 0 }}>
      {/* 这里是小屏幕版本的导航栏内容 */}
      <ScrollArea scrollbarSize={10} scrollHideDelay={10}>
        <Container>
          <div className="item">
            <AiFillHome className="Menu-Icon" />
            Home
          </div>
          <div className="item">
            <MdOutlineSubscriptions className="Menu-Icon" />
            Subscriptions
          </div>
          <Divider mt="6px" mb="6px" />
          <div className="item">
            <MdOutlineVideoLibrary className="Menu-Icon" />
            Library
          </div>
          <div className="item">
            <GoHistory className="Menu-Icon" />
            History
          </div>
          <Divider mt="6px" mb="6px" />
          <div className="login" style={{ paddingLeft: "12px" }}>
            <p>
              Sign in to like videos,
              <br /> comment, and subscribe.{" "}
            </p>
            <Button
              component={Link}
              to="/signin"
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
          <Divider mt="8px" mb="10px" />
          <Title className="title" order={6} style={{ paddingLeft: "12px" }}>
            Explore
          </Title>
          <div className="item">
            <MdOutlineLocalFireDepartment className="Menu-Icon" />
            Trading
          </div>
          <div className="item">
            <IoMusicalNoteOutline className="Menu-Icon" />
            Music
          </div>
          <div className="item">
            <GoTrophy className="Menu-Icon" />
            Sports
          </div>
          <div className="item">
            <SiYoutubegaming className="Menu-Icon" />
            Gaming
          </div>
          <div className="item">
            <ImNewspaper className="Menu-Icon" />
            News
          </div>
          <hr className="hr" />
          <div className="item">
            <GrAddCircle className="Menu-Icon" />
            Browser Channel
          </div>
          <hr className="hr" />
          <div className="title">
            <Title order={5} style={{ paddingLeft: "6px" }}>
              More from YouTube
            </Title>
          </div>
          <div className="item">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
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
          <hr className="hr" />
          <div className="item">
            <IoSettingsOutline className="Menu-Icon" />
            Settings
          </div>
          <div className="item">
            <PiFlagThin className="Menu-Icon" />
            Report
          </div>
          <div className="item">
            <GoReport className="Menu-Icon" />
            Help
          </div>
          <Space h="20px" />
          <Container
            sx={{
              paddingLeft: "20px",
            }}
          >
            <Group fz="xs" p="0" pb="0" pt="0" mt="0">
              <span sx={{ color: "#606060" }}>About</span>
              <span sx={{ color: "#606060" }}>Press</span>
              <span sx={{ color: "#606060" }}>Copyright</span>
            </Group>
            <Group fz="xs" p="0" pb="0" pt="0" mt="0">
              <span sx={{ color: "#606060" }}>Contact us</span>
              <span sx={{ color: "#606060" }}>Creators</span>
              <span sx={{ color: "#606060" }}>Advertise</span>
            </Group>
            <Group fz="xs" p="0" pb="0" pt="0" mt="0">
              <span sx={{ color: "#606060" }}>Developers</span>
            </Group>
            <Space h="10px" />
            <Group fz="xs" p="0" pb="0" pt="0" mt="0">
              <span sx={{ color: "#606060", margin: "0px 1px 0px 0px" }}>
                Terms
              </span>
              <span sx={{ color: "#606060", margin: "0px 1px  px 0px 0px" }}>
                Privacy
              </span>
              <span sx={{ color: "#606060", margin: "0px 2px 0px 0px" }}>
                Policy & Safety
              </span>
            </Group>
            <Group fz="xs" p="0" pb="0" pt="0" mt="0">
              <span sx={{ color: "#606060", margin: "0px 1px 0px 0px" }}>
                How Streamy works
              </span>
              <span sx={{ color: "#606060", margin: "0px 1px 0px 0px" }}>
                Test new features
              </span>
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
