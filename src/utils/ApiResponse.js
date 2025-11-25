class ApiResponse {
  constructor( statusCode, data, message = "success") {
    this.message = message;
    this.status, Code = statusCode;
    this.data = data;
    this.success = statusCode < 400;

  }
}

export { ApiResponse };