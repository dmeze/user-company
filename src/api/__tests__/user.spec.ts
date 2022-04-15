import {
  CREATE_USER_PATH,
  headers,
  LOGIN_PATH,
  UPDATE_USER_PATH,
} from "../constants";
import { createUserApi, getUsersApi, loginApi, updateUserApi } from "../user";

import { User } from "types/user_interfaces";

describe("api/user", () => {
  const mockedFetch = jest.fn();
  global.fetch = mockedFetch;

  const user: unknown = { id: "testId", name: "testUser" };
  const newUser: unknown = { id: "testId", name: "testUser" };

  const makeExpected = (link: string, method: string, body: unknown) => [
    link,
    { method, headers, body: JSON.stringify(body) },
  ];

  beforeEach(() => mockedFetch.mockReset());

  describe("getUsersApi", () => {
    it("should return users", async () => {
      const users = [{ name: "testUser" }];

      mockedFetch.mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(users),
        })
      );

      expect(await getUsersApi()).toEqual(users);
    });
  });

  describe("updateUserApi", () => {
    it("should return updated user", async () => {
      const expectedBody = {
        ...(user as User),
        _id: (user as User).id,
        updatedBy: new Date(),
      };
      const expected = makeExpected(UPDATE_USER_PATH, "PUT", expectedBody);

      await updateUserApi(user as User);

      expect(mockedFetch).toBeCalledWith(...expected);
    });
  });

  describe("loginApi", () => {
    it("should call fetch with credentials and return user", async () => {
      const credentials = {
        email: "testEmail",
        password: "testPassword",
      };
      const expectedCall = makeExpected(LOGIN_PATH, "POST", credentials);

      mockedFetch.mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(newUser),
        })
      );

      await loginApi(credentials);

      expect(await loginApi(credentials)).toEqual(newUser);
      expect(mockedFetch).toBeCalledWith(...expectedCall);
    });
  });

  describe("createUserApi", () => {
    it("should call fetch with newUser and return it", async () => {
      const expected = makeExpected(CREATE_USER_PATH, "POST", user);

      mockedFetch.mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(newUser),
        })
      );

      await createUserApi(user as User);

      expect(await createUserApi(newUser as User)).toEqual(newUser);
      expect(mockedFetch).toBeCalledWith(...expected);
    });
  });
});
