import prisma from "@/src/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor") || "";
  const limit = parseInt(searchParams.get("limit") || "6", 10);
  try {
    const allPosts = await prisma.post.findMany({
      select: {
        id: true,
        content: true,
        imageUrl: true,
        author: { select: { username: true } },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
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
    console.log(allPosts);
    return NextResponse.json({ posts: allPosts }, { status: 200 });
  } catch (error) {
    console.log("Error getting data ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
