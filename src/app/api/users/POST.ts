import { NextRequest, NextResponse } from "next/server";
import { getSession, Claims } from "@auth0/nextjs-auth0";
import prisma from "@/src/lib/prisma/prisma";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { user } = session;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { auth0Id: user.sub },
    });

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          auth0Id: user.sub,
          email: user.email,
          username: user.nickname,
          profile_picture: user.picture,
        },
      });
      return NextResponse.json({ user: newUser }, { status: 200 });
    }

    return NextResponse.json({ user: existingUser }, { status: 200 });
  } catch (error) {
    console.error("Error handling user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
