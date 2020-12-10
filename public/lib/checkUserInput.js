function symbolOnly(input) {
  return !!input.match(/^[^0-9a-zA-Z]+$/);
}

function numOnly(input) {
  return !!input.match(/^[0-9]+$/);
}

function checkUserInput(input) {
  if (!input.trim()) {
    return false;
  }
  if (numOnly(input)) {
    return false;
  }
  if (symbolOnly(input)) {
    return false;
  }
  return true;
}

module.exports = {
  symbolOnly,
  numOnly,
  checkUserInput
}
