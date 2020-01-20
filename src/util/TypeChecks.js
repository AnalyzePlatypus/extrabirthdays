export const isArray = array => {
  return Array.isArray(array) && array.length;
}

export const isEmptyObject = obj => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export function isString(str) {
  return typeof str === 'string';
}

export function isEmptyString(str) {
  return typeof str === 'string' && str.length === 0;
}

export function isNegativeNumber(n) {
  return n < 0;
}

export function isZero(n) {
  return n === 0;
}