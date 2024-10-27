import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import prisma from "@/src/lib/prisma/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const session = await getSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { postId } = await params;
    const userId = session.user.sub;

    const post = await prisma.like.deleteMany({
      where: {
        postId,
        userId,
      },
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error creating like:", error);
    return NextResponse.json({ error: "Error creating like" }, { status: 500 });
  }
}
