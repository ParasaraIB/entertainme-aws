const errHandler = (err, req, res, next) => {
  console.log(err.message, "<<<< from error handler!");
  let statusCode = 500;
  let error = err.message;

  switch(err.message) {
    case "Request failed with status code 400":
      statusCode = 400;
      error = "Please fill all the field correctly!";
      break;
    case "Request failed with status code 404":
      statusCode = 404;
      error = "Invalid id";
      break;
    default:
      statusCode = err.statusCode || 500;
      break;
  }
  return res.status(statusCode).json({ error });
}

module.exports = errHandler;