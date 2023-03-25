import React from "react";
import { createDockerDesktopClient } from "@docker/extension-api-client";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.
const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}

export function App() {
  const [containers, setContainers] = React.useState<any[]>([]);
  const [response, setResponse] = React.useState<string>();
  const ddClient = useDockerDesktopClient();

  React.useEffect(() => {
    ddClient.docker.cli
      .exec("ps", ["--all", "--format", '"{{json .}}"'])
      .then((result) => setContainers(result.parseJsonLines()));
  }, []);

  // const fetchAndDisplayResponse = async () => {
  //   const result = await ddClient.extension.vm?.service?.get("/hello");
  //   setResponse(JSON.stringify(result));
  // };

  return (
    <Stack>
      <Typography data-testid="heading" variant="h3" role="title">
        Container list
      </Typography>
      <Typography
        data-testid="subheading"
        variant="body1"
        color="text.secondary"
        sx={{ mt: 2 }}
      >
        Simple list of containers using Docker Extensions SDK.
      </Typography>
      <TableContainer sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Container id</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Command</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {containers.map((container) => (
              <TableRow
                key={container.ID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{container.ID}</TableCell>
                <TableCell>{container.Image}</TableCell>
                <TableCell>{container.Command}</TableCell>
                <TableCell>{container.CreatedAt}</TableCell>
                <TableCell>{container.Status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
