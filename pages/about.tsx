import Link from "next/link";
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>

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
        <a target="_blank" href="https://icons8.com/icons/set/beach-ball--v1">
          Beach Ball icon
        </a>{" "}
        icon by{" "}
        <a target="_blank" href="https://icons8.com">
          Icons8
        </a>
        . Might have to be in the footer on every page.
      </p>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}
