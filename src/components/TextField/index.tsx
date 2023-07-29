import { TextField } from '@mui/material';
import { NAME_TEXT } from 'src/constants';

function TextFieldCustom(params: any) {
  return (
    <>
      <TextField fullWidth id="name" label={NAME_TEXT} />
    </>
  );
}
export default TextFieldCustom;
