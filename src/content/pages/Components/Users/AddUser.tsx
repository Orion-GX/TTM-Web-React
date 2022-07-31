import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextareaAutosize,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  ADDRESS_TEXT,
  CITIZEN_TEXT,
  COMFIRM_BUTTON_TEXT,
  DESCRIPTION_TEXT,
  EQUIPMENT_ADD,
  EQUIPMENT_LIST_TITLE_TEXT,
  EQUIPMENT_MANAGEMENT,
  GENDER_TEXT,
  NAME_TEXT,
  PASSWORD_TEXT,
  PHONE_TEXT,
  SALARY_TEXT,
  STATUS_TEXT,
  USERNAME_TEXT
} from 'src/constants';
import validator from 'validator';

function AddUser() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [citizen, setCitizen] = useState('');
  const [citizenError, setCitizenError] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [salary, setSalary] = useState('');
  const [salaryError, setSalaryError] = useState(false);
  const [gender, setGender] = useState('');
  const [genderError, setGenderError] = useState(false);
  const [address, setAddress] = useState('');

  const validateData = () => {
    if (validator.isEmpty(name)) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (!validator.isNumeric(citizen)) {
      setCitizenError(true);
    } else {
      setCitizenError(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Equipment - Management</title>
      </Helmet>
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
                <Box component="form" noValidate autoComplete="off">
                  <div>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="stretch"
                    >
                      <Grid
                        paddingX="10px"
                        marginTop="10px"
                        xs={12}
                        sm={7}
                        md={7}
                        lg={7}
                      >
                        <TextField
                          required
                          fullWidth
                          id="name"
                          inputProps={{ maxLength: 255 }}
                          value={name}
                          label={NAME_TEXT}
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
                            กรุณากรอกชื่อ-นามสกุลให้ถูกต้อง
                          </Typography>
                        ) : (
                          <></>
                        )}
                      </Grid>
                      <Grid
                        paddingX="10px"
                        marginTop="10px"
                        xs={12}
                        sm={5}
                        md={5}
                        lg={5}
                      >
                        <TextField
                          required
                          fullWidth
                          id="citizen"
                          value={citizen}
                          label={CITIZEN_TEXT}
                          onChange={(e) => {
                            const regex = /^[0-9\b]+$/;
                            if (
                              e.target.value === '' ||
                              regex.test(e.target.value)
                            ) {
                              if (e.target.value.length <= 13) {
                                setCitizen(e.target.value);
                              }
                            }
                          }}
                        />
                        {citizenError ? (
                          <Typography
                            fontFamily="Quark-Bold"
                            fontSize="16px"
                            paddingX="10px"
                            color="red"
                          >
                            กรุณากรอก{CITIZEN_TEXT}ให้ถูกต้อง
                          </Typography>
                        ) : (
                          <></>
                        )}
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="start"
                      alignItems="stretch"
                      marginTop="20px"
                    >
                      <Grid
                        paddingX="10px"
                        marginTop="10px"
                        xs={12}
                        sm={6}
                        md={3}
                        lg={3}
                      >
                        <FormControl fullWidth>
                          <InputLabel id="gender">{GENDER_TEXT}</InputLabel>
                          <Select
                            required
                            labelId="gender-label"
                            id="gender-select"
                            value={gender}
                            defaultValue={GENDER_TEXT}
                            label="gender"
                            onChange={(e) => {
                              setGender(e.target.value);
                            }}
                          >
                            <MenuItem style={{ fontSize: '17px' }} value={''}>
                              กรุณาเลือกเพศ
                            </MenuItem>
                            <MenuItem
                              style={{ fontSize: '17px' }}
                              value={'ชาย'}
                            >
                              ชาย
                            </MenuItem>
                            <MenuItem
                              style={{ fontSize: '17px' }}
                              value={'หญิง'}
                            >
                              หญิง
                            </MenuItem>
                          </Select>
                        </FormControl>
                        {genderError ? (
                          <Typography
                            fontFamily="Quark-Bold"
                            fontSize="16px"
                            paddingX="10px"
                            color="red"
                          >
                            กรุณาเลือก{GENDER_TEXT}
                          </Typography>
                        ) : (
                          <></>
                        )}
                      </Grid>
                      <Grid
                        paddingX="10px"
                        marginTop="10px"
                        xs={12}
                        sm={6}
                        md={4}
                        lg={4}
                      >
                        <TextField
                          required
                          fullWidth
                          id="phone"
                          value={phone}
                          inputProps={{ maxLength: 10 }}
                          label={PHONE_TEXT}
                          onChange={(e) => {
                            const regex = /^[0-9\b]+$/;
                            if (
                              e.target.value === '' ||
                              regex.test(e.target.value)
                            ) {
                              if (e.target.value.length <= 10) {
                                setPhone(e.target.value);
                              }
                            }
                          }}
                        />
                        {phoneError ? (
                          <Typography
                            fontFamily="Quark-Bold"
                            fontSize="16px"
                            paddingX="10px"
                            color="red"
                          >
                            กรุณากรอก{PHONE_TEXT}ให้ถูกต้อง
                          </Typography>
                        ) : (
                          <></>
                        )}
                      </Grid>
                      <Grid
                        paddingX="10px"
                        marginTop="10px"
                        xs={12}
                        sm={6}
                        md={5}
                        lg={5}
                      >
                        <TextField
                          fullWidth
                          id="salary"
                          value={salary}
                          label={SALARY_TEXT}
                          onChange={(e) => {
                            const regex = /^[0-9.\b]+$/;
                            if (
                              e.target.value === '' ||
                              regex.test(e.target.value)
                            ) {
                              setSalary(e.target.value);
                            }
                          }}
                        />
                        {salaryError ? (
                          <Typography
                            fontFamily="Quark-Bold"
                            fontSize="16px"
                            paddingX="10px"
                            color="red"
                          >
                            กรุณากรอก{SALARY_TEXT}ให้ถูกต้อง
                          </Typography>
                        ) : (
                          <></>
                        )}
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="start"
                      alignItems="stretch"
                      marginTop="20px"
                    >
                      <Grid
                        paddingX="10px"
                        marginTop="10px"
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                      >
                        <TextField
                          fullWidth
                          multiline
                          inputProps={{ maxLength: 255 }}
                          id="address"
                          value={address}
                          label={ADDRESS_TEXT}
                          InputProps={{
                            rows: 3
                          }}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                        />
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

export default AddUser;
