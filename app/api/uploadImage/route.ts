import { NextRequest, NextResponse } from "next/server";
import sanitize from "sanitize-filename";
// const axios = require("axios");

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  try {
    const file : File | null = formData.get('image') as unknown as File
    console.log(file)
    console.log(sanitize("~/.\u0000ssh/authorized_keys"))
    console.log(file)
    return NextResponse.json("Hi I am running correctly", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}