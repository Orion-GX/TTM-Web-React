import { IEquipmentResult } from "../result/equipmentResult";
import { Pagination } from "./paginateResponse";

export interface IEquipmentResponseList {
    [x: string]: any;
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