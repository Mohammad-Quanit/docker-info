import React from "react";
import { createDockerDesktopClient } from "@docker/extension-api-client";
import { Grid, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { Containers } from "./Components/Containers";
import { Images } from "./Components/Images";
import { Networks } from "./Components/Networks";
import { RenderHeader } from "./Components/Header";

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.
const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}

export function App() {
  const [response, setResponse] = React.useState<string>();
  const ddClient = useDockerDesktopClient();

  // const fetchAndDisplayResponse = async () => {
  //   const result = await ddClient.extension.vm?.service?.get("/hello");
  //   setResponse(JSON.stringify(result));
  // };

  return (
    <Stack>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={15}>
          <Grid item xs={12}>
            <RenderHeader
              heading="Containers list"
              subheading="List of containers using Docker Extensions SDK."
            />
            <Containers />
          </Grid>
          <Grid item xs={12}>
            <RenderHeader
              heading="Images list"
              subheading="List of images using Docker Extensions SDK."
            />
            <Images />
          </Grid>
          <Grid item xs={12}>
            <RenderHeader
              heading="Networks list"
              subheading="List of networks using Docker Extensions SDK."
            />
            <Networks />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}
