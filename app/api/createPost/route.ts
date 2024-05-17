import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from '@prisma/client';
import { getSession } from "@auth0/nextjs-auth0";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await getSession();
    const { imageUrl, descriptionOfImage } = await req.json();
    const email = data?.user.email;
    console.log(imageUrl, descriptionOfImage);
    if (!data?.user?.email) {
      throw new Error("User email not found in session data.");
    }
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error("User not found.");
    }
    const post = await prisma.post.create({
      data: {
        user: { connect: { user_id: user?.user_id } },
        description: descriptionOfImage,
      },
    });
    const ImageMetada =
      await prisma.imageMetadata.create({
        data: {
          imageUrl: imageUrl,
          post: { connect: { post_id: post?.post_id } },
          upload_date: new Date(),
        },
      });

    return NextResponse.json({ post });
  } catch (error) {
    console.log("Error getting data ", error);
  }
}
