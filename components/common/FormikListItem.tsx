import React from "react";
import { Formik, Form, Field } from "formik";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import * as Yup from "yup";

const RenameSchema = Yup.object().shape({
  newName: Yup.string()
    .min(1, "Too short!")
    .max(30, "Too long!")
    .required("Required!"),
});

interface FormValues {
  newName: string;
}

interface FormikListItemProps {
  initialValue: string;
  label: string;
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
  onClickAway: () => void;
}

export const FormikListItem: React.FC<FormikListItemProps> = ({
  initialValue,
  label,
  onSubmit,
  onCancel,
  onClickAway,
}) => {
  // Used to initialize the formik form
  const initialValues: FormValues = {
    newName: initialValue,
  };

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={RenameSchema}
        >
          {({ dirty, isValid }) => {
            return (
              <Form>
                <ListItem>
                  <ListItemText
                    primary={
                      <Field
                        name="newName"
                        as={TextField}
                        variant="outlined"
                        label={label}
                        defaultValue={initialValue}
                        autoFocus
                        autoComplete="off"
                        error={!isValid}
                        size="small"
                      />
                    }
                  />
                  <ListItemSecondaryAction>
                    <ButtonGroup variant="contained">
                      {/*Can't add Tooltip because of bug https://github.com/mui-org/material-ui/issues/11601 */}
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={!dirty || !isValid}
                      >
                        <CheckCircleRoundedIcon />
                      </Button>
                      <Tooltip title="Cancel" arrow>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={onCancel}
                        >
                          <CancelRoundedIcon />
                        </Button>
                      </Tooltip>
                    </ButtonGroup>
                  </ListItemSecondaryAction>
                </ListItem>
              </Form>
            );
          }}
        </Formik>
      </div>
    </ClickAwayListener>
  );
};
