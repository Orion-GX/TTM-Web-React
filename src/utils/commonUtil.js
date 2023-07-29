import Label from 'src/components/Label';
import { STATUS_TEXT_LIST } from 'src/constants';

export function computeDollars(btc, btcRate) {
  return btc * btcRate;
}

export function validateFileSize(size) {
  console.log(size);
  if (size > 1000000) return false;
  else return true;
}

export function getStatus(status) {
  switch (status) {
    case STATUS_TEXT_LIST.ACTIVE.id:
      return STATUS_TEXT_LIST.ACTIVE.name;
    case STATUS_TEXT_LIST.ALL.id:
      return STATUS_TEXT_LIST.ALL.name;
    case STATUS_TEXT_LIST.PENDING.id:
      return STATUS_TEXT_LIST.PENDING.name;
    case STATUS_TEXT_LIST.SUSPENDED.id:
      return STATUS_TEXT_LIST.SUSPENDED.name;
    case STATUS_TEXT_LIST.TERMINATED.id:
      return STATUS_TEXT_LIST.TERMINATED.name;

    default:
      return STATUS_TEXT_LIST.ACTIVE.name;
  }
}

export const getStatusLabel = (textStatus) => {
  let map = {};
  switch (textStatus) {
    case 'ACTIVE':
      map = {
        text: STATUS_TEXT_LIST.ACTIVE.name,
        color: 'success'
      };
      break;
    case 'PENDING':
      map = {
        text: STATUS_TEXT_LIST.PENDING.name,
        color: 'warning'
      };
      break;
    case 'SUSPENDED':
      map = {
        text: STATUS_TEXT_LIST.SUSPENDED.name,
        color: 'error'
      };
      break;
    default:
      map = {
        text: STATUS_TEXT_LIST.ACTIVE.name,
        color: 'success'
      };
      break;
  }

  const { text, color } = map;

  return <Label color={color}>{text}</Label>;
};

export const convertToThaiDate = ()=>{
  // if()
}
