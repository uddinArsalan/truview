import { NextRequest, NextResponse } from "next/server";
const axios = require("axios").default;
const BEARER_TOKENS = process.env.AUTH0_MANAGEMENT_TOKENS;

export async function PATCH(req: NextRequest) {
  try {
    const { selectedImg, user_Id } = await req.json();
    const options = {
      method: "PATCH",
      url: `https://dev-ic3y40p3ppmkci4u.us.auth0.com/api/v2/users/${user_Id}`,
      headers: {
        authorization: `Bearer ${BEARER_TOKENS}`,
        "Content-type": "application/json",
      },
      data: { user_metadata: { picture: selectedImg } },
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
