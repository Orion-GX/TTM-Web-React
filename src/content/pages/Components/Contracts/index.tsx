import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import ProfileCover from '../../../applications/Users/profile/ProfileCover';

function ApplicationContract() {
  return (
    <>
      <Helmet>
        <title>Contract - Management</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            {/* <ProfileCover  /> */}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationContract;
