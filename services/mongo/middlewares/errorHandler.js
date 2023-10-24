const errorHandler = (err, req, res, next) => {
  console.log(err);
  let status = 500;
  let message = "Internal server error";

  if (err.name === "empty_username") {
    status = 400;
    message = "Username is required";
  } else if (err.name === "empty_email") {
    status = 400;
    message = "Email is required";
  } else if (err.name === "empty_password") {
    status = 400;
    message = "Password is required";
  } else if (err.name === "unique_email") {
    status = 400;
    message = "This email is invalid";
  } else if (err.name === "invalid_email/password") {
    status = 401;
    message = "Invalid email or password";
  } else if (
    err.name === "unauthenticated" ||
    err.name === "JsonWebTokenError"
  ) {
    status = 403;
    message = "Invalid token";
  } else if (err.name === "minimum_comment") {
    status = 400;
    message = "Minimum input comment is 1 character";
  } else if (err.name === "review_not_found") {
    status = 404;
    message = "This password is invalid";
  } else if (err.name === "empty_name/project") {
    status = 400;
    message = "Name is required";
  } else if (err.name === "empty_description/project") {
    status = 400;
    message = "Description is required";
  } else if (err.name === "empty_categoryId/project") {
    status = 400;
    message = "Category is required";
  } else if (err.name === "not_found/project") {
    status = 404;
    message = "Project not found";
  } else if (err.name === "name/categories") {
    status = 400;
    message = "Name category is required";
  } else if (err.name === "unique/categories") {
    status = 400;
    message = "Category must be unique";
  } else if (err.name === "not_found/category") {
    status = 404;
    message = "Category not found";
  } else if (err.name === "empty_goals/project") {
    status = 400;
    message = "Goals is required";
  } else if (err.name === "BSONError") {
    status = 400;
    message = err.message;
  } else if (err.name === "invalid_status/status") {
    status = 400;
    message = "the status only: accepted paid onProgress finished";
  } else if (err.name === "empty_phoneNumber") {
    status = 400;
    message = "Phone Number is require";
  } else if (err.name === "empty_address") {
    status = 400;
    message = "Address is require";
  } else if (err.name === "empty_role") {
    status = 400;
    message = "Role is require";
  } else if (err.name === "user_not_found") {
    status = 404;
    message = "User not found";
  } else if (err.name === "todos_not_found") {
    status = 404;
    message = "Todo not found";
  } else if (err.name === "name_todos") {
    status = 400;
    message = "Name todos is required";
  } else if (err.name === "learning_todos") {
    status = 400;
    message = "Learning todos is required";
  } else if (err.name === "isFinished_todos") {
    status = 400;
    message = "isFinished todos is required";
  } else if (err.name === "empty_rating") {
    status = 400;
    message = "rating is required";
  } else if (err.name === "forbidden") {
    status = 403;
    message = "Unauthorize, your not buddy";
  } else if (err.name === "empty_projectId") {
    status = 400;
    message = "Project Id is required";
  } else if (err.name === "address_not_in_list") {
    status = 400;
    message = "Address not register in database, please input correct address";
  } else if (err.name === "phone_length") {
    status = 400;
    message = "phone length must 12 character";
  } else if (err.name === "email_format") {
    status = 400;
    message = "input correct email format";
  } else if (err.name === "cannot_access_payment") {
    status = 400;
    message = "You cannot access payment";
  } else if (err.name === "empty_price") {
    status = 400;
    message = "Price is require";
  } else if (err.name === "empty_updated") {
    status = 400;
    message = "Output updated is null";
  } else if (err.name === "like_authorize") {
    status = 403;
    message = "Your not authorize to delete like";
  } else if (err.name === "Amount should be number") {
    status = 400;
    message = "Amount should be number";
  } else if (err.name === "data not found/wallet") {
    status = 404;
    message = "Wallet data not found";
  } else if (err.name === "No finished wallets found/wallet") {
    status = 404;
    message = "No finished wallets found";
  } else if (err.name === "Amount is required/wallet") {
    status = 400;
    message = "Amount is required";
  }

  


  res.status(status).json({ message });
};

module.exports = errorHandler;
