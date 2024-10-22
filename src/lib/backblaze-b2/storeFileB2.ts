import "server-only";
import { b2 } from "./backblazeB2";
import { Directory } from "@/src/types/definition";

export async function storeFileB2(file: File, directory: Directory) {
  // converting file into buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { data: authData } = await b2.authorize();
  const { data: uploadData } = await b2.getUploadUrl({
    bucketId: process.env.BACKBLAZE_BUCKET_ID as string,
  });

  const { data } = await b2.uploadFile({
    uploadUrl: uploadData.uploadUrl,
    uploadAuthToken: uploadData.authorizationToken,
    data: buffer,
    fileName: `${directory}/${file.name}`,
  });

  const url = `https://truview-backblaze-proxy.uddinarsalan91.workers.dev/${data.fileName}?timestamp=${data.uploadTimestamp}`;
  return {
    imageUrl : url
  };
}
