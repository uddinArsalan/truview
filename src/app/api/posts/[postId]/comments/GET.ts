import prisma from "@/src/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor") || "";
  const limit = parseInt(searchParams.get("limit") || "6", 10);
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      select: {
        id : true,
        content: true,
        user: { select: { username: true, profile_picture: true } },
        createdAt : true
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: cursor ? 1 : undefined,
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
    });
    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.log("Error getting post info ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
