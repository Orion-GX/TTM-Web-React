import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import { IEquipmentResponseList } from 'src/models/response/equipmentResponseList';
import { IEquipmentTableProps } from 'src/props/equipmentProps';

function RecentOrders(props: IEquipmentTableProps) {
  return (
    <Card>
      <RecentOrdersTable
        equipments={null}
        search={null}
        status={''}
        handleStatus={props.handleStatus}
      />
    </Card>
  );
}

export default RecentOrders;
