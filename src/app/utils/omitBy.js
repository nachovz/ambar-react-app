const omitBy = (obj, evaluator) => {
  if (!obj) return {};
  if (!evaluator) return obj;

  const keys = Object.keys(obj);
  return keys.reduce((accumulator, key) => {
    const value = obj[key];
    return evaluator(value)
      ? accumulator
      : { ...accumulator, [key]: value };
  }, {});
};

export default omitBy;
