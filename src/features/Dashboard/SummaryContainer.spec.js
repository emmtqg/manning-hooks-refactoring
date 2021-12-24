import React from "react";
import { render } from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import SummaryContainer from "./SummaryContainer";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

describe("SummaryContainer component", () => {
  it("should see sales and subscriptions totals", async () => {
    jest.spyOn(window, "fetch").mockImplementationOnce(() => {
      const fetchResponse = {
        ok: true,
        json: () =>
          Promise.resolve({ salesTotal: 87333, subscriptionsTotal: 2040 })
      };
      return Promise.resolve(fetchResponse);
    });

    const { getByText, findByText } = render(<QueryClientProvider client={queryClient}>
      <SummaryContainer />
    </QueryClientProvider>);

    await findByText("CellFast sales");
    await findByText("$ 899");

    expect(getByText("CellFast sales")).toBeInTheDocument();
    expect(getByText("$ 899")).toBeInTheDocument();

    expect(getByText("CellNow subscriptions")).toBeInTheDocument();
    expect(getByText("$ 344")).toBeInTheDocument();
  });
});
