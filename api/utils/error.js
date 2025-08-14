export const errorHandler = (statudCode, message) => {
    const error = new Error()
    error.statudCode = statudCode;
    error.message = message;
    return error;
}