import { NextRequest, NextResponse } from "next/server";
import sanitize from "sanitize-filename";
import B2 from "backblaze-b2";

const BACKBLAZE_KEY_ID = process.env.BACKBLAZE_KEY_ID || "";
const BACKBLAZE_APP_KEY = process.env.BACKBLAZE_APP_KEY || "";
const BACKBLAZE_BUCKET_ID = process.env.BACKBLAZE_BUCKET_ID || "";

const b2 = new B2({
  applicationKeyId: BACKBLAZE_KEY_ID, // or accountId: 'accountId'
  applicationKey: BACKBLAZE_APP_KEY, // or masterApplicationKey
  
});

export async function POST(req: NextRequest,{ params }: { params: { slug: string } }) {
  // console.log(BACKBLAZE_APP_KEY, BACKBLAZE_BUCKET_ID, BACKBLAZE_KEY_ID);
  try {
    const directory = params.slug 
    const formData = await req.formData()
    console.log(directory)
    const formKey = directory == "CoverImages" ? "cover-image" : "image";
    const file: File | null = formData.get(formKey) as unknown as File;
    sanitize(file.name);

    // converting file into buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    // console.log(b2);

    const { data: authData } = await b2.authorize();
    // console.log("Auth Data", authData);
    const { data: uploadData } = await b2.getUploadUrl({
      bucketId: BACKBLAZE_BUCKET_ID,
    });
    console.log("upload Data", uploadData);
    const { data } = await b2.uploadFile({
      uploadUrl: uploadData.uploadUrl,
      uploadAuthToken: uploadData.authorizationToken,
      data: buffer,
    //   // there are no real directories in b2, if you want to place
    //   // your file in a folder structure, do so with slashes. ex:
    //   //   fileName: `/my-subfolder/uploads/${fileName}`
      fileName: `${directory}/${file.name}`,
      // info: {}, // store optional info, like original file name
    });
    // console.log("After uploaded Data", data);
    // const d = await b2.getBucket()
    // const bucketName = authData.allowed.bucketName;
    // const downloadURL = authData.downloadUrl;
    // const {data : bucketsList} = await b2.listBuckets();
    // const bucketName = bucketsList.buckets[0].bucketName;
    // console.log("Bucket list",bucketsList.buckets)

    // console.log("Bucket Name", bucketName);
    // console.log("Download URl Name", downloadURL);

    return NextResponse.json({
      // add timestamp to url to force re-fetching images with the same src
      // url: `${downloadURL}/file/${bucketName}/${data.fileName}?timestamp=${data.uploadTimestamp}`,
      url: `https://truview-backblaze-proxy.uddinarsalan91.workers.dev/${data.fileName}?timestamp=${data.uploadTimestamp}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
