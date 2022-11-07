import { EuiText } from "@elastic/eui";
import React from "react";

export const PageTitle = ({ children }) => {
  return (
    <EuiText textAlign="center">
      <h1>{children}</h1>
    </EuiText>
  );
};
