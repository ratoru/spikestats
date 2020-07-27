import Grid from "@material-ui/core/Grid";
import { Layout } from "../components/Layout/Layout";
import { MyFooter } from "../components/common/MyFooter";
import { LoginForm } from "../components/LoginForm";
import { LogoBar } from "../components/LogoBar";

function IndexPage() {
  return (
    <Layout title="Login">
      <LogoBar />
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item>
          <LoginForm header="Login" />
        </Grid>
      </Grid>
      <MyFooter />
    </Layout>
  );
}

export default IndexPage;
