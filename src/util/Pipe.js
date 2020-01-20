// import { pipe, map, filter,  reduce, inspect } from "@/utils/Pipe.js";

import { isArray, isEmptyObject } from "@/util/TypeChecks.js";
import REDUCERS from "@/util/Reducers.js";


export const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);


export const map = fn => arr => arr.map(fn);
export const filter = fn => arr => arr.filter(fn);
export const select = filter;
export const reject = fn => arr => arr.filter(!fn);
export const reduce = (fn, acc) => arr => arr.reduce(fn, acc);
export const sort = sortArgs => arr => { arr.sort(sortArgs); return arr };
export const join = delimiter => arr => arr.join(delimiter);
export const uniq = arr => Array.from(new Set(arr));
export const reverse = arr => { arr.reverse(); return arr };

export const getObjectKeys = obj => Object.keys(obj);
export const getObjectValues = obj => Object.values(obj);
export const getObjectEntries = obj => Object.entries(obj);
export const objectFromEntries = arr => Object.fromEntries(arr);

export const reduceBooleans = arr => arr.reduce(REDUCERS.AND, true);

export const log = label => item => { console.log(`${label}: ${JSON.stringify(item)}`); return item }
export const inspect = fn => item => { fn(item); return item }