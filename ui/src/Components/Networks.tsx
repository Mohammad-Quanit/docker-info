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

export const Networks = (): JSX.Element => {
  const [networks, setNetworks] = React.useState<any[]>([]);
  const ddClient = useDockerDesktopClient();

  React.useEffect(() => {
    const getNetworks = async () => {
      const result = await ddClient.docker.cli.exec("network", [
        "ls",
        "--format",
        '"{{json .}}"',
      ]);
      setNetworks(result.parseJsonLines());
    };
    getNetworks();
  }, []);

  return (
    <TableContainer sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Network Id</TableCell>
            <TableCell>Driver</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Scope</TableCell>
            <TableCell>Ipv6</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {networks?.map((network: any) => {
            return (
              <TableRow
                key={network.ID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{network.ID}</TableCell>
                <TableCell>{network.Driver}</TableCell>
                <TableCell>{network.Name}</TableCell>
                <TableCell>{network.Scope}</TableCell>
                <TableCell>{network.IPv6}</TableCell>
                <TableCell>{network.CreatedAt}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
