const REDUCERS = {
  MERGE_OBJECTS: (item, acc) => { return {...acc, ...item} },
  AND: (isTrue, all) => { return isTrue && all }
}

export default REDUCERS;