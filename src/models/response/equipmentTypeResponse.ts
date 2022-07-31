import { IEquipmentResult } from "../result/equipmentResult";

export interface IEquipmentTypeResponse {
    code: number,
    status: string,
    message: string,
    description: string,
    result?: IEquipmentResult[]
}