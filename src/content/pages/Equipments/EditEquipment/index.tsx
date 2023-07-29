import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  COMFIRM_BUTTON_TEXT,
  CONFIRM_DELETE_EQUIPMENT_TEXT,
  CONTENT_CONFIRM_DELETE_EQUIPMENT_TEXT,
  DESCRIPTION_TEXT,
  EQUIPMENT_ADD,
  EQUIPMENT_AMOUNT_TEXT,
  EQUIPMENT_EDIT,
  EQUIPMENT_MANAGEMENT,
  EQUIPMENT_TEXT,
  EQUIPMENT_TYPE_TEXT,
  IMAGE_SIZE_ERROR_TEXT,
  REQUEST_ERROR_TEXT,
  REQUEST_UPLOAD_ERROR_TEXT,
  STATUS_SEARCH,
  STATUS_TEXT_LIST,
  UPLOAD_TEXT
} from 'src/constants';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import axios from 'axios';
import { apiUrl, IMAGE_URL, server, UPLOAD_URL } from 'src/constants/config';
import { IEquipmentTypeResponse } from 'src/models/response/equipmentTypeResponse';
import { IEquipmentResult } from 'src/models/result/equipmentResult';
import {
  getStatus,
  getStatusLabel,
  validateFileSize
} from 'src/utils/commonUtil';
import LoadingBackdrop from 'src/components/LoadingBackDrop';
import ModalSuccess from 'src/components/ModalSuccess';
import ModalError from 'src/components/ModalError';
import { EditDataProps } from 'src/props/editProps';
import { IEquipmentResponseList } from 'src/models/response/equipmentResponseList';
import { useLocation } from 'react-router';
import { IEquipmentResponse } from 'src/models/response/equipmentResponse';
import { IUploadResponse } from 'src/models/response/uploadResponse';
import ModalCustom from 'src/components/CustomModal';
import CustomDropdownStatus from 'src/components/CustomDropdownStatus';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import { TERMINATED } from 'src/constants/statusConstant';

