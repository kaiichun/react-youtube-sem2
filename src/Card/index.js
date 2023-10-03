import React from "react";
// import "../Style/home.css"; // 导入CSS文件
import {
  Container,
  Grid,
  Image,
  Title,
  Space,
  Card,
  Text,
  Group,
  Badge,
} from "@mantine/core";
import { GoVerified } from "react-icons/go";

const VideoCard = () => {
  return (
    <>
      <Grid>
        <Grid.Col span={3} md={6} lg={4} sm={12}>
          <Card style={{ border: 0 }}>
            <Card.Section
              style={{
                marginBottom: "0px",
                paddingBottom: "0px",
              }}
            >
              <img
                src="https://i.ytimg.com/vi/j38P1DiKIRE/maxresdefault.jpg"
                height="200px"
                alt="Thumbnail"
                style={{ border: 0, borderRadius: "5%", position: "relative" }}
              />
            </Card.Section>

            <Group position="left">
              <img
                src="https://m.media-amazon.com/images/S/pv-target-images/96cbaafbcb3355d900ebf3c99c018189095a37dc3b45c90b725cd56587c70502.png"
                alt="Profile Picture"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                }}
              />
              <div
                style={{
                  paddingTop: "18px",
                }}
              >
                <Title order={4}>Welcome to my Vlog</Title>
                <Text size="sm" color="dimmed">
                  Yuin Zhi{" "}
                  <GoVerified
                    style={{
                      paddingTop: "4px",
                    }}
                  />
                </Text>
                <Text size="sm" color="dimmed">
                  12.14B views . 1 days ago
                </Text>
              </div>
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={3} md={6} lg={4} sm={12}>
          <Card style={{ border: 0 }}>
            <Card.Section
              style={{
                marginBottom: "0px",
                paddingBottom: "0px",
              }}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTevJRM2nxE30aLTogw_Gtp9L1Y0KbpfWPtIqTIJQYKMWncVhjlGXk1R31ux23d96sFGtk&usqp=CAU"
                height="200px"
                width="360px"
                alt="Thumbnail"
                style={{ border: 0, borderRadius: "5%", position: "relative" }}
              />
            </Card.Section>
            <Group position="left">
              <img
                src="https://w0.peakpx.com/wallpaper/310/896/HD-wallpaper-doremon-and-nobita-art-cartoon-doremon-drawing-graphic-illustrator-lallupallu-minimal-rojan-vector.jpg"
                alt="Profile Picture"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                }}
              />

              <div
                style={{
                  paddingTop: "18px",
                }}
              >
                <Title order={4}>Doremon EP IV </Title>
                <Text size="sm" color="dimmed">
                  Doremon Offical Channel
                </Text>
                <Text size="sm" color="dimmed">
                  12.7M views . 28 days ago
                </Text>
              </div>
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card style={{ border: 0 }}>
            <Card.Section
              style={{
                marginBottom: "0px",
                paddingBottom: "0px",
              }}
            >
              <img
                src="https://onecms-res.cloudinary.com/image/upload/s--iRTXsC68--/c_fill,g_auto,h_676,w_1200/f_auto,q_auto/v1/tdy-migration/28415853.JPG?itok=rYo4PsoT"
                height="200px"
                width="360px"
                alt="Thumbnail"
                style={{ border: 0, borderRadius: "5%", position: "relative" }}
              />
            </Card.Section>
            <Group position="left">
              <img
                src="https://w0.peakpx.com/wallpaper/310/896/HD-wallpaper-doremon-and-nobita-art-cartoon-doremo"
                alt="Profile Picture"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                }}
              />

              <div
                style={{
                  paddingTop: "18px",
                }}
              >
                <Title order={4}>Doremon EP IV </Title>
                <Text size="sm" color="dimmed">
                  Doremon Offical Channel
                </Text>
                <Text size="sm" color="dimmed">
                  12.7M views . 28 days ago
                </Text>
              </div>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default VideoCard;
