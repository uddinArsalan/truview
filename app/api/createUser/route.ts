import { NextRequest,NextResponse } from "next/server";
// import { PrismaClient } from '@prisma/client';
import { getSession } from '@auth0/nextjs-auth0';
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient();


export async function POST(req: NextRequest){
    try{
        const data = await getSession();
        
        const email : string = data?.user.email;
        const username : string = data?.user.nickname;
        const user_id = data?.user.sid
        // const user_id = data?.user.
        console.log("Here I am",email,username)
        const user : Prisma.UserCreateWithoutPostsInput = await prisma.user.create({
            data: {
              user_id ,
              email: email,
              username: username
            },
          })
          // console.log(user.)
        return NextResponse.json({user},{status : 200});
    } catch(error){
        console.log("Error getting data ", error)
        return NextResponse.json({error},{status : 500 });
    }
}