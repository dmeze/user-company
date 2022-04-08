import { SET_LOADING } from "../../types";
import { setLoading } from "../loading.action";

describe("loading action", () => {
  const payload = true;

  const expected = { type: SET_LOADING, payload };

  it(`${SET_LOADING}`, () => {
    expect(setLoading(payload)).toEqual(expected);
  });
});
