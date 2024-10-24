import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { storeFileB2 } from "@/src/lib/backblaze-b2/storeFileB2";
const CLIENT_ID = process.env.AUTH0_MANAGEMENT_CLIENT_ID;
const CLIENT_SECRET = process.env.AUTH0_MANAGEMENT_CLIENT_SECRET;

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const formData = await req.formData();
    const { userId } = params;
    const file: File | null = formData.get("profile-image") as File;
    const { imageUrl } = await storeFileB2(file, "profile_images");

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

    const BEARER_TOKENS = tokensData.data.access_token;

    const options = {
      method: "PATCH",
      url: `https://dev-ic3y40p3ppmkci4u.us.auth0.com/api/v2/users/${userId}`,
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
