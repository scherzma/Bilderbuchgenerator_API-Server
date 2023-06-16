const ApiMethod = {
  API_METHOD_Get: 'GET',
  API_METHOD_Post: 'POST',
  API_METHOD_Patch: 'PATCH',
  API_METHOD_Delete: 'DELETE',
};

const ResponseCode = {
  RESPONSE_CODE_Ok: 200,
  RESPONSE_CODE_Created: 201,
  RESPONSE_CODE_Accepted: 202,
  RESPONSE_CODE_NoContent: 204,
  RESPONSE_CODE_BadRequest: 400,
  RESPONSE_CODE_Unauthorized: 401,
  RESPONSE_CODE_Forbidden: 403,
  RESPONSE_CODE_NotFound: 404,
  RESPONSE_CODE_InternalServerError: 500,
};

module.exports = {
  ApiMethod,
  ResponseCode,
};
