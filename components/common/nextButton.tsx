import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";

type Props = {
  header: string;
  body?: string;
  link: string;
};

export const NextButton: React.FunctionComponent<Props> = (props) => {
  return (
    <React.Fragment>
      <Link href={props.link}>
        <a className="card">
          <h3>{props.header} &rarr;</h3>
          <p>{props.body}</p>
        </a>
      </Link>
      <style jsx>{`
        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #264653;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          background: linear-gradient(45deg, #2a9d8f 30%, #e9c46a 90%);
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: white;
          border-color: e76f51;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }
      `}</style>
    </React.Fragment>
  );
};
