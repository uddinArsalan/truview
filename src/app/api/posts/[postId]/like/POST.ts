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

    const isLiked = await prisma.like.count({
      where : {
        user : {auth0Id : userId},
        postId
      }
    });

    if (isLiked) {
      // Post is already liked, return 409 Conflict
      return NextResponse.json({}, { status: 409 });
    }

    await prisma.like.create({
      data: {
        user: { connect: { auth0Id: userId } },
        post: { connect: { id: postId } },
      },
    });

    return NextResponse.json({ });
  } catch (error) {
    console.error("Error creating like:", error);
    return NextResponse.json({ error: "Error creating like" }, { status: 500 });
  }
}
