import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";

import rootReducer from "store/rootReducer";

import { Company } from "types/company_interfaces";
import { User } from "types/user_interfaces";

export const initialState: {
  user: { users: Array<User> };
  company: {
    companies: Array<Company>;
  };
  loading: { loading: boolean };
} = {
  user: { users: [] },
  company: { companies: [] },
  loading: { loading: false },
};

const middleware = [thunk];

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const wrapper = createWrapper(() => store);
