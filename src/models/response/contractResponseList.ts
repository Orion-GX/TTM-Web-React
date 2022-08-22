import { IContractResult } from "../result/contractResult";
import { Pagination } from "../result/paginateResponse";

export interface IContractResonseList {
    code: number;
    status: string;
    message: string;
    description: string;
    result?: Result;
}

export interface Result {
    pagination: Pagination;
    content: IContractResult[];
}