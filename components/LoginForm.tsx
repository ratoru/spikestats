import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import { makeStyles } from "@material-ui/core/styles";
import { FormikField } from "./common/FormikField";

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

export const LoginForm: React.FC<LoginFormProps> = ({ header }) => {
  const classes = useStyles();
  const initialValues: FormValues = {
    username: "",
    password: "",
  };
  const handleSubmit = (values: FormValues): void => {
    console.log("Submitted ", values);
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
              <Button
                variant="contained"
                color="primary"
                disabled={!dirty || !isValid}
                onClick={handleReset}
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
