import { renderHook, act } from "@testing-library/react-hooks";
import { useFetch } from "./useFetch";

describe("useFetch hook", () => {
  global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

  it("should GET data", async () => {
    const expected = { salesTotal: 899, subscriptionsTotal: 344 };
    jest.spyOn(window, "fetch").mockImplementationOnce(() => {
      const fetchResponse = {
        ok: true,
        json: () => Promise.resolve(expected)
      };
      return Promise.resolve(fetchResponse);
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch("/api/totals/")
    );

    await waitForNextUpdate();

    expect(result.current.data).not.toBeFalsy();
    expect(result.current.data.salesTotal).toEqual(899);
    expect(result.current.data.subscriptionsTotal).toEqual(344);    

    expect(result.current.error).toBeFalsy();

    expect(result.current.data).toMatchObject(expected);
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();

    window.fetch.mockRestore();
  });

  it("should handle errors", async () => {
    jest.spyOn(window, "fetch").mockImplementationOnce(() => {
      const fetchResponse = {
        ok: false,
        statusText: "500 Server error"
      };
      return Promise.resolve(fetchResponse);
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch("/api/totals/")
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual(undefined);
    expect(result.current.status).toEqual('error');
    expect(result.current.error).toEqual("500 Server error");

    window.fetch.mockRestore();
  });
});
