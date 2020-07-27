import { LogoBar } from "../components/LogoBar";
import { Layout } from "../components/Layout/Layout";

export default function About() {
  return (
    <Layout title="About">
      <LogoBar />

      <h1>About</h1>
      <p>
        Hi! This little web app allows you to track your 'Roundnet' games. I
        hope you enjoy it.
      </p>
      <p>
        Furthermore, this is a programming project I am working on in my free
        time. You can find the code{" "}
        <a href="https://github.com/raphtorru/spike-stats">here</a>. If you have
        constructive feedback feel free to contact me.
      </p>
      <p>
        Please remember your username! There is no way of getting your account
        back if you lose it. I did not use emails because I didn't want to
        bother with security issues.
      </p>
      <p>
        Special thanks to Christina Joo for helping me with the icon design.
      </p>
    </Layout>
  );
}
