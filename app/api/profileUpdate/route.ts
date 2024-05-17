import { NextRequest, NextResponse } from "next/server";
const axios = require("axios").default;
// const BEARER_TOKENS = process.env.AUTH0_MANAGEMENT_TOKENS;
const CLIENT_ID = process.env.AUTH0_MANAGEMENT_CLIENT_ID;
const CLIENT_SECRET = process.env.AUTH0_MANAGEMENT_CLIENT_SECRET;

export async function PATCH(req: NextRequest) {
  try {
    const { imageUrl, user_Id } = await req.json();

    const data = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      audience: "https://dev-ic3y40p3ppmkci4u.us.auth0.com/api/v2/",
      grant_type: "client_credentials",
    };

    const tokensData = await axios.post(
      "https://dev-ic3y40p3ppmkci4u.us.auth0.com/oauth/token",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(tokensData.data.access_token);
    const BEARER_TOKENS = tokensData.data.access_token

    const options = {
      method: "PATCH",
      url: `https://dev-ic3y40p3ppmkci4u.us.auth0.com/api/v2/users/${user_Id}`,
      headers: {
        authorization: `Bearer ${BEARER_TOKENS}`,
        "Content-type": "application/json",
      },
      data: { user_metadata: { picture: imageUrl } },
    };
    const response = await axios.request(options);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
