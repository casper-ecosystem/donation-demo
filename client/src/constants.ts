export const VISIBLE_TABLE_DATA_LENGTH = 10;

export const statusCode = {
  success: 200,
  no_content: 204,
  invalid_input_error: 400,
  authentication_error: 401,
  payment_required_error: 402,
  access_denied_error: 403,
  not_found_error: 404,
  conflict_error: 409,
  validation_error: 422,
  unexpected_error: 500
};

export const AUTH_TOKEN = 'token';

export const SMALL_PRECISION = 2;
export const MOTES_PER_CSPR_RATE = '1000000000'; // 1 000 000 000 MOTES === 1 CSPR
