import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Chip from "@material-ui/core/Chip";

// Template for error messages.
export const errorToast = Swal.mixin({
  title: "Something went wrong!",
  icon: "error",
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
});

export const addGameSwal = withReactContent(Swal).mixin({
  title: "Add Game",
  showCancelButton: true,
});
