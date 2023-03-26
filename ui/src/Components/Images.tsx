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

export const Images = (): JSX.Element => {
  const [images, setImages] = React.useState<any[]>([]);
  const ddClient = useDockerDesktopClient();

  React.useEffect(() => {
    const getImages = async() => {
      const dkrImages: any[] = (await ddClient.docker.listImages({
        all: true,
      })) as any[];
      setImages(dkrImages);
    }
    getImages()
  }, [images])
  

  return (
    <TableContainer sx={{ mt: 2 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Image id</TableCell>
          <TableCell>Repo Tags</TableCell>
          <TableCell>Command</TableCell>
          <TableCell>Created</TableCell>
          <TableCell>Size</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {images.map((image: any) => {
          return (
            <TableRow
              key={image.Id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{image?.Id.substring(0, 15)}</TableCell>
              <TableCell>{image?.RepoTags[0]}</TableCell>
              <TableCell>{image?.Labels?.['org.opencontainers.image.description']}</TableCell>
              <TableCell>{image?.Created}</TableCell>
              <TableCell>{image?.Size}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
  )
}
