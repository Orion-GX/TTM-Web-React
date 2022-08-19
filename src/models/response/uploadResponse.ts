import { IUploadResult } from "../result/uploadResult";

export interface IUploadResponse {
    message?: string;
    data?: IUploadResult[];
}