import { IEquipmentResult } from "../result/equipmentResult";
import { Pagination } from "../result/paginateResponse";

export interface IEquipmentResponseList {
    code: number,
    status: string,
    message: string,
    description: string,
    result?: Result
}

export interface Result {
    pagination?: Pagination;
    content?: IEquipmentResult[];
}