

// Takes a Gregorian DateObject
// and returns the corresponding a JavaScript Date
export function toJSDate(dateObject) {
  if(!dateObject.calendar || dateObject.calendar !== "gregorian") throw new TypeError(`Illegal calendar type, must be 'gregorian' (Got: ${dateObject.calendar })`);
  const dateString = `${dateObject.year}-${padWithOneZero(dateObject.month + 1)}-${padWithOneZero(dateObject.day)}`
  return new Date(dateString);
}

function padWithOneZero(n) {
  return n <= 9 ? "0" + n : n;
}


export default toJSDate;