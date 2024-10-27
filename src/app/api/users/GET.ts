import prisma from "@/src/lib/prisma/prisma";
import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const email = session.user?.email;
  try {
    const users = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        username: true,
        _count: {
          select: { posts: true },
        },
        posts: {
          select: {
            id : true,
            content: true,
            imageUrl: true,
            _count: {
              select: {
                likes: true,
                comments: true,
              },
            },
          },
        },
      },
    });
    console.log(users);
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.log("Error getting data ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
