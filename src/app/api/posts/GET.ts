import prisma from "@/src/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor") || "";
  const limit = parseInt(searchParams.get("limit") || "6", 10);
  console.log(limit,cursor)
  const session = await getSession();
  try {
    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const userId = session.user.sub
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        content: true,
        imageUrl: true,
        author: { select: { username: true,profile_picture : true } },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
       likes : {
        where : {user : {auth0Id : userId}},
        select : {
          id : true
        }
       }
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
    const allPosts = posts.map(post => ({
      ...post,
      isUserLiked : post.likes.length > 0,
      likes: undefined,
    }))
    return NextResponse.json({ posts: allPosts }, { status: 200 });
  } catch (error) {
    console.log("Error getting data ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
