import { ChangeEvent, useState, useEffect } from 'react';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import { CryptoOrderStatus } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import {
  EQUIPMENT_LIST_TITLE_TEXT,
  OPTION_DELETE,
  OPTION_EDIT,
  STATUS_SEARCH,
  STATUS_TEXT
} from 'src/constants';
import { IEquipmentResponseList } from 'src/models/response/equipmentResponseList';
import { IEquipmentResult } from 'src/models/result/equipmentResult';
import { IEquipmentTableProps } from 'src/props/equipmentProps';
import axios from 'axios';
import { apiUrl, server } from 'src/constants/config';

const getStatusLabel = (cryptoOrderStatus: CryptoOrderStatus): JSX.Element => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color }: any = map[cryptoOrderStatus];

  return <Label color={color}>{text}</Label>;
};

const RecentOrdersTable = (props: IEquipmentTableProps) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const [itemList, setItemList] = useState<IEquipmentResult[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState('');
  const [status, setStatus] = useState('ALL');

  const statusOptions = STATUS_SEARCH.slice(0, STATUS_SEARCH.length - 1);

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    for (let i = 0; i < statusOptions.length; i++) {
      const element = statusOptions[i];

      if (element.id == e.target.value) {
        setFilters(element.id);
        getEquipment(e.target.value);
      }
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const getEquipment = async (status) => {
    await axios
      .post(
        apiUrl +
          server.EQUIPMENT_SEARCH +
          '?limit=' +
          limit +
          '&offset=' +
          page,
        {
          search: props.search,
          status: status
        }
      )
      .then((res) => {
        if (res.status == 200) {
          const test: IEquipmentResponseList = res.data;
          setItemList(test.result);
        } else {
          const test: IEquipmentResponseList = res.data;
          setItemList(test.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const applyFilters = async () => {};

  const applyPagination = (): IEquipmentResult[] => {
    return itemList;
  };

  const filteredCryptoOrders = applyFilters();
  const paginatedCryptoOrders = applyPagination();
  const theme = useTheme();

  useEffect(() => {
    getEquipment('');
  }, []);

  return (
    <Card>
      <CardHeader
        action={
          <Box width={180}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>{STATUS_TEXT}</InputLabel>
              <Select
                value={filters || 'ALL'}
                onChange={handleStatusChange}
                label="Status"
                autoWidth
              >
                {statusOptions.map((statusOption) => (
                  <MenuItem key={statusOption.id} value={statusOption.id}>
                    {statusOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        }
        title={EQUIPMENT_LIST_TITLE_TEXT}
      />
      {/* )} */}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>รูปภาพ</TableCell>
              <TableCell>ชื่ออุปกรณ์</TableCell>
              <TableCell align="right">จำนวนทั้งหมดในคลัง</TableCell>
              <TableCell align="right">สถานะการใช้งาน</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemList ? (
              itemList.map((item, index) => {
                return (
                  <TableRow hover key={index}>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {item.equipment_image}
                      </Typography>
                      {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {format(item.orderDate, 'MMMM dd yyyy')}
                    </Typography> */}
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {item.equipment_name}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {item.equipment_amount}  {item.equipment_type} 
                      </Typography>
                      {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(item.amount).format(`${item.currency}0,0.00`)}
                    </Typography> */}
                    </TableCell>
                    <TableCell align="right">
                      {/* {getStatusLabel(item.status)} */}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title={OPTION_EDIT} arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={OPTION_DELETE} arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.error.lighter
                            },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={itemList ? itemList.length : 0}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

export default RecentOrdersTable;
