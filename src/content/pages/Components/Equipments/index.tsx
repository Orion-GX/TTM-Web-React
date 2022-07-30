import {
  Box,
  Card,
  CardHeader,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState, useMemo, ChangeEvent, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { apiUrl, server } from 'src/constants/config';
import { IEquipmentResponseList } from 'src/models/response/equipmentResponseList';
import EquipmentPageHeader from './PageHeader';
import debouce from 'lodash.debounce';
import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import {
  EQUIPMENT_LIST_TITLE_TEXT,
  OPTION_DELETE,
  OPTION_EDIT,
  STATUS_SEARCH,
  STATUS_TEXT,
  STATUS_TEXT_LIST
} from 'src/constants';
import { IEquipmentResult } from 'src/models/result/equipmentResult';

const getStatusLabel = (textStatus: string): JSX.Element => {
  let map = {};
  console.log(textStatus);

  switch (textStatus) {
    case 'ACTIVE':
      map = {
        text: STATUS_TEXT_LIST.ACTIVE.name,
        color: 'success'
      };
      break;
    case 'PENDING':
      map = {
        text: STATUS_TEXT_LIST.PENDING.name,
        color: 'success'
      };
      break;
    case 'SUSPENDED':
      map = {
        text: STATUS_TEXT_LIST.SUSPENDED.name,
        color: 'error'
      };
      break;
    default:
      map = {
        text: STATUS_TEXT_LIST.ACTIVE.name,
        color: 'success'
      };
      break;
  }

  const { text, color }: any = map;

  return <Label color={color}>{text}</Label>;
};

function EquipmentManagementPage() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [equipmentData, setEquipmentData] = useState<IEquipmentResponseList>();
  const [itemList, setItemList] = useState<IEquipmentResult[]>([]);
  const [filters, setFilters] = useState('');
  const isFirstRender = useRef(true);
  const theme = useTheme();

  const statusOptions = STATUS_SEARCH.slice(0, STATUS_SEARCH.length - 1);

  const handleChange = (e) => {
    setText(e.target.value);
    setSearch(e.target.value);
    // getEquipment()
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    for (let i = 0; i < statusOptions.length; i++) {
      const element = statusOptions[i];
      // console.log(element);

      if (element.id == e.target.value) {
        setFilters(element.id);
        setStatus(element.id);
      }
    }
  };

  const debouncedResults = useMemo(() => {
    return debouce(handleChange, 300);
  }, []);

  const getEquipment = async () => {
    await axios
      .post(
        apiUrl +
          server.EQUIPMENT_SEARCH +
          '?limit=' +
          limit +
          '&offset=' +
          page,
        {
          search: search,
          status: status
        }
      )
      .then((res) => {
        if (res.status == 200) {
          const resultData: IEquipmentResponseList = res.data;
          console.log(resultData);
          setTotalItem(resultData.result?.pagination.total_item);
          setItemList(resultData.result.content);
        } else {
          const test: IEquipmentResponseList = res.data;
          setItemList(test.result.content);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    console.log('useEffect ran. status is: ', status);
    getEquipment(); // 👈️ this causes infinite loop
  }, [status, page, limit]);

  useEffect(() => {
    getEquipment();
  }, []);

  return (
    <>
      <Helmet>
        <title>Equipment - Management</title>
      </Helmet>
      <PageTitleWrapper>
        <EquipmentPageHeader
          handleChange={debouncedResults}
          onSearch={getEquipment}
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
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
                            <MenuItem
                              key={statusOption.id}
                              value={statusOption.id}
                            >
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
                      {itemList != null ? (
                        itemList.map((item: IEquipmentResult, index) => {
                          return (
                            <TableRow hover key={index}>
                              <TableCell>
                                <Typography
                                  variant="body1"
                                  fontWeight="bold"
                                  color="text.primary"
                                  fontSize="18px"
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
                                  fontSize="18px"
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
                                  fontSize="18px"
                                  gutterBottom
                                  noWrap
                                >
                                  {item.equipment_amount} {item.equipment_type}
                                </Typography>
                                {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(item.amount).format(`${item.currency}0,0.00`)}
                    </Typography> */}
                              </TableCell>
                              <TableCell align="right">
                                {getStatusLabel(item.equipment_status)}
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
                    count={totalItem}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25, 30]}
                  />
                </Box>
              </Card>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default EquipmentManagementPage;
