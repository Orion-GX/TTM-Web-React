import { IEquipmentTypeResult } from "./equipmentTypeResult";

export interface IEquipmentResult {
    id?: number | null,
    name?: string | null,
    amount?: number | null,
    image?: string | null,
    status?: string | null,
    created_date?: string | null,
    updated_date?: string | null,
    status_flag?: string | null,
    enable_flag?: boolean | null,
    type?: IEquipmentTypeResult,
}