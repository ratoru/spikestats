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
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { FormikField } from "./FormikField";
import { errorToast } from "../../util/swals";

const useStyles = makeStyles({
  root: {
    background: "#ECECEC",
  },
});

interface FormValues {
  username: string;
  password: string;
  confirmedPassword: string;
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
  confirmedPassword: Yup.string().test(
    "equal",
    "Passwords do not match!",
    function (v) {
      // Don't use arrow functions
      const ref = Yup.ref("password");
      return v === this.resolve(ref);
    }
  ),
});

export const RegisterForm: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const initialValues: FormValues = {
    username: "",
    password: "",
    confirmedPassword: "",
  };

  const handleSubmit = (values: FormValues): void => {
    // Call server HERE
    const serversSuccess = true;
    if (serversSuccess) {
      Router.push("/groups");
    } else {
      errorToast.fire();
    }
  };

  return (
    <Box padding={4} maxWidth="sm" className={classes.root}>
      <Typography component="h1" variant="h5" style={{ textAlign: "left" }}>
        Register
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
              <FormikField
                name="confirmedPassword"
                label="Confirm Password"
                type="password"
                icon={<VerifiedUserIcon />}
              />
              <Box my={2}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!dirty || !isValid}
                  type="submit"
                  fullWidth
                >
                  Register
                </Button>
              </Box>
              <Link href={"/"}>
                <Typography>
                  <MuiLink href="#">Login.</MuiLink>
                </Typography>
              </Link>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
