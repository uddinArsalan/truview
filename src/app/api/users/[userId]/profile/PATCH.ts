import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { storeFileB2 } from "@/src/lib/backblaze-b2/storeFileB2";
import prisma from "@/src/lib/prisma/prisma";
import { getSession } from "@auth0/nextjs-auth0";
const CLIENT_ID = process.env.AUTH0_MANAGEMENT_CLIENT_ID;
const CLIENT_SECRET = process.env.AUTH0_MANAGEMENT_CLIENT_SECRET;

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const formData = await req.formData();
    const { userId } = params;
    const session = await getSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 404 });
    }

    const file = formData.get("profile-image") as File | null;
    const bio = formData.get("bio") as string | null;
    const { user } = session;
    const authId = user?.sub;

    let imageUrl = null;
    if (file) {
      const { imageUrl: storedImageUrl } = await storeFileB2(
        file,
        "profile_images"
      );
      imageUrl = storedImageUrl;
    }

    if (imageUrl) {
      const tokenData = await axios.post(
        "https://dev-ic3y40p3ppmkci4u.us.auth0.com/oauth/token",
        {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          audience: "https://dev-ic3y40p3ppmkci4u.us.auth0.com/api/v2/",
          grant_type: "client_credentials",
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const BEARER_TOKEN = tokenData.data.access_token;

      await axios.patch(
        `https://dev-ic3y40p3ppmkci4u.us.auth0.com/api/v2/users/${authId}`,
        { user_metadata: { picture: imageUrl } },
        {
          headers: {
            authorization: `Bearer ${BEARER_TOKEN}`,
            "Content-type": "application/json",
          },
        }
      );
    }
    const updatedProfile = await prisma.user.update({
      where: { id: userId },
      data: {
        bio: bio,
        profile_picture: imageUrl,
      },
    });
    return NextResponse.json({ updatedProfile }, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
