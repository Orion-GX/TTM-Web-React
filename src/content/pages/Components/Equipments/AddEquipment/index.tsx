import {
  Box,
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
  TextField,
  Typography
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  DESCRIPTION_TEXT,
  EQUIPMENT_ADD,
  EQUIPMENT_LIST_TITLE_TEXT,
  EQUIPMENT_MANAGEMENT,
  PASSWORD_TEXT,
  STATUS_TEXT,
  USERNAME_TEXT
} from 'src/constants';

function AddEquipment(params: any) {
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
              <CardHeader title={DESCRIPTION_TEXT} />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' }
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <FormControl>
                      <TextField
                        fullWidth
                        id="outlined-required"
                        label={USERNAME_TEXT}
                      />
                      <TextField
                        fullWidth
                        id="outlined-required"
                        label={PASSWORD_TEXT}
                      />
                    </FormControl>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      label={USERNAME_TEXT}
                    />
                    <TextField
                      disabled
                      id="outlined-required"
                      label={PASSWORD_TEXT}
                    />
                    <TextField
                      id="outlined-password-input"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Read Only"
                      defaultValue="Hello World"
                      InputProps={{
                        readOnly: true
                      }}
                    />
                    <TextField
                      id="outlined-number"
                      label="Number"
                      type="number"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    <TextField
                      id="outlined-search"
                      label="Search field"
                      type="search"
                    />
                    <TextField
                      id="outlined-helperText"
                      label="Helper text"
                      defaultValue="Default Value"
                      helperText="Some important text"
                    />
                  </div>
                  <div>
                    <TextField
                      required
                      id="filled-required"
                      label="Required"
                      defaultValue="Hello World"
                      variant="filled"
                    />
                    <TextField
                      disabled
                      id="filled-disabled"
                      label="Disabled"
                      defaultValue="Hello World"
                      variant="filled"
                    />
                    <TextField
                      id="filled-password-input"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      variant="filled"
                    />
                    <TextField
                      id="filled-read-only-input"
                      label="Read Only"
                      defaultValue="Hello World"
                      InputProps={{
                        readOnly: true
                      }}
                      variant="filled"
                    />
                    <TextField
                      id="filled-number"
                      label="Number"
                      type="number"
                      InputLabelProps={{
                        shrink: true
                      }}
                      variant="filled"
                    />
                    <TextField
                      id="filled-search"
                      label="Search field"
                      type="search"
                      variant="filled"
                    />
                    <TextField
                      id="filled-helperText"
                      label="Helper text"
                      defaultValue="Default Value"
                      helperText="Some important text"
                      variant="filled"
                    />
                  </div>
                  <div>
                    <TextField
                      required
                      id="standard-required"
                      label="Required"
                      defaultValue="Hello World"
                      variant="standard"
                    />
                    <TextField
                      disabled
                      id="standard-disabled"
                      label="Disabled"
                      defaultValue="Hello World"
                      variant="standard"
                    />
                    <TextField
                      id="standard-password-input"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      variant="standard"
                    />
                    <TextField
                      id="standard-read-only-input"
                      label="Read Only"
                      defaultValue="Hello World"
                      InputProps={{
                        readOnly: true
                      }}
                      variant="standard"
                    />
                    <TextField
                      id="standard-number"
                      label="Number"
                      type="number"
                      InputLabelProps={{
                        shrink: true
                      }}
                      variant="standard"
                    />
                    <TextField
                      id="standard-search"
                      label="Search field"
                      type="search"
                      variant="standard"
                    />
                    <TextField
                      id="standard-helperText"
                      label="Helper text"
                      defaultValue="Default Value"
                      helperText="Some important text"
                      variant="standard"
                    />
                  </div>
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
