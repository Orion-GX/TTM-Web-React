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

function AddEquipment(params: any) {
  const [gender, setGender] = useState('');

  const handleGenderChange = (e: SelectChangeEvent) => {
    setGender(e.target.value);
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
                          label={NAME_TEXT}
                        />
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
                          label={CITIZEN_TEXT}
                        />
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
                            onChange={handleGenderChange}
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
                          id="outlined-required"
                          label={PHONE_TEXT}
                        />
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
                          id="outlined-required"
                          label={SALARY_TEXT}
                        />
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
                          id="outlined-required"
                          label={ADDRESS_TEXT}
                          InputProps={{
                            rows: 3
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
                        color="info"
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
