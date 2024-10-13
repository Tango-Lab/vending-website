import { POST } from '@Core';

export interface FileResponse {
  url: string;
  fileName: string;
}

export function uploadFiles(file: FormData): Promise<FileResponse> {
  const header = {
    'Content-Type': 'multipart/form-data',
  };
  return POST<FileResponse>('/api/file/v1/upload', file, header);
}
