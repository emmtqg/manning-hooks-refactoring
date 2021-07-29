import React from "react";
import ReactDOM from "react-dom";
import { startServer } from "./server";

import "./styles.css";
import App from "./App";
// import store from "./store";
// import { Provider } from "react-redux";

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

if (process.env.NODE_ENV === "development") {
  startServer({ environment: "development" })
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
