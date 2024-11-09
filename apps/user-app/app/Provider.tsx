"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@repo/store/store";
import { SessionProvider } from "next-auth/react";

const ProviderWrapper = ({ children }: { children: any }) => {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
};

export default ProviderWrapper;
