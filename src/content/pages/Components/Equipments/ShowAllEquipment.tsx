import {
  Card,
  CardHeader,
  Divider,
  Box,
  Grid,
  Avatar,
  Typography,
  Button
} from '@mui/material';
import RecentOrders from './RecentOrders';

function ShowAllEquipment() {
  return (
    <>
      <Card>
        <CardHeader title="Followers Feed" />
        <Divider />
        <Box p={2}>
          <Grid container spacing={0}>
            <RecentOrders />
          </Grid>
        </Box>
      </Card>
    </>
  );
}
export default ShowAllEquipment;
