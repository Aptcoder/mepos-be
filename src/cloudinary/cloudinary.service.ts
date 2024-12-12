import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async getpresignedCloudinaryURL(): Promise<String> {
    const timestamp = new Date().getTime();
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
      },
      process.env.CLOUDINARY_API_SECRET,
    );
    return `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload?api_key=${process.env.CLOUDINARY_API_KEY}&timestamp=${timestamp}&signature=${signature}`
  }  
}
