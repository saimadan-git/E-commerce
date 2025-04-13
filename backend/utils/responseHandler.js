export const createSuccess = ( message, data = {}) => ({
    success: true,
    message,
    data,
});
  
export const createError = ( message) => ({
    success: false,
    message,
});