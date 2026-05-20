import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { getAuthBaseURL, getTrustedOrigins } from "./auth-config";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("Mediqueue");

export const auth = betterAuth({
  baseURL: getAuthBaseURL(),
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: getTrustedOrigins(),
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  session: {
    enabled: true,
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  plugins: [jwt()],
});
