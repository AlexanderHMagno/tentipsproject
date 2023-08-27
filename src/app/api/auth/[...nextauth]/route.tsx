import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { connect } from "@/lib/utils/db";
// import { MongoClient } from "mongodb";

// const client = new MongoClient(process.env.MONGO || "");
// const clientPromise = client.connect();

const authOptions = NextAuth({
  //@ts-ignore
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/admin/login",
    newUser: "/admin/register",
  },
});

export { authOptions as GET, authOptions as POST };
