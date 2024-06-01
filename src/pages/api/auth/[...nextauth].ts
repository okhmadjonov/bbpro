import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import axios from "axios";
import { BASE_URL } from "@/services/api";

// Определим тип данных, который приходит с сервера в ответе на запрос аутентификации
interface ApiResponse {
  status: boolean;
  error: string | null;
  data: string | null;
  globalError: boolean | null;
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        try {
          if (!credentials || !credentials.email || !credentials.password)
            throw new Error("Invalid credentials");

          const { data: response } = await axios.post<ApiResponse>(
            `${BASE_URL}/customapi/auth/login`,
            credentials
          );

          if (response && response.status) {
            if (response.error === null && response.data) {
              return { status: response.status, token: response.data };
            } else {
              throw new Error(response.error || "Unknown error occurred");
            }
          } else {
            throw new Error("Server returned an unexpected response");
          }
        } catch (error: any) {
          // Specify 'any' type or use 'Error' type if necessary
          throw new Error("Authentication failed: " + error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
    error: "/error",
  },
  callbacks: {
    async signIn({ user }) {
      if (user?.error) {
        throw new Error(user.message || "Authentication failed");
      }
      return true;
    },
    async jwt({ token, user, session }) {
      return { ...token, ...user };
    },
    async session(data) {
      return { ...data.session, user: { ...data.token } };
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 5 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
