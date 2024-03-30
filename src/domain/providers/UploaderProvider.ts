import {
  type DeletedFileRequestDTO,
  type UploadedFileRequestDTO,
  type UploadedFileResponseDTO,
} from 'domain/dto/providers/UploaderProviderDto';

export abstract class UploaderProvider {
  abstract delete(parameters: DeletedFileRequestDTO): Promise<void>;

  abstract upload(
    parameters: UploadedFileRequestDTO,
  ): Promise<UploadedFileResponseDTO>;

  abstract uploadPdf(
    file: Buffer,
    fileName: string,
  ): Promise<UploadedFileResponseDTO>;
}
