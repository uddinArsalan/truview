import prisma from "@/src/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  try {
    const postWithComments = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        content: true,
        imageUrl: true,
        author: { select: { username: true, profile_picture: true } },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        comments: {
          select: {
            content: true,
            user: { select: { username: true, profile_picture: true } },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });
    return NextResponse.json({ postWithComments }, { status: 200 });
  } catch (error) {
    console.log("Error getting post info ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
