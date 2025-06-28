export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidShortcode = (code) => {
  return /^[a-zA-Z0-9]{3,20}$/.test(code);
};

export const isValidMinutes = (val) => {
  const n = Number(val);
  return Number.isInteger(n) && n > 0;
};