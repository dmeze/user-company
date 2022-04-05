import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginApi } from "api/user";
import { User } from "types/user_interfaces";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user: User = await loginApi(credentials!);
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.user = user;
        token.role = user.role;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.role = token.role;
      }
      return session;
    },
  },
  secret: "login",
  jwt: {
    secret: "login",
  },
});
