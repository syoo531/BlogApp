/* @jsxImportSource @emotion/react */
import { useState } from "react";
//import { Container, Grow, Grid } from "@mui/material";
import { Container, Grow, Grid } from "@mui/material";
import Form from "../components/Form/Form";
import Posts from "../components/Posts/Posts";

const MyPosts = () => {
  const [currentId, setCurrentId] = useState(0);

  return (
    <Grow in>
      <div style={{ padding: "30px 0px" }}>
        <Container maxWidth={false} style={{ width: "90%" }}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={5}
          >
            <Grid item xs={12} sm={8}>
              <Posts setCurrentId={setCurrentId} isProfile="true" />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </Grow>
  );
};

export default MyPosts;
