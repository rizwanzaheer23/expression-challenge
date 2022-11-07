import { EuiFlexGroup, EuiFlexItem, EuiLoadingSpinner } from "@elastic/eui";
import React from "react";

export const MyLoader = () => {
  return (
    <EuiFlexGroup
      style={{ marginTop: "2em", marginBottom: "2em" }}
      justifyContent="center"
    >
      <EuiFlexItem grow={false}>
        <EuiLoadingSpinner size="xxl" />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
