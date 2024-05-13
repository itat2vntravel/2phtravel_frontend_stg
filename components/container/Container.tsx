"use client";

import React, { FC } from "react";

import { Container } from "@mui/material";
export interface ContainerComponentProps {
  children: React.ReactNode;
}

const ContainerComponent: FC<ContainerComponentProps> = ({
  children,
}: ContainerComponentProps) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};
export default ContainerComponent;
