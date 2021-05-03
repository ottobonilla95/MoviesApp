// cloudinary
import {
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary/types/index";

export default class CloudinaryManager {
  static uploadImage = (base64: string) => {
    return new Promise<UploadApiResponse | UploadApiErrorResponse>(
      async (resolve, reject) => {
        setTimeout(() => {
          resolve({
            url: base64,
            message: "message",
            name: "name",
            http_code: 200,
          });
        }, 100);
      }
    );
  };
}
