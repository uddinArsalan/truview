import { NextRequest, NextResponse } from "next/server";
import sanitize from "sanitize-filename";
import B2 from "backblaze-b2";

const BACKBLAZE_KEY_ID = process.env.BACKBLAZE_KEY_ID || "";
const BACKBLAZE_APP_KEY = process.env.BACKBLAZE_APP_KEY || "";
const BACKBLAZE_BUCKET_ID = process.env.BACKBLAZE_BUCKET_ID || "";

const b2 = new B2({
  applicationKeyId: BACKBLAZE_KEY_ID,
  applicationKey: BACKBLAZE_APP_KEY,
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const directory = (await params).type;
    const formData = await req.formData();
    const formKey =
      directory == "profile-images" ? "profile-image" : "post-image";
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
      fileName: `${directory}/${file.name}`,
    });
    console.log("After uploaded Data", data);
    // const d = await b2.getBucket()
    // const bucketName = authData.allowed.bucketName;
    // const downloadURL = authData.downloadUrl;
    // const {data : bucketsList} = await b2.listBuckets();
    // const bucketName = bucketsList.buckets[0].bucketName;
    // console.log("Bucket list",bucketsList.buckets)

    // console.log("Bucket Name", bucketName);
    // console.log("Download URl Name", downloadURL);

    return NextResponse.json({
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
