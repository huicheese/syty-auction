module.exports = {

  isValidAuth: function(authCookie) {
    if (!authCookie)
      return false;

    let authJson = tryParseJSON(authCookie);
    if (!authJson)
      return false;

    if (!authJson.firstName || !authJson.firstName.trim())
      return false;

    if (!authJson.lastName || !authJson.lastName.trim())
      return false;

    if (!authJson.company || !authJson.company.trim())
      return false;

    if (!authJson.table || isNaN(authJson.table))
      return false;

    return true;
  }
};

function tryParseJSON(jsonString){
  try {
    let json = JSON.parse(jsonString);
    if (json && typeof json === "object")
      return json;
  }
  catch (e) { }
  return false;
};