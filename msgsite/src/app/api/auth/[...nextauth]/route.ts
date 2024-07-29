import NextAuth from "next-auth/next";
import { authOptions } from "./option";
const hadlers = NextAuth(authOptions)

export { hadlers as GET, hadlers as POST }