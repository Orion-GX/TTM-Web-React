import { Dispatch, SetStateAction } from "react";
import { IEquipmentResponseList } from "src/models/response/equipmentResponseList";

export interface IEquipmentTableProps {
    className?: string;
    equipments?: IEquipmentResponseList | null;
    search?: string | null;
    setStatus?: Dispatch<SetStateAction<string>>
    status?: string | null;
    searchFunc?: () => void;
}
