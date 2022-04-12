import configureMockStore from "redux-mock-store";
import { State } from "store/interfaces";
import { getLoadingSelector, loadingRootSelector } from "../loading.selector";

const mockStore = configureMockStore();

const loading = { loading: false };

const state = { user: {}, companies: {}, loading };

const store = mockStore(state);

describe("user selectors", () => {
  it("loadingRootSelector should return loading root state", () => {
    expect(loadingRootSelector(store.getState() as State)).toEqual(loading);
  });

  it("getLoadingSelector should return loading", () => {
    expect(getLoadingSelector(store.getState() as State)).toEqual(false);
  });
});
