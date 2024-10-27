import prisma from "@/src/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;
  try {
    const postWithComments = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        content: true,
        imageUrl: true,
        author: { select: { username: true } },
        _count: {
          select: {
            likes: true,
            comments : true
          },
        },
        comments: {
          select: {
            content: true,
            user: { select: { username: true } },
          },
          orderBy: { createdAt: "asc" },
          take: 5,
        },
      },
    });
    return NextResponse.json({ postWithComments }, { status: 200 });
  } catch (error) {
    console.log("Error getting post info ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
