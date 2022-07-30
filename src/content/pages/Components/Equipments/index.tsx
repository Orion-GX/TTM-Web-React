import { Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { apiUrl, server } from 'src/constants/config';
import { IEquipmentResponseList } from 'src/models/response/equipmentResponseList';
import EquipmentPageHeader from './PageHeader';
import RecentOrders from './RecentOrders';

function EquipmentManagementPage() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [equipmentData, setEquipmentData] = useState<IEquipmentResponseList>();
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const getEquipment = async () => {
    await axios
      .post(apiUrl + server.EQUIPMENT_SEARCH, {
        search: search,
        status: status
      })
      .then((res) => {
        if (res.status == 200) {
          const test: IEquipmentResponseList = res.data;
          setEquipmentData(test);
        } else {
          const test: IEquipmentResponseList = res.data;
          setEquipmentData(test);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    // getEquipment();
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
            <RecentOrders equipments={equipmentData} setStatus={setStatus} status={status} search={search}  />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default EquipmentManagementPage;
