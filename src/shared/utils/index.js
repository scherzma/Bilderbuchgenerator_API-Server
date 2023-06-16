function checkPasswordStrength() {
  return true;
}
function checkEmail() {
  return true;
}
function isUndefinedOrNull(check) {
  return check === null || check === undefined;
}
function throwUnimplementedError() {
  throw new Error('not implemented yet');
}
module.exports = {
  checkPasswordStrength, checkEmail, isUndefinedOrNull, throwUnimplementedError,
};
