import React from "react";
import { createDockerDesktopClient } from "@docker/extension-api-client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}

export const Containers = (): JSX.Element => {
  const [containers, setContainers] = React.useState<any[]>([]);
  const ddClient = useDockerDesktopClient();

  React.useEffect(() => {
    const getContainers = async () => {
      const dkrContainers: any[] = (await ddClient.docker.listContainers({
        all: true,
      })) as any[];
      setContainers(dkrContainers);
    };
    getContainers();
  }, [containers]);

  return (
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
          {containers.map((container: any) => {
            return (
              <TableRow
                key={container.Id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{container.Id.substring(0, 10)}</TableCell>
                <TableCell>{container.Image}</TableCell>
                <TableCell>{container.Command}</TableCell>
                <TableCell>{container.Created}</TableCell>
                <TableCell>{container.Status}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