const CardCover = styled(Card)(
  ({ theme }) => `
      position: relative;
  
      .MuiCardMedia-root {
        height: ${theme.spacing(26)};
      }
  `
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
      position: absolute;
      right: ${theme.spacing(2)};
      bottom: ${theme.spacing(2)};
  `
);

const Input = styled('input')({
  display: 'none'
});

function EditEquipment(props: EditDataProps) {
  const [itemId, setItemId] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imagePathDefault, setImagePathDefault] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [amount, setAmount] = useState(0);
  const [amountError, setAmountError] = useState(false);
  const [type, setType] = useState('');
  const [typeError, setTypeError] = useState(false);
  const [typeList, setTypeList] = useState<IEquipmentResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [openCustom, setOpenCustom] = useState(false);
  const [createId, setCreateId] = useState('');
  const [filters, setFilters] = useState('');
  const statusOptions = STATUS_SEARCH.slice(0, STATUS_SEARCH.length - 1);
  const [status, setStatus] = useState('');
  const location = useLocation();

  const validateData = () => {
    let check = false;
    if (!name) {
      setNameError(true);
      check = true;
    } else {
      setNameError(false);
    }
    if (!amount) {
      check = true;
      setAmountError(true);
    } else {
      setAmountError(false);
    }
    if (!check) {
      setLoading(true);
      if (image) {
        uploadImage();
      } else {
        editEquipment(imagePathDefault, true);
      }
    }
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    history.back();
  };

  const handleCloseCustomDialog = () => {
    setOpenCustom(false);
  };

  const handleCloseErrorDialog = () => {
    if (errorMessage == REQUEST_UPLOAD_ERROR_TEXT) {
      history.back();
      setOpenErrorDialog(false);
    } else {
      setOpenErrorDialog(false);
    }
  };
  const handleChangeSnackBar = () => {
    setSnackbar(!snackbar);
  };
  const handleChangeLoading = () => {
    setLoading(!loading);
  };

  const handleStatusChange = (e: any) => {
    for (let i = 0; i < statusOptions.length; i++) {
      const element = statusOptions[i];
      // console.log(element);

      if (element.id == e.target.value) {
        setFilters(element.id);
        setStatus(element.id);
      }
    }
  };

  const handleChangeImage = (e) => {
    const [file] = e.target.files;
    console.log(file);
    console.log(e.target.files);

    if (file) {
      if (!validateFileSize(file.size)) {
        setOpenErrorDialog(true);
        setErrorMessage(IMAGE_SIZE_ERROR_TEXT);
      } else {
        setImage(file);
        setImageUrl(URL.createObjectURL(file));
      }
      //   console.log(file);
    }
  };

  const editEquipment = async (imagePath, isEnableFlag) => {
    console.log(createId);

    let type_id = typeList.find((e) => e.name == type);
    let data = {
      name: name,
      amount: amount,
      image: imagePath,
      staus_flag: status,
      enable_flag: status == TERMINATED ? false : isEnableFlag,
      type_id: type_id ? type_id.id : null
    };
    console.log(data);

    await axios({
      method: 'put',
      timeout: 1000 * 10,
      url: apiUrl + server.EQUIPMENT_EDIT + itemId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    })
      .then((res) => {
        setLoading(false);
        if (res.status == 200) {
          setLoading(false);
          setOpenDialog(true);
          setErrorMessage(res.data.description);
        } else {
          setLoading(false);
          setOpenErrorDialog(true);
          setErrorMessage(res.data.description);
        }
      })
      .catch((err) => {
        setLoading(false);
        setOpenErrorDialog(true);
        setErrorMessage(REQUEST_ERROR_TEXT);
      });
  };

  const uploadImage = async () => {
    let url = UPLOAD_URL + server.EQUIPMENT_IMAGE_UPLOAD;
    let header = {
      'Content-Type': 'multipart/form-data'
    };
    const formData = new FormData();
    formData.append('file', image);
    const uploadImg = await axios({
      method: 'post',
      url: url,
      data: formData,
      headers: header
    })
      .then((res) => {
        if (res.status == 200) {
          let result: IUploadResponse = res.data;

          console.log(result);

          editEquipment(result.data[0].filename, true);
          // setLoading(false);
          // setOpenDialog(true);
          // setErrorMessage(res.data.description);
        } else {
          setLoading(false);
          setOpenErrorDialog(true);
          setErrorMessage(res.data.description);
        }
      })
      .catch((err) => {
        setLoading(false);
        setOpenErrorDialog(true);
        setErrorMessage(REQUEST_UPLOAD_ERROR_TEXT);
      });
  };

  const getEquipmentInfo = async (id) => {
    await axios
      .get(apiUrl + server.EQUIPMENT_DETAIL + id)
      .then((res) => {
        if (res.status == 200) {
          const resultData: IEquipmentResponse = res.data;
          setName(resultData.result.name);
          setAmount(resultData.result.amount);
          setStatus(resultData.result.status_flag);
          setFilters(resultData.result.status_flag);
          if (resultData.result.type) {
            setType(resultData.result.type ? resultData.result.type.name : '');
          }
          if (resultData.result.image) {
            setImagePathDefault(resultData.result.image);
            setImageUrl(IMAGE_URL + resultData.result.image);
          }
        } else {
          setLoading(false);
          setOpenErrorDialog(true);
          setErrorMessage(REQUEST_ERROR_TEXT);
        }
      })
      .catch((err) => {
        setLoading(false);
        setOpenErrorDialog(true);
        setErrorMessage(REQUEST_ERROR_TEXT);
      });
  };

  const getEquipmentType = async () => {
    await axios
      .get(apiUrl + server.EQUIPMENT_TYPE)
      .then((res) => {
        if (res.status == 200) {
          const resultData: IEquipmentTypeResponse = res.data;
          setTypeList(resultData.result);
        } else {
          const test: IEquipmentTypeResponse = res.data;
          setTypeList(test.result);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    let x: any = location.state;
    console.log(x.id);
    setItemId(x.id);
    getEquipmentType();
    getEquipmentInfo(x.id);
  }, []);

  return (
    <>
      <Helmet>
        <title>{EQUIPMENT_MANAGEMENT}</title>
      </Helmet>
      <ModalSuccess open={openDialog} handleClose={handleCloseDialog} />
      <ModalError
        description={errorMessage}
        open={openErrorDialog}
        handleClose={handleCloseErrorDialog}
      />
      <ModalCustom
        title={CONFIRM_DELETE_EQUIPMENT_TEXT}
        description={CONTENT_CONFIRM_DELETE_EQUIPMENT_TEXT}
        cancelButton={true}
        confirmButton={true}
        open={openCustom}
        handleClose={handleCloseCustomDialog}
        handleConfirm={() => {
          setOpenCustom(false);
          setLoading(true);
          editEquipment(imagePathDefault, false);
        }}
      />
      <LoadingBackdrop loading={loading} handleChange={handleChangeLoading} />
      <PageTitleWrapper>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} lg={12}>
            <Typography variant="h2" component="h2" gutterBottom>
              {EQUIPMENT_EDIT}
            </Typography>
          </Grid>
        </Grid>
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
              <CardHeader
                style={{ backgroundColor: '#F9FAFC', fontSize: '19px' }}
                action={
                  <Box style={{ paddingInline: '20px', fontSize: '19px' }}>
                    <Grid
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={3}
                    >
                      <Grid item>
                        <CustomDropdownStatus
                          handleStatusChange={handleStatusChange}
                          filters={filters}
                          statusOptions={statusOptions}
                        />
                        {/* {getStatusLabel(status)} */}
                      </Grid>
                      <Grid item>
                        <Button
                          style={{ fontSize: '19px', color: 'black' }}
                          fullWidth
                          variant="contained"
                          color="warning"
                          onClick={(e) => {
                            setErrorMessage('');
                            setOpenCustom(true);
                          }}
                        >
                          ลบข้อมูล
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                }
                titleTypographyProps={{ fontSize: '19px' }}
                title={DESCRIPTION_TEXT}
              />
              <Divider />
              <CardContent style={{}}>
                <Box marginBottom="20px" marginX="10px">
                  <CardCover>
                    <CardMedia
                      image={
                        imageUrl
                          ? imageUrl
                          : '/static/images/placeholders/covers/upload.jpg'
                      }
                    />
                    <CardCoverAction>
                      <Input
                        accept="image/*"
                        id="change-cover"
                        multiple
                        type="file"
                        onChange={handleChangeImage}
                      />
                      <label htmlFor="change-cover">
                        <Button
                          startIcon={<UploadTwoToneIcon />}
                          variant="contained"
                          component="span"
                          style={{ fontSize: '17px' }}
                        >
                          {UPLOAD_TEXT}
                        </Button>
                      </label>
                    </CardCoverAction>
                  </CardCover>
                </Box>
                <Box component="form" noValidate autoComplete="off">
                  <div>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="stretch"
                    >
                      <Grid
                        item
                        paddingX="10px"
                        marginTop="10px"
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                      >
                        <TextField
                          required
                          fullWidth
                          id="name"
                          inputProps={{ maxLength: 255 }}
                          value={name}
                          label={'ชื่อ' + EQUIPMENT_TEXT}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                        {nameError ? (
                          <Typography
                            fontFamily="Quark-Bold"
                            fontSize="16px"
                            paddingX="10px"
                            color="red"
                          >
                            กรุณากรอกชื่อ{EQUIPMENT_TEXT}ให้ถูกต้อง
                          </Typography>
                        ) : (
                          <></>
                        )}
                      </Grid>

                      <Grid
                        item
                        paddingX="10px"
                        marginTop="10px"
                        xs={12}
                        sm={3}
                        md={3}
                        lg={3}
                      >
                        <TextField
                          required
                          fullWidth
                          id="citizen"
                          value={amount}
                          label={EQUIPMENT_AMOUNT_TEXT}
                          onChange={(e) => {
                            const regex = /^[0-9\b]+$/;
                            if (
                              e.target.value === '' ||
                              regex.test(e.target.value)
                            ) {
                              setAmount(parseInt(e.target.value));
                            }
                          }}
                        />
                        {amountError ? (
                          <Typography
                            fontFamily="Quark-Bold"
                            fontSize="16px"
                            paddingX="10px"
                            color="red"
                          >
                            กรุณากรอก{EQUIPMENT_AMOUNT_TEXT}ให้ถูกต้อง
                          </Typography>
                        ) : (
                          <></>
                        )}
                      </Grid>
                      <Grid
                        item
                        paddingX="10px"
                        marginTop="10px"
                        xs={12}
                        sm={3}
                        md={3}
                        lg={3}
                      >
                        <FormControl fullWidth>
                          <InputLabel id="gender">
                            {EQUIPMENT_TYPE_TEXT}
                          </InputLabel>
                          <Select
                            required
                            labelId="gender-label"
                            id="gender-select"
                            value={type}
                            defaultValue={EQUIPMENT_TYPE_TEXT}
                            label="gender"
                            onChange={(e) => {
                              setType(e.target.value);
                            }}
                          >
                            <MenuItem style={{ fontSize: '17px' }} value={''}>
                              กรุณาเลือกหน่วย
                            </MenuItem>
                            {typeList
                              ? typeList.map(
                                  (item: IEquipmentResult, index: number) => (
                                    <MenuItem
                                      key={index}
                                      style={{ fontSize: '17px' }}
                                      value={item.name}
                                    >
                                      {item.name}
                                    </MenuItem>
                                  )
                                )
                              : null}
                          </Select>
                        </FormControl>
                        {typeError ? (
                          <Typography
                            fontFamily="Quark-Bold"
                            fontSize="16px"
                            paddingX="10px"
                            color="red"
                          >
                            กรุณาเลือก{EQUIPMENT_TYPE_TEXT}
                          </Typography>
                        ) : (
                          <></>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                </Box>
                <Box>
                  <Grid
                    container
                    direction="row"
                    justifyContent="end"
                    alignItems="stretch"
                    marginTop="20px"
                  >
                    <Grid
                      item
                      paddingX="10px"
                      marginTop="10px"
                      xs={12}
                      sm={12}
                      md={2}
                      lg={2}
                    >
                      <Button
                        fullWidth
                        variant="contained"
                        style={{ fontSize: '20px' }}
                        color="primary"
                        onClick={(e) => {
                          validateData();
                        }}
                      >
                        {COMFIRM_BUTTON_TEXT}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default EditEquipment;
