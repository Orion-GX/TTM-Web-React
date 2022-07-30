import { Dispatch, SetStateAction } from "react";
import { IEquipmentResponseList } from "src/models/response/equipmentResponseList";

export interface IEquipmentTableProps {
    className?: string;
    equipments?: IEquipmentResponseList;
    search?: string | null;
    setStatus?: Dispatch<SetStateAction<string>>
    status?: string | null;
    handleStatus?: (e: any) => any;
    handlePageChange?: (e: any) => any;
    handleLimitChange?: (e: any) => any;
}
