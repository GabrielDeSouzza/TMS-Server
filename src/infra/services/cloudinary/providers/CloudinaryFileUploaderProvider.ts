import { Injectable } from '@nestjs/common';

import {
  type UploadApiErrorResponse,
  type UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';

import {
  type DeletedFileRequestDTO,
  type UploadedFileRequestDTO,
  type UploadedFileResponseDTO,
} from 'domain/dto/providers/UploaderProviderDto';
import { type UploaderProvider } from 'domain/providers/UploaderProvider';

import { v2Config } from '../config';

type CloudinaryResponseProps = UploadApiResponse | UploadApiErrorResponse;

@Injectable()
export class CloudinaryUploaderProvider implements UploaderProvider {
  private client = cloudinary;

  constructor() {
    this.client.config(v2Config);
  }

  async upload({
    file,
    folder,
  }: UploadedFileRequestDTO): Promise<UploadedFileResponseDTO> {
    try {
      const timestamp = Date.now();

      const upload = await new Promise<CloudinaryResponseProps>(
        (resolve, reject) => {
          const uploadStream = this.client.uploader.upload_stream(
            { folder: `wolves/${folder}`, overwrite: true, timestamp },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );

          file.createReadStream().pipe(uploadStream);
        },
      );

      return {
        path: upload.secure_url as string,
      };
    } catch {
      return undefined;
    }
  }

  async delete({ path, folder }: DeletedFileRequestDTO): Promise<void> {
    const publicId = this.client
      .url(path, { type: 'fetch' })
      .split('/')
      .pop()
      .replace(/\.[^.]*$/, '');

    await this.client.uploader.destroy(
      `wolves/${folder}/${publicId}`,
      error => {
        if (error) {
          console.error(error);
        }
      },
    );
  }

  async uploadPdf(file: Buffer, fileName: string) {
    try {
      const upload = await new Promise<CloudinaryResponseProps>(
        (resolve, reject) => {
          const timestamp = Date.now();
          this.client.uploader
            .upload_stream(
              {
                folder: `wolves/cte/`,
                overwrite: true,
                timestamp,
                format: 'pdf',
                filename_override: fileName,
                use_filename: true,
                resource_type: 'raw',
                unique_filename: false,
                discard_original_filename: false,
              },
              (error, result) => {
                if (error) return reject(error);
                resolve(result);
              },
            )
            .end(file);
        },
      );

      return {
        path: upload.secure_url as string,
      };
    } catch (error) {
      console.error(error);

      return;
    }
  }
}
