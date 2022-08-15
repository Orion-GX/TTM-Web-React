export function computeDollars(btc, btcRate) {
  return btc * btcRate;
}

export function validateFileSize(size) {
  console.log(size);
  if (size > 1000000) return false;
  else return true;
}
