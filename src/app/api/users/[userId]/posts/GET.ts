import prisma from "@/src/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import { UserProfileDetails } from "@/src/types/definition";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const session = await getSession();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const userAllPosts = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        _count: {
          select: { posts: true },
        },
        bio: true,
        username: true,
        profile_picture: true,
        posts: {
          select: {
            id: true,
            content: true,
            imageUrl: true,
            _count: {
              select: {
                likes: true,
                comments: true,
              },
            },
            author: {
              select: {
                username: true,
                profile_picture: true,
              },
            },
            likes: {
              where: { user: { auth0Id: userId } },
              select: {
                id: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });
    const userProfileDetails: Partial<UserProfileDetails> = {
      ...userAllPosts,
      noOfPosts: userAllPosts?._count.posts,
      _count: undefined,
      posts: userAllPosts?.posts.map((post) => ({
        ...post,
        isUserLiked: post.likes.length > 0,
        author: {
          username: userAllPosts.username,
          profile_picture: userAllPosts.profile_picture,
        },
        likes: undefined,
      })),
    };
    return NextResponse.json({ userProfileDetails }, { status: 200 });
  } catch (error) {
    console.log("Error getting post info ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
