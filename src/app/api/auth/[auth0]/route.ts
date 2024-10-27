import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0";
const baseUrl = process.env.AUTH0_BASE_URL;

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      redirect_uri: `${baseUrl}/api/auth/callback`,
    },
    returnTo: "/",
  }),
  signup: handleLogin({
    authorizationParams: {
      screen_hint: "signup",
      redirect_uri: `${baseUrl}/api/auth/callback`,
    },
    returnTo: "/",
  }),
  logout: handleLogout({
    returnTo: `${baseUrl}`,
  }),
});
