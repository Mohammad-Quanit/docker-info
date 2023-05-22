import { Typography } from "@mui/material";

export const RenderHeader = ({ heading, subheading }: any): JSX.Element => {
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
