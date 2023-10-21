const errorHandler = (err, req, res, next) => {
    console.log(err)
    let status = 500
    let message = 'Internal server error'

    if (err.name === 'empty_username') {
        status = 400
        message = 'Username is required'
    } else if (err.name === 'empty_email') {
        status = 400
        message = 'Email is required'
    } else if (err.name === 'empty_password') {
        status = 400
        message = 'Password is required'
    } else if (err.name === 'unique_email') {
        status = 400
        message = 'This email is invalid'
    } else if (err.name === 'invalid_email/password') {
        status = 401
        message = 'Invalid email or password'
    } else if (err.name === 'unauthenticated' || err.name === 'JsonWebTokenError') {
        status = 403
        message = 'Invalid token'
    }  else if (err.name === 'minimum_comment') {
        status = 400
        message = 'Minimum input comment is 1 character'
    } else if (err.name === 'review_not_found') {
        status = 404
        message = 'This password is invalid'
    } else if (err.name === 'empty_name/project') {
        status = 400
        message = 'Name is required'
    } else if (err.name === 'empty_description/project') {
        status = 400
        message = 'Description is required'
    } else if (err.name === 'empty_categoryId/project') {
        status = 400
        message = 'Category is required'
    } else if (err.name === 'not_found/project') {
        status = 404
        message = 'Project not found'
    } else if (err.name === 'name/categories') {
        status = 400
        message = 'Name category is required'
    } else if (err.name === 'unique/categories') {
        status = 400
        message = 'Category must be unique'
    } else if (err.name === 'not_found/category') {
        status = 404
        message = 'Category must be unique'
    } else if (err.name === 'empty_goals/project') {
        status = 400
        message = 'Goals is required'
    } else if (err.name === 'BSONError') {
        status = 400
        message = err.message
    }


    res.status(status).json({ message })
}

module.exports = errorHandler