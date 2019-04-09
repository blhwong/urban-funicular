module.exports = (errors) => {
  if (errors.length > 0) {
    throw new Error(errors.join('. '));
  }
};
