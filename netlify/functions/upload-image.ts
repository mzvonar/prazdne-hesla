import crypto from 'crypto';
import type { Handler, HandlerEvent } from "@netlify/functions";
import axios from 'axios';
import {v2 as cloudinary} from 'cloudinary';

const RECAPTCHA_SECRET = process.env.GOOGLE_RECAPTCHA_SECRET;
const IMAGE_CDN_FOLDER = process.env.VITE_IMAGE_CDN_FOLDER || 'prod';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

function getImageHash(imageBase64: string) {
  return crypto.createHash('md5').update(Buffer.from(imageBase64, 'base64')).digest('hex');
}

export const handler: Handler = async (event: HandlerEvent) => {
  try {
    if(!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Empty body',
        }),
      };
    }

    const { recaptchaToken, imageBase64 } = JSON.parse(event.body);
    
    // Verify reCAPTCHA token with Google
    const ipAddress = event.headers['client-ip'];
    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${recaptchaToken}&remoteip=${ipAddress}`
    );

    if (recaptchaResponse.data.success) {
      // reCAPTCHA verification successful

      const imageHash = getImageHash(imageBase64);

      // Upload the image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
        folder: `prazdne-hesla/${IMAGE_CDN_FOLDER}`, // Optional: Specify a folder in Cloudinary for uploads
        public_id: imageHash,
      });
console.log('uploadResponse: ', uploadResponse);
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Image uploaded successfully',
          imageName: imageHash,
          imageUrl: uploadResponse.secure_url,
        }),
      };
    } else {
      // reCAPTCHA verification failed
      return {
        statusCode: 403,
        body: JSON.stringify({ message: 'reCAPTCHA verification failed' }),
      };
    }
  }
  catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
