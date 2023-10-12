import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ensureDbConnected } from "@/lib/dbConnect";
import { Admin, signupSchema } from "@/lib/db";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: any = { // Add type annotation
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await ensureDbConnected();
        if (!credentials) {
          return null;
        }
        const creds = await signupSchema.parseAsync(credentials);
        console.log(creds);
        const username1 = creds.username;
        const password1 = creds.password;
        // Add logic here to look up the user from the credentials supplied
        const admin = await Admin.findOne({ username: username1 }); // Updated property name
      
        if (!admin) {
          const obj = { username: username1, password: password1 };
          const newAdmin = new Admin(obj);
          let adminDb = await newAdmin.save();
          // console.log(adminDb);
          return {
            id: adminDb._id,
            email: adminDb.username,
          };
        } else {
          if (admin.password !== password1) {
            return null;
          }
          // User is authenticated
          return {
            id: admin._id,
            email: admin.username,
          };
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    encryption: true,
  },
};

export default NextAuth(authOptions);
