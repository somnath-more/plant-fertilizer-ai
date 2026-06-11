/**
 * Generic API Response Type matching backend format
 * @typedef {Object} ApiResponse
 * @property {number} statusCode - HTTP status code
 * @property {boolean} success - Whether request was successful
 * @property {string} message - Response message (user-friendly)
 * @property {any} data - Response data payload
 * @property {any} [uniqueKey] - Optional unique identifier for request/response correlation
 * @property {any} [errors] - Optional detailed error information
 * @property {string} timestamp - ISO timestamp of response
 */

/**
 * Normalized response wrapper used internally
 * @typedef {Object} NormalizedResponse
 * @property {boolean} status - Success boolean (from response.success)
 * @property {string} message - User-friendly message
 * @property {any} data - Response data
 * @property {string} timestamp - Response timestamp
 * @property {any} [uniqueKey] - Correlation key
 */

export const ApiResponseType = {
  statusCode: 0,
  success: false,
  message: '',
  data: null,
  uniqueKey: null,
  errors: null,
  timestamp: new Date().toISOString(),
};

// HTTP Status codes for reference
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};
