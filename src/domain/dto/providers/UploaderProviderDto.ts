import { type FileUploadDTO } from 'domain/shared/dtos/FileUploadDto';

export class UploadedFileRequestDTO {
  folder: string;
  file: FileUploadDTO;
}

export class UploadedFileResponseDTO {
  path: string;
}

export class DeletedFileRequestDTO {
  path: string;
  folder?: string;
}
