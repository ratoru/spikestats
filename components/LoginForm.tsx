import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import { InputFormField } from "./common/InputFormField";

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
  const initialValues: FormValues = {
    username: "",
    password: "",
  };
  const handleSubmit = (values: FormValues): void => {
    console.log("Submitted ", values);
  };

  return (
    <Grid
      container
      spacing={3}
      direction="column"
      justify="space-evenly"
      alignItems="center"
    >
      <Grid item style={{ textAlign: "start" }}>
        <Typography component="h1" variant="h5">
          {header}
        </Typography>
      </Grid>
      <Grid item>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={SignupSchema}
        >
          {({ dirty, isValid, handleReset }) => {
            return (
              <Form>
                {" "}
                <Grid
                  container
                  spacing={3}
                  direction="column"
                  justify="space-evenly"
                  alignItems="center"
                >
                  <Grid item justify="center">
                    <InputFormField
                      name="username"
                      label="Username"
                      icon={<PersonRoundedIcon />}
                    />
                  </Grid>
                  <Grid item justify="center">
                    <InputFormField
                      name="password"
                      label="Password"
                      type="password"
                      icon={<LockRoundedIcon />}
                    />
                  </Grid>
                  <Grid item justify="center">
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
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Grid>
    </Grid>
  );
};
