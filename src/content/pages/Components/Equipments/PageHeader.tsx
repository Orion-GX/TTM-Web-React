import {
  Typography,
  Button,
  Grid,
  TextField,
  Box,
  styled
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { EQUIPMENT_MANAGEMENT, SEARCH_TEXT } from 'src/constants';

interface EquipmentPageProps {
  handleChange: (params: any) => any;
  onSearch?: () => any;
}

function EquipmentPageHeader({ handleChange, onSearch }: EquipmentPageProps) {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs={12} lg={12}>
        <Typography variant="h2" component="h2" gutterBottom>
          {EQUIPMENT_MANAGEMENT}
        </Typography>
      </Grid>
      <Grid item xs={12} lg={12}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={6} md={7} lg={8}>
            <Box>
              <TextField
                fullWidth
                sx={{
                  '& .MuiInputBase-input': { m: 1, padding: '0px 14px' }
                }}
                id="outlined-required"
                placeholder={SEARCH_TEXT}
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item xs={2} md={2} lg={2}>
            <Box style={{ paddingLeft: '10px', paddingRight: '10px' }}>
              <Button
                fullWidth
                variant="contained"
                color="success"
                style={{ fontSize: '18px' }}
                onClick={onSearch}
              >
                {SEARCH_TEXT}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={3} md={3} lg={2}>
            <Button
              fullWidth
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              style={{ fontSize: '18px' }}
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              เพิ่มข้อมูลอุปกรณ์
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default EquipmentPageHeader;
