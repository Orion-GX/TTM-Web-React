import { IEquipmentResult } from "../result/equipmentResult";

export interface IEquipmentResponseList {
    code: number,
    status: string,
    message: string,
    description: string,
    result: IEquipmentResult[]
}