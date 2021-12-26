import React from "react";
import { render } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import SummaryContainer from "./SummaryContainer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retries: false,
    },
  },
});

describe("SummaryContainer component", () => {
  global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
  it("should see sales and subscriptions totals", async () => {
    jest.spyOn(window, "fetch").mockImplementationOnce(() => {
      const fetchResponse = {
        ok: true,
        json: () =>
          Promise.resolve({ salesTotal: 87333, subscriptionsTotal: 2040 })
      };
      return Promise.resolve(fetchResponse);
    });

    const { container, getByText, findByText } = render(<QueryClientProvider client={queryClient}>
      <SummaryContainer />
    </QueryClientProvider>);

    await findByText("CellFast sales");
    expect(getByText("$ 87333")).toBeInTheDocument();

    expect(getByText("CellNow subscriptions")).toBeInTheDocument();
    expect(getByText("$ 2040")).toBeInTheDocument();
  });
});
