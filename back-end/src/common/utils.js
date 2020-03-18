function jsonParse (value) {
  try {
    value = JSON.parse(value);
  } catch (e) {
  } finally {
    return value;
  }
}

function jsonStringify (value) {
  try {
    value = JSON.stringify(value);
  } catch (e) {
  } finally {
    return value;
  }
}

const wrapper = asyncFn => {
  return (async (req, res, next) => {
    try {
      return await asyncFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  });
};

module.exports = {
  jsonParse: jsonParse,
  jsonStringify: jsonStringify,
  wrapper: wrapper
}