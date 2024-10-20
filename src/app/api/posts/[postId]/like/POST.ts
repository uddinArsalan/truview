import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import prisma from "@/src/lib/prisma/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { postId } = params;
    const userId = session.user.sub;

    const post = await prisma.like.create({
      data: {
        user: { connect: { auth0Id: userId } },
        post: { connect: { id: postId } },
      },
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error creating like:", error);
    return NextResponse.json({ error: "Error creating like" }, { status: 500 });
  }
}
