import 'server-only'
import B2 from "backblaze-b2";

export const b2 = new B2({
  applicationKeyId: process.env.BACKBLAZE_KEY_ID as string,
  applicationKey: process.env.BACKBLAZE_APP_KEY as string,
});
