// cloudinary
import {
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary/types/index";

var cloudinary = require("cloudinary");

export default class CloudinaryManager {
  static uploadImage = (base64: string) => {
    return new Promise<UploadApiResponse | UploadApiErrorResponse>(
      async (resolve, reject) => {
        cloudinary.v2.uploader.upload(
          base64,
          function (error: UploadApiErrorResponse, result: UploadApiResponse) {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
      }
    );
  };
}
