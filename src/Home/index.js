// Menu.js
// import "../Style/menu.css"; // 导入CSS文件
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

export default function Home() {
  return (
    <main>
      <VideoCard />
    </main>
  );
}
