import { PrismaClient } from "@prisma/client";
import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(){
    const data = await getSession();
    const user = data?.user;
    const email = user?.email;
    const user_id = user?.sid;
    try{
        const users = await prisma.user.findUnique({
            where: {
              email,
            },
            select: {
              username: true,
              posts: {
                select: {
                  metadata: {
                    select: {
                      imageUrl: true,
                    },
                  },
                },
              },
            },
          });
          console.log(users);
          return NextResponse.json({ users },{status : 200});
    }catch(error){
        console.log("Error getting data ", error)
        return NextResponse.json({error},{status : 500 });
    }
}