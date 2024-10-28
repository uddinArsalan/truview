import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0";
const baseUrl = process.env.AUTH0_BASE_URL || 'http://localhost:3000';

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      redirect_uri: `${baseUrl}/api/auth/callback`,
      response_type: 'code',
      scope: 'openid profile email',
    },
    returnTo: "/",
  }),
  signup: handleLogin({
    authorizationParams: {
      screen_hint: "signup",
      redirect_uri: `${baseUrl}/api/auth/callback`,
      response_type: 'code',
      scope: 'openid profile email',
    },
    returnTo: "/",
  }),
  logout: handleLogout({
    returnTo: `${baseUrl}`,
  }),
});

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};