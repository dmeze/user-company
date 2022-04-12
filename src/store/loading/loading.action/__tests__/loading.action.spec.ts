import { SET_LOADING } from "../../types";
import { setLoading } from "../loading.action";

describe("loading action", () => {
  const payload = true;

  const expected = { type: SET_LOADING, payload };

  it(`Should return ${SET_LOADING} action object`, () => {
    expect(setLoading(payload)).toEqual(expected);
  });
});
