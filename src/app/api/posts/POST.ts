import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import prisma from "@/src/lib/prisma/prisma";
import { storeFileB2 } from "@/src/lib/backblaze-b2/storeFileB2";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const formData = await req.formData();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const file: File | null = formData.get("post-image") as unknown as File;
    const content = formData.get("content") as string;
    console.log(file, content);
    if (!file || !content) {
      return NextResponse.json(
        { error: "Both 'content' and 'post-image' are required." },
        { status: 400 }
      );
    }

    const { imageUrl } = await storeFileB2(file, "posts");

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const userId = user.id;

    const post = await prisma.post.create({
      data: {
        content,
        imageUrl,
        author: { connect: { id: userId } },
      },
      select: {
        id: true,
        content: true,
        imageUrl: true,
        author: {
          select: {
            username: true,
            profile_picture: true,
          },
        },
      },
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
