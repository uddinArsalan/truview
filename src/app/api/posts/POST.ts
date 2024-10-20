import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import prisma from "@/src/lib/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { imageUrl, descriptionOfImage } = await req.json();
    if (!imageUrl || !descriptionOfImage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Add validation for imageUrl (e.g., check if it's a valid URL, from an allowed domain, etc.)

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const userId = user.id;

    const post = await prisma.post.create({
      data: {
        content: descriptionOfImage,
        imageUrl: imageUrl,
        author: { connect: { id: userId } },
      },
      include: { author: true },
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
