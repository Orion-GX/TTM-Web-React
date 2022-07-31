import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  TextareaAutosize,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  ADDRESS_TEXT,
  CITIZEN_TEXT,
  COMFIRM_BUTTON_TEXT,
  DESCRIPTION_TEXT,
  EQUIPMENT_ADD,
  EQUIPMENT_AMOUNT_TEXT,
  EQUIPMENT_LIST_TITLE_TEXT,
  EQUIPMENT_MANAGEMENT,
  EQUIPMENT_TEXT,
  EQUIPMENT_TYPE_TEXT,
  GENDER_TEXT,
  NAME_TEXT,
  PASSWORD_TEXT,
  PHONE_TEXT,
  SALARY_TEXT,
  STATUS_TEXT,
  USERNAME_TEXT
} from 'src/constants';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import axios from 'axios';
import { apiUrl, server } from 'src/constants/config';
import { IEquipmentResponseList } from 'src/models/response/equipmentResponseList';
import { IEquipmentTypeResponse } from 'src/models/response/equipmentTypeResponse';
import { IEquipmentResult } from 'src/models/result/equipmentResult';
import Loading from 'src/components/Loading';
import { validateFileSize } from 'src/utils/commonUtil';
import LoadingBackdrop from 'src/components/LoadingBackDrop';
import SnackbarNotify from 'src/components/SnackBarNotify';

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

function AddEquipment() {
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [amount, setAmount] = useState(0);
  const [amountError, setAmountError] = useState(false);
  const [type, setType] = useState('');
  const [typeError, setTypeError] = useState(false);
  const [typeList, setTypeList] = useState<IEquipmentResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackBarType, setSnackBarType] = useState('success');
  const [errorMessage, setErrorMessage] = useState('');

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
      addEquipment();
    }
  };

  // useEffect(() => {
  //   if (imageUrl) {
  //     setImageUrl(URL.createObjectURL(imageUrl));
  //   }
  // }, [imageUrl]);
  const handleChangeSnackBar = () => {
    setSnackbar(!snackbar);
  };
  const handleChangeLoading = () => {
    setLoading(!loading);
  };

  const handleChangeImage = (e) => {
    const [file] = e.target.files;
    if (file) {
      if (!validateFileSize(file.size)) {
      }
      console.log(file);

      setImageUrl(URL.createObjectURL(file));
    }
  };

  const addEquipment = async () => {
    let type_id = typeList.find((e) => e.equipment_name == type);
    let data = {
      name: name,
      amount: amount,
      image: null,
      type_id: type_id ? type_id.equipment_id : null
    };
    // setTimeout(() => {
    //   setLoading(false);
    //   setSnackBarType('error');
    //   setSnackbar(true);
    //   setErrorMessage('Welcome to thailand');
    // }, 3000);

    await axios({
      method: 'post',
      timeout: 1000 * 10,
      url: apiUrl + server.EQUIPMENT_ADD,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    })
      .then((res) => {
        setLoading(false);
        if (res.status == 200) {
          setSnackBarType('success');
          setSnackbar(true);
          setErrorMessage('บันทึกข้อมูลสำเร็จ');
          history.back();
        } else {
          setSnackBarType('error');
          setSnackbar(true);
          setErrorMessage('เกิดข้อผิดพลาด กรุณาตรวจข้อมูล');
        }
      })
      .catch((err) => {
        setSnackBarType('error');
        setSnackbar(true);
        setErrorMessage('เกิดข้อผิดพลาด กรุณาตรวจข้อมูล');
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
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    getEquipmentType();
  }, []);

  return (
    <>
      <Helmet>
        <title>Equipment - Management</title>
      </Helmet>
      <SnackbarNotify
        message={errorMessage}
        type={snackBarType}
        open={snackbar}
        handleChange={handleChangeSnackBar}
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
              {EQUIPMENT_ADD}
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
                          อัปโหลดรูปภาพ
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
                        sm={4}
                        md={4}
                        lg={4}
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
                        sm={2}
                        md={2}
                        lg={2}
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
                                      value={item.equipment_name}
                                    >
                                      {item.equipment_name}
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

export default AddEquipment;
