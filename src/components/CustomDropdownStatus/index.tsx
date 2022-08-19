import * as React from 'react';
import { STATUS_SEARCH, STATUS_TEXT } from 'src/constants';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface ModalDialogProps {
  title?: string;
  description?: string;
  filters: string;
  statusOptions: any;
  handleStatusChange?: (e) => any;
}

export default function CustomDropdownStatus(props: ModalDialogProps) {
  return (
    <div>
      <Box sx={{ minWidth: 150 }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>{STATUS_TEXT}</InputLabel>
          <Select
            value={props.filters || 'ALL'}
            onChange={props.handleStatusChange}
            label="Status"
            autoWidth
          >
            {props.statusOptions.map((statusOption) => (
              <MenuItem key={statusOption.id} value={statusOption.id}>
                {statusOption.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
