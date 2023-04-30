export default class AppError extends Error {
  constructor(message, statusCode, {
    extraData, errorCode = null,
  } = {}) {
    const messageString = typeof message === 'string' ? message : JSON.stringify(message);
    super(messageString);

    this.statusCode = statusCode;
    this.extraData = extraData;

    // See https://whimsical.com/policies-authorizers-U9oiqXDL8tW9qvgQdQdGej
    this.errorCode = errorCode; // used for metrics tagging
  }

  static assert(condition, message, statusCode = 400, opts = {}) {
    if (!condition) {
      throw new AppError(message, statusCode, opts);
    }
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      extraData: this.extraData,
      code: this.errorCode,
      message: this.message,
    };
  }
}
