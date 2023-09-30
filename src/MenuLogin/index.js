// Menu.js
// import "../Style/menu.css"; // 导入CSS文件
import { Link } from "react-router-dom";

import {
  AiOutlineClockCircle,
  AiOutlineQuestionCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { BiVideoPlus } from "react-icons/bi";
import { PiBell } from "react-icons/pi";
import { GoVideo, GoReport } from "react-icons/go";
import { RiThumbUpLine, RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoIosLogIn } from "react-icons/io";
import { PiUserSquareThin } from "react-icons/pi";
import { IoSettingsOutline } from "@react-icons/all-files/io5/IoSettingsOutline";
import { Menu, rem } from "@mantine/core";

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
import SideBar from "../SideBar";

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
import VideoCard from "../Card";
import Home from "../Home";

export default function MenuLogin() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <Header height={{ base: 50, md: 70 }} p="md" style={{ border: 0 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
          />
        </MediaQuery>
        <Group style={{ width: "100vw" }} position="apart">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
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
          <Group>
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

            <Menu shadow="md" width={220}>
              <Menu.Target>
                <Button
                  variant="transparent"
                  style={{
                    margin: "8px",
                    padding: "0px",
                  }}
                >
                  <img
                    src="https://yt3.googleusercontent.com/ytc/APkrFKZzSiyU71yAwh4rBvVtCf-kMm2f8JTv0P2RT2rgVw=s900-c-k-c0x00ffffff-no-rj"
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
                      src="https://yt3.googleusercontent.com/ytc/APkrFKZzSiyU71yAwh4rBvVtCf-kMm2f8JTv0P2RT2rgVw=s900-c-k-c0x00ffffff-no-rj"
                      alt="Login Picture"
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                      }}
                    />
                    <div style={{ paddingTop: "4px" }}>
                      <Text size={12}>Sheryn Lee</Text>
                      <Text size={12}>@SherynLee0205</Text>
                    </div>
                  </Group>
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IoIosLogIn style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Messages
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IoIosLogIn style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Gallery
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IoIosLogIn style={{ width: rem(14), height: rem(14) }} />
                  }
                  rightSection={
                    <Text size="xs" c="dimmed">
                      ⌘K
                    </Text>
                  }
                >
                  Search
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IoIosLogIn style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Transfer my data
                </Menu.Item>
                <Menu.Item
                  color="red"
                  leftSection={
                    <IoIosLogIn style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Delete my account
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </div>
    </Header>
  );
}
