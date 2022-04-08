import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import { addNewUser, getUsers, updateUser } from "../users.thunk";

import {
  ADD_NEW_USER,
  SET_USERS,
  UPDATE_USER,
  USERS_ERROR,
} from "store/user/types";
import { SET_LOADING } from "store/loading/types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock("api/user");
const { getUsersApi, updateUserApi, createUserApi } = require("api/user");

jest.mock("store/loading/loading.action");
const { setLoading } = require("store/loading/loading.action");

jest.mock("store/user/users.action");
const {
  setUsers,
  usersError,
  updateUserAction,
  addNewUserAction,
} = require("store/user/users.action");

describe("user thunks", () => {
  const store = mockStore({ users: [], companies: [], loading: {} });

  const user = { name: "testUser" };

  const { GET_USERS, UPDATE_USER_NAME, ADD_NEW_USER_NAME } = {
    GET_USERS: "getUsers",
    UPDATE_USER_NAME: "updateUser",
    ADD_NEW_USER_NAME: "addNewUser",
  };

  beforeEach(() => store.clearActions());

  describe.each`
    describeName         | api              | type            | action              | thunk         | error                      | loading
    ${GET_USERS}         | ${getUsersApi}   | ${SET_USERS}    | ${setUsers}         | ${getUsers}   | ${`${GET_USERS} error`}    | ${false}
    ${UPDATE_USER_NAME}  | ${updateUserApi} | ${UPDATE_USER}  | ${updateUserAction} | ${updateUser} | ${`${UPDATE_USER} error`}  | ${true}
    ${ADD_NEW_USER_NAME} | ${createUserApi} | ${ADD_NEW_USER} | ${addNewUserAction} | ${addNewUser} | ${`${ADD_NEW_USER} error`} | ${true}
  `(
    "$describeName",
    ({ describeName, api, type, action, thunk, error, loading }) => {
      it(`should call ${describeName} api and invoke actions`, async () => {
        loading
          ? api.mockReturnValue(Promise.resolve(user))
          : api.mockReturnValue(user);
        action.mockReturnValue({ type });
        setLoading.mockReturnValue({ type: SET_LOADING });
        await store.dispatch<any>(thunk(loading ? user : ""));
        if (loading) {
          expect(setLoading).toHaveBeenCalledWith(false);
        }
        expect(action).toHaveBeenCalledWith(user);
      });
      it(`${describeName} should return error`, async () => {
        api.mockImplementation(() => {
          throw new Error(error);
        });
        usersError.mockReturnValue({ type: USERS_ERROR });
        await store.dispatch<any>(thunk());
        expect(usersError).toHaveBeenCalledWith(Error(error));
      });
    }
  );
});
