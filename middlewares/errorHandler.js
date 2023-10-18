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
    } else if (err.name === 'user_not_found') {
        status = 404
        message = 'User not found'
    } else if (err.name === 'minimum_comment') {
        status = 400
        message = 'Minimum input comment is 1 character'
    } else if (err.name === 'review_not_found') {
        status = 404
        message = 'Comment not found'
    }

    res.status(status).json({ message })
}

module.exports = errorHandler