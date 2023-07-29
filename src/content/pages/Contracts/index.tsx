import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled,
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
import { apiUrl, IMAGE_URL, server } from 'src/constants/config';
import { IEquipmentResponseList } from 'src/models/response/equipmentResponseList';
import debouce from 'lodash.debounce';
import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Link, NavLink as RouterLink } from 'react-router-dom';
import {
  CONFIRM_DELETE_EQUIPMENT_TEXT,
  CONTENT_CONFIRM_DELETE_EQUIPMENT_TEXT,
  CONTRACT_LIST_TITLE_TEXT,
  EQUIPMENT_LIST_TITLE_TEXT,
  OPTION_DELETE,
  OPTION_EDIT,
  REQUEST_ERROR_TEXT,
  STATUS_SEARCH,
  STATUS_TEXT,
  STATUS_TEXT_LIST
} from 'src/constants';
import { IEquipmentResult } from 'src/models/result/equipmentResult';
import { Image } from '@mui/icons-material';
import ModalCustom from 'src/components/CustomModal';
import ModalSuccess from 'src/components/ModalSuccess';
import ModalError from 'src/components/ModalError';
import EquipmentPageHeader from '../Equipments/PageHeader';
import ContractPageHeader from './PageHeader';
import { IContractResonseList } from 'src/models/response/contractResponseList';
import { IContractResult } from 'src/models/result/contractResult';
const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(15)};
    }
`
);

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
        color: 'warning'
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

function ContractsManagementPage() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [equipmentData, setEquipmentData] = useState<IContractResonseList>();
  const [itemList, setItemList] = useState<IContractResult[]>([]);
  const [filters, setFilters] = useState('');
  const isFirstRender = useRef(true);
  const [openCustom, setOpenCustom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itemValue, setItemValue] = useState<IContractResult>();
  const [errorMessage, setErrorMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
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
        apiUrl + server.CONTRACT_SEARCH + '?limit=' + limit + '&page=' + page,
        {
          search: search
        }
      )
      .then((res) => {
        if (res.status == 200) {
          const resultData: IContractResonseList = res.data;
          console.log(resultData);
          if (resultData.code == 200) {
            setTotalItem(resultData.result?.pagination.total_item);
            setItemList(resultData.result.content);
          } else {
            setTotalItem(0);
            setItemList(null);
          }
        } else {
          const test: IContractResonseList = res.data;
          setItemList(test.result.content);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const editEquipment = async (isEnableFlag) => {
    // if (itemValue == null) {
    //   setOpenErrorDialog(true);
    //   setErrorMessage('กรุณาเลือกรายการที่ต้องการลบ');
    // }
    // let data = {
    //   name: itemValue.name,
    //   amount: itemValue.amount,
    //   image: itemValue.image,
    //   staus_flag: itemValue.status_flag,
    //   enable_flag: isEnableFlag,
    //   type_id: itemValue.type.id
    // };
    // console.log(data);
    // await axios({
    //   method: 'put',
    //   timeout: 1000 * 10,
    //   url: apiUrl + server.EQUIPMENT_EDIT + itemValue.id,
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data: data
    // })
    //   .then((res) => {
    //     setItemValue(null);
    //     setLoading(false);
    //     getEquipment();
    //     if (res.status == 200) {
    //       setLoading(false);
    //       setOpenDialog(true);
    //       setErrorMessage(res.data.description);
    //     } else {
    //       setLoading(false);
    //       setOpenErrorDialog(true);
    //       setErrorMessage(res.data.description);
    //     }
    //   })
    //   .catch((err) => {
    //     setItemValue(null);
    //     setLoading(false);
    //     setOpenErrorDialog(true);
    //     setErrorMessage(REQUEST_ERROR_TEXT);
    //   });
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
        <title>Contract - Management</title>
      </Helmet>
      <ModalSuccess
        open={openDialog}
        handleClose={() => {
          setItemValue(null);
          setErrorMessage('');
          setOpenDialog(false);
        }}
      />
      <ModalError
        description={errorMessage}
        open={openErrorDialog}
        handleClose={() => {
          setItemValue(null);
          setErrorMessage('');
          setOpenErrorDialog(false);
        }}
      />
      <ModalCustom
        title={CONFIRM_DELETE_EQUIPMENT_TEXT}
        description={CONTENT_CONFIRM_DELETE_EQUIPMENT_TEXT}
        cancelButton={true}
        confirmButton={true}
        open={openCustom}
        handleClose={() => {
          setOpenCustom(false);
        }}
        handleConfirm={() => {
          setOpenCustom(false);
          setLoading(true);
          editEquipment(false);
        }}
      />
      <PageTitleWrapper>
        <ContractPageHeader
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
                  title={CONTRACT_LIST_TITLE_TEXT}
                />
                <Divider />
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ลำดับ</TableCell>
                        <TableCell>ชื่ออุปกรณ์</TableCell>
                        <TableCell align="center">หน่วยงาน</TableCell>
                        <TableCell align="center">วันที่เริ่มสัญญา</TableCell>
                        <TableCell align="center">วันที่สิ้นสุดสัญญา</TableCell>
                        <TableCell align="right">สถานะการใช้งาน</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {itemList != null ? (
                        itemList.map((item: IContractResult, index) => {
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
                                  {index + 1}
                                </Typography>
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
                                  {item.name}
                                </Typography>
                              </TableCell>
                              <TableCell align="left">
                                <Typography
                                  variant="body1"
                                  fontWeight="bold"
                                  color="text.primary"
                                  fontSize="18px"
                                  gutterBottom
                                  noWrap
                                >
                                  {item.department
                                    ? item.department.name
                                    : 'ไม่มีหน่วยงาน'}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography
                                  variant="body1"
                                  fontWeight="bold"
                                  color="text.primary"
                                  fontSize="18px"
                                  gutterBottom
                                  noWrap
                                >
                                  {item.start_date ? item.start_date : ''}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography
                                  variant="body1"
                                  fontWeight="bold"
                                  color="text.primary"
                                  fontSize="18px"
                                  gutterBottom
                                  noWrap
                                >
                                  {item.end_date ? item.end_date : ''}
                                </Typography>
                              </TableCell>
                              <TableCell align="right">
                                {getStatusLabel(item.status_flag)}
                              </TableCell>
                              <TableCell align="right">
                                <Tooltip title={OPTION_EDIT} arrow>
                                  <Link
                                    to={{ pathname: '/equipment/edit' }}
                                    state={{ id: item.id }}
                                  >
                                    <IconButton
                                      sx={{
                                        '&:hover': {
                                          background:
                                            theme.colors.primary.lighter
                                        },
                                        color: theme.palette.primary.main
                                      }}
                                      color="inherit"
                                      size="small"
                                    >
                                      <EditTwoToneIcon fontSize="small" />
                                    </IconButton>
                                  </Link>
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
                                    onClick={() => {
                                      setItemValue(item);
                                      setOpenCustom(true);
                                    }}
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

export default ContractsManagementPage;
