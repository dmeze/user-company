import { AnyAction, combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import { usersReducer } from "store/user/users.reducer";
import { State } from "store/interfaces";
import { companiesReducer } from "store/companies/companies.reducer";
import { loadingReducer } from "store/loading/loading reducer";

const initialState = {
  user: { users: [] },
  company: { companies: [] },
  loading: { loading: false },
};

const combinedReducers = combineReducers({
  user: usersReducer,
  company: companiesReducer,
  loading: loadingReducer,
});

const rootReducer = (
  state: State = initialState,
  { type, payload }: AnyAction
) => {
  if (type === HYDRATE) {
    return {
      ...state,
      ...payload,
    };
  } else {
    return combinedReducers(state, { type, payload });
  }
};

export default rootReducer;
