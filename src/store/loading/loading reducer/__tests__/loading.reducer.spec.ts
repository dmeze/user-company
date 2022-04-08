import { loadingReducer } from "../loading.reducer";
import { SET_LOADING } from "store/loading/types";

describe("loading reducer", () => {
  const initialState = { loading: false };

  const { DEFAULT_STATE, SET_LOADING_ACTION } = {
    DEFAULT_STATE: { type: "default state", payload: {} },
    SET_LOADING_ACTION: { type: SET_LOADING, payload: true },
  };

  const expectedSetLoading = { loading: true };

  it.each`
    testName           | state           | action                | expected
    ${"default state"} | ${undefined}    | ${DEFAULT_STATE}      | ${initialState}
    ${SET_LOADING}     | ${initialState} | ${SET_LOADING_ACTION} | ${expectedSetLoading}
  `("$testName", ({ state, action, expected }) => {
    expect(loadingReducer(state, action)).toEqual(expected);
  });
});
