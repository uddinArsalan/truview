import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0";
const baseUrl = process.env.AUTH0_BASE_URL || "http://localhost:3000";

export const GET = handleAuth({
  login: handleLogin({
    returnTo: "/",
  }),
  signup: handleLogin({
    authorizationParams: {
      screen_hint: "signup",
    },
    returnTo: "/",
  }),
});
