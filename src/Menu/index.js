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

export default function Menu() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={opened === false ? <SideBar /> : opened && <SideBar />}
      header={
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
                  backgroundColor: "transparent",
                  border: "1px solid #E9ECEF",
                  display: "flex",
                  alignItems: "center",
                  gap: "1px",
                }}
              >
                Sign in
              </Button>
            </Group>
          </div>
        </Header>
      }
    ></AppShell>
  );
}
