import React from "react";
import "../Style/home.css"; // 导入CSS文件
import { Container, Grid, Image, Title, Space, Card } from "@mantine/core";

const VideoCard = () => {
  return (
    <>
      <Grid>
        <Grid.Col md={6} lg={4}>
          Video 1
        </Grid.Col>
        <Grid.Col md={6} lg={4}>
          Video 2
        </Grid.Col>
        <Grid.Col md={6} lg={4}>
          Video 3
        </Grid.Col>
        <Grid.Col md={6} lg={4}>
          Video 4
        </Grid.Col>

        <Grid.Col md={6} lg={4}>
          Video 5
        </Grid.Col>
      </Grid>
    </>
  );
};

export default VideoCard;
