//all errors will be json obj with error message and stack trace for development
//1. catch all errors for all non exsting routes (routes we dont have controller for)
//2. catch all for all errors in our routes

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`); //whatever the url is
  res.status(404);
  next(error);
};

//express will know this is customeerror handler
export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode; //check if status is 200
  let message = err.message;
  console.log(message)//whatever was thrown

  //mongoose has sth called CastError > if you try to get user with non existing objectId this will fire
  if (err.name == "CastError" && err.kind == "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res
    .status(statusCode)
    .json({
      message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};


