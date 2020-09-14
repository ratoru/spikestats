import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

interface CenteredMessageProps {
  header: string;
  paragraph: string;
}

export const CenteredMessage: React.FC<CenteredMessageProps> = ({
  header,
  paragraph,
}) => {
  return (
    <Grid container>
      <Grid
        item
        container
        xs={12}
        style={{ height: "100%" }}
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h2" align="center" paragraph>
            {header}
          </Typography>
          <Typography align="center">{paragraph}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
