import React from "react";
import Link from "next/link";
import Router from "next/router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import { Link as MuiLink } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { FormikField } from "./common/FormikField";
import { ToastContainer, toast } from "react-toastify";

const useStyles = makeStyles({
  root: {
    background: "#ECECEC",
  },
});

interface FormValues {
  username: string;
  password: string;
}
interface LoginFormProps {
  header: string;
  loginRoute: string;
  registerRoute: string;
}

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Too short!")
    .max(30, "Too long!")
    .required("Required!"),
  password: Yup.string()
    .min(4, "Too short!")
    .max(30, "Too long!")
    .required("Required!"),
});

export const LoginForm: React.FC<LoginFormProps> = ({
  header,
  loginRoute,
  registerRoute,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const initialValues: FormValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (values: FormValues): void => {
    // Call server HERE
    if (values.username === "yes") {
      Router.push(`${loginRoute}`);
    } else {
      const options = {
        // Only stays the correct color for a one second.
        style: { background: theme.palette.error.main },
      };
      toast.error("Invalid username or password.", options);
    }
  };

  return (
    <Box padding={4} maxWidth="sm" className={classes.root}>
      <Typography component="h1" variant="h5" style={{ textAlign: "left" }}>
        {header}
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={SignupSchema}
      >
        {({ dirty, isValid, handleReset }) => {
          return (
            <Form>
              {" "}
              <FormikField
                name="username"
                label="Username"
                icon={<PersonRoundedIcon />}
              />
              <FormikField
                name="password"
                label="Password"
                type="password"
                icon={<LockRoundedIcon />}
              />
              <Box my={2}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!dirty || !isValid}
                  type="submit"
                  fullWidth
                >
                  Sign In
                </Button>
              </Box>
              <Link href={`${registerRoute}`}>
                <Typography>
                  <MuiLink href="#">Register.</MuiLink>
                </Typography>
              </Link>
              <ToastContainer />
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
