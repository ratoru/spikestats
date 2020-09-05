import React from "react";

export const Logo: React.FC = () => {
  return (
    <img
      src="/roundnet-logo.svg"
      alt="Logo"
      style={{
        position: "fixed",
        width: "90px",
        height: "75px",
        left: "36px",
        top: "28px",
      }}
    />
  );
};
