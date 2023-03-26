import React from "react";
import { createDockerDesktopClient } from "@docker/extension-api-client";
import {
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Containers } from "./Components/containers";
import { Images } from "./Components/Images";

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.
const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}

export function App() {
  const [response, setResponse] = React.useState<string>();
  const ddClient = useDockerDesktopClient();

  // const runCMD = () => {
  //   ddClient.docker.cli
  //     .exec("ps", ["--all", "--format", '"{{json .}}"'])
  //     .then((result) => setContainers(result.parseJsonLines()));
  // };

  // const fetchAndDisplayResponse = async () => {
  //   const result = await ddClient.extension.vm?.service?.get("/hello");
  //   setResponse(JSON.stringify(result));
  // };

  return (
    <Stack>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={15}>
          <Grid item xs={12}>
            <RenderHeader heading="Container list" subheading="Simple list of containers using Docker Extensions SDK." />
            <Containers />
          </Grid>
          <Grid item xs={12}>
            <RenderHeader heading="Images list" subheading="Simple list of images using Docker Extensions SDK." />
            <Images />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}

const RenderHeader = ({ heading, subheading }: any): JSX.Element => {
  return (
    <>
      <Typography data-testid="heading" variant="h3" role="title">
        {heading}
      </Typography>
      <Typography
        data-testid="subheading"
        variant="body1"
        color="text.secondary"
        sx={{ mt: 2 }}
      >
        {subheading}
      </Typography>
    </>
  );
};