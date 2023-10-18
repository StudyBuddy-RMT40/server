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
    } else if (err.name === 'invalid_email') {
        status = 404
        message = 'This email has not register'
    } else if (err.name === 'invalid_password') {
        status = 404
        message = 'This password is invalid'
    } else if (err.name === 'empty_startDate') {
        status = 404
        message = 'Start Date must required'
    } else if (err.name === 'empty_endDate') {
        status = 404
        message = 'End Date must required'
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
    } 
    

    res.status(status).json({ message })
}

module.exports = errorHandler