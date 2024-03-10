import { type ConfigOptions } from 'cloudinary';
import { env } from 'env';

export const v2Config: ConfigOptions = {
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
};
