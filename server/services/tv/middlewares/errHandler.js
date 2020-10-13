const errHandler = (err, req, res, next) => {
  console.log(err, "<<<< from error handler!");
  let statusCode = 500;
  let error = err.message;

  switch(err.message) {
    case "Document failed validation":
      statusCode = 400;
      error = "Please fill all the field correctly!"
      break;
    case "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters":
      statusCode = 404;
      error = "Invalid id";
      break;
    default:
      statusCode = err.statusCode || 500; 
  }
  return res.status(statusCode).json({ error });
};

module.exports = errHandler;