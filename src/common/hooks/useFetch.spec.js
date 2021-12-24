import { renderHook } from "@testing-library/react-hooks";
import { useFetch } from "./useFetch";

describe("useFetch hook", () => {
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

    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBeFalsy();

    await waitForNextUpdate();
    expect(result.current.data).toMatchObject(expected);
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();

    window.fetch.mockRestore();
  });
});
