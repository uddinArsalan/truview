import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import prisma from "@/src/lib/prisma/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const session = await getSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { content }: { content: string } = await req.json();
    const { postId } = await params;
    const userId = session.user.sub;

    const commentCreated = await prisma.comment.create({
      data: {
        content,
        user: { connect: { auth0Id: userId } },
        post: { connect: { id: postId } },
      },
      select: {
        id: true,
        createdAt: true,
        content: true,
        user: { select: { username: true, profile_picture: true } },
      },
    });

    return NextResponse.json({ comment: commentCreated }, { status: 200 });
  } catch (error) {
    console.error("Error posting comment:", error);
    return NextResponse.json(
      { error: "Error posting comment" },
      { status: 500 }
    );
  }
}
