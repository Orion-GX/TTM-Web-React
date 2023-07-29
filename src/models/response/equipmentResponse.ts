import { IEquipmentResult } from "../result/equipmentResult";
export interface IEquipmentResponse {
    code: number,
    status: string,
    message: string,
    description: string,
    result?: IEquipmentResult
}