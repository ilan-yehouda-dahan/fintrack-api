function isValidName(name) {
  return typeof name === "string" && name.trim().length > 0;
}

function isValidAmount(amount) {
  return typeof amount === "number" && amount >= 0;
}

module.exports = { isValidName, isValidAmount };