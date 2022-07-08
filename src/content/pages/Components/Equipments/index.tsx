import { Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import EquipmentPageHeader from './PageHeader';
import RecentOrders from './RecentOrders';

function EquipmentManagementPage() {
  const [text, setText] = useState('');
  const handleChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    // dispatch(equipmentActions.doLoadEquipmentAll('', 10, 0));
  }, []);

  return (
    <>
      <Helmet>
        <title>Equipment - Management</title>
      </Helmet>
      <PageTitleWrapper>
        <EquipmentPageHeader handleChange={handleChange} />
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
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default EquipmentManagementPage;
