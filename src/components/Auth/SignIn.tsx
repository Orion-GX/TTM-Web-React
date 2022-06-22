import {
  Box,
  Container,
  Card,
  Grid,
  TextField,
  Button,
  Typography
} from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { TEXT_SYSTEM } from '../../constants/TextConstant';
import { Link as RouterLink } from 'react-router-dom';

const SignInWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SignInWrapper>
      <Helmet>
        <title>TTM Dashboard</title>
      </Helmet>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" py={5} alignItems="center">
          {/* <Logo /> */}
        </Box>
        <Card sx={{ p: 10, mb: 10, borderRadius: 5 }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <h1>{TEXT_SYSTEM.SIGN_IN_TITLE_TEXT}</h1>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={10} md={12} lg={12}>
              <TextField
                fullWidth
                id="outlined-required"
                label={TEXT_SYSTEM.USERNAME_TEXT}
              />
            </Grid>
            <Grid item xs={10} md={12} lg={12}>
              <TextField
                fullWidth
                id="outlined-password-input"
                label={TEXT_SYSTEM.PASSWORD_TEXT}
                type="password"
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <Button
                fullWidth
                component={RouterLink}
                to="/dashboards/crypto"
                variant="contained"
                style={{ fontSize: '20px' }}
              >
                {TEXT_SYSTEM.COMFIRM_BUTTON_TEXT}
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
      <FooterSignIn />
    </SignInWrapper>
  );
}

const FooterSignIn = () => {
  return (
    <>
      <div
        style={{
          width: '100%',
          position: 'fixed',
          bottom: '0',
          paddingLeft: '20px',
          paddingRight: '20px'
        }}
      >
        <Box
          pb={2}
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          textAlign={{ xs: 'center', md: 'left' }}
          justifyContent="space-between"
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={7} sm={6} md={6} lg={10}>
              <Typography align="left" variant="subtitle1">
                &copy; 2022 - TTM Application Admin Dashboard
              </Typography>
            </Grid>
            <Grid item xs={5} sm={6} md={6} lg={2}>
              <Typography align="right" variant="subtitle1">
                Create by Tang Tang marketing.
              </Typography>
            </Grid>
          </Grid>
          {/* <Box>
          <Typography variant="subtitle1">
            &copy; 2022 - TTM Application Admin Dashboard
          </Typography>
        </Box> */}
          {/* <Typography
          sx={{
            pt: { xs: 2, md: 0 }
          }}
          variant="subtitle1"
        >
          Crafted by{' '}
          <Link
            href="https://bloomui.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            BloomUI.com
          </Link>
        </Typography> */}
        </Box>
      </div>
    </>
  );
};

export default SignIn;
