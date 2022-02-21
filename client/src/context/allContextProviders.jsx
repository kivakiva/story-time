import { MessageProvider } from "./messageContext";
import { MyReadsProvider } from "./myReadsContext";
import { ListenProvider } from "./listenContext";

import React from "react";

function AllContextProviders(props) {
  return (
    <MessageProvider>
      <MyReadsProvider>
        <ListenProvider>{props.children}</ListenProvider>
      </MyReadsProvider>
    </MessageProvider>
  );
}

export default AllContextProviders;
