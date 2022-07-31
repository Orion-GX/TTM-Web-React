export function computeDollars(btc, btcRate) {
  return btc * btcRate;
}

export function validateFileSize(size) {
  if (size > 3000000) return false;
  else return true;
}
