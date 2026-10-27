import type { FileStatus } from "./primitives.types";

export default interface UploadItem {
  id: number;
  name: string;
  type: string;
  sizeKb: number;
  status: FileStatus;
  error?: string;
  retryable?: boolean;
  file?: File;
};