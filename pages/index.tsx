import { Layout } from "../components/Layout";
import { MyFooter } from "../components/common/MyFooter";
import { LoginForm } from "../components/LoginForm";

function IndexPage() {
  return (
    <Layout title="Login">
      <LoginForm header="Login" />
      <MyFooter />
    </Layout>
  );
}

export default IndexPage;
