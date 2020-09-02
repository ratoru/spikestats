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
import { FormikField } from "./FormikField";
import { errorToast } from "../../util/swals";
import { User } from "../../util/types";
import http from "../../services/httpService";
import { useAuth } from "../../providers/Auth";

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
  apiRoute: string;
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
  apiRoute,
}) => {
  const classes = useStyles();
  const initialValues: FormValues = {
    username: "",
    password: "",
  };
  const { setAuthenticated } = useAuth();

  const handleSubmit = async (values: FormValues): Promise<void> => {
    const user: User = {
      username: values.username,
      password: values.password,
    };
    // Call server HERE
    try {
      await http.post(apiRoute, user);
      setAuthenticated(true);
      Router.replace(`${loginRoute}`);
    } catch (error) {
      errorToast.fire({ title: "Wrong username or password." });
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
        {({ dirty, isValid }) => {
          return (
            <Form>
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
                  <MuiLink href="#" color="error">
                    No Account? Register here.
                  </MuiLink>
                </Typography>
              </Link>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
