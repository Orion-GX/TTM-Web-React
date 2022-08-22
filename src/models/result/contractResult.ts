import { IDepartmentResult } from "./departmentResult";

export interface IContractResult {
    id?: number;
    name?: string;
    start_date?: Date;
    end_date?: Date;
    detail?: string;
    status?: string;
    budget?: string;
    pdf?: string;
    created_date?: Date;
    updated_date?: null;
    status_flag?: string;
    enable_flag?: boolean;
    department_id?: number;
    department?: IDepartmentResult;
}