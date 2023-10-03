// App.js
import {
  Container,
  Space,
  TextInput,
  Card,
  Button,
  Image,
  Group,
  Grid,
  PasswordInput,
  Text,
  Title,
  Avatar,
  Flex,
  UnstyledButton,
  Divider,
} from "@mantine/core";
import { RiThumbUpLine, RiThumbDownLine } from "react-icons/ri";
import { PiShareFatLight } from "react-icons/pi";

import VideoCard from "../Card";

export default function Video() {
  return (
    <Container fluid>
      <Grid>
        <Grid.Col span={9}>
          <div>
            <Group>
              <iframe
                width="100%"
                height="720"
                src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </Group>
            <Space h="10px" />
            <Title size={24}>Video 1</Title>
            <Space h="15px" />
            <Group position="apart">
              <Group>
                <img
                  src="https://e00-marca.uecdn.es/assets/multimedia/imagenes/2023/02/05/16755519728234.jpg"
                  alt="Login Picture"
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "50%",
                  }}
                />
                <div style={{ paddingTop: "2px" }}>
                  <Text size={15} fw={500}>
                    John Cane
                  </Text>
                  <Text size={12}>810,020 subscribers</Text>
                  <Space h="5px" />
                </div>
                <Button>SUBSCRIBE</Button>
              </Group>
              <Group position="right">
                <Button variant="transparent" color="gray" size="md">
                  <RiThumbUpLine /> 12K
                </Button>
                <Button variant="transparent" color="gray" size="md">
                  <RiThumbDownLine /> Dislike
                </Button>
                <Button variant="transparent" color="gray" size="md">
                  <PiShareFatLight /> Share
                </Button>
              </Group>
            </Group>
            <Space h="20px" />
            <Card style={{ backgroundColor: "#F1F3F5" }} radius="md">
              <Text fz="sm" fw={700}>
                7,948,154 views • Jun 22, 2022
              </Text>
              <Text fz="sm">This is a description</Text>
              <Text fz="sm">This is a description 2</Text>
            </Card>
            {/* <Comments /> */}
          </div>
        </Grid.Col>
        {/* <Recommendation> */}
        <Grid.Col span={3}>
          <Text>Reccomed video</Text>
          <Divider />
          <Space h="5px" />
          <Flex
            mih={50}
            gap="sm"
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
          >
            <VideoCard type="sm" />
            {/* </Recommendation> */}
          </Flex>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
