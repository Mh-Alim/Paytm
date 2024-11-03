"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@repo/store/store";

const ProviderWrapper = ({ children }: { children: any }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderWrapper;
