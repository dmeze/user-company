import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import { addNewUser, getUsers, updateUser } from "store/user/users.thunk";

import {
  ADD_NEW_USER,
  SET_USERS,
  UPDATE_USER,
  USERS_ERROR,
} from "store/user/types";
import { SET_LOADING } from "store/loading/types";

import { User } from "types/user_interfaces";

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

describe("store/user/thunk", () => {
  const store = mockStore({ users: [], companies: [], loading: {} });

  const user = { name: "testUser" };

  beforeEach(() => store.clearActions());

  describe("getUsers", () => {
    it(`should call getUsers api and invoke actions`, async () => {
      getUsersApi.mockReturnValue(user);
      setUsers.mockReturnValue({ type: SET_USERS });

      await store.dispatch<any>(getUsers());

      expect(setUsers).toHaveBeenCalledWith(user);
    });

    it(`should return error`, async () => {
      const error = "getUsers error";
      getUsersApi.mockImplementation(() => {
        throw new Error(error);
      });
      usersError.mockReturnValue({ type: USERS_ERROR });

      await store.dispatch<any>(getUsers());

      expect(usersError).toHaveBeenCalledWith(Error(error));
    });
  });

  describe("updateUser", () => {
    it(`should call updateUser api and invoke actions`, async () => {
      updateUserApi.mockReturnValue(Promise.resolve(user));
      updateUserAction.mockReturnValue({ type: UPDATE_USER });
      setLoading.mockReturnValue({ type: SET_LOADING });

      await store.dispatch<any>(updateUser(user as User));

      expect(setLoading).toHaveBeenCalledWith(false);
      expect(updateUserAction).toHaveBeenCalledWith(user);
    });

    it(`should return error`, async () => {
      const error = "updateUser error";
      updateUserApi.mockImplementation(() => {
        throw new Error(error);
      });
      usersError.mockReturnValue({ type: USERS_ERROR });

      await store.dispatch<any>(updateUser(user as User));

      expect(usersError).toHaveBeenCalledWith(Error(error));
    });
  });

  describe("addNewUser", () => {
    it(`should call addNewUser api and invoke actions`, async () => {
      createUserApi.mockReturnValue(Promise.resolve(user));
      addNewUserAction.mockReturnValue({ type: ADD_NEW_USER });
      setLoading.mockReturnValue({ type: SET_LOADING });

      await store.dispatch<any>(addNewUser(user as User));

      expect(setLoading).toHaveBeenCalledWith(false);
      expect(addNewUserAction).toHaveBeenCalledWith(user);
    });

    it(`should return error`, async () => {
      const error = "addNewUser error";
      createUserApi.mockImplementation(() => {
        throw new Error(error);
      });
      usersError.mockReturnValue({ type: USERS_ERROR });

      await store.dispatch<any>(addNewUser(user as User));

      expect(usersError).toHaveBeenCalledWith(Error(error));
    });
  });
});
