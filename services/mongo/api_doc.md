# API Docs StudyBuddy App

## Endpoint

List of available endpoints

- `POST/register`
- `POST/login`
- `POST/google-login`
- `GET/users`
- `GET/users/:id`
- `PUT/users`
- `PATCH/users`
- `POST/projects`
- `GET/projects`
- `GET/projects/:id`
- `DELETE/projects/:id`
- `PUT/projects/:id`
- `PATCH/projects/:id`
- `GET/ratings`
- `POST/ratings`
- `PUT/ratings/:id`



### 1. POST/register

Description

> register user to database

### request

- body
```json
{
    "username" : string, 
    "email" : string, 
    "password" : string,
    "role": null, 
    "address" : string, 
    "phoneNumber" : string
}
```

### response
- _201 - Created_

_Body_

```json
    {
       "message": "User with username ${username} successfully created"
    }
```

- _400 - Bad Request_

_Body_

```json
    {
       "message": "<field> is required"
    }
```

- _400 - Bad Request_

_Body_

```json
    {
       "message": "This email is invalid"
    }
```

### 2. POST/login

Description

> login user to database

### request

- body
```json
{ 
    "email" : string, 
    "password" : string,
}
```

### response
- _200 - Ok_

_Body_

```json
    {
       "access_token": "<access_token>"
    }
```

- _400 - Bad Request_

_Body_

```json
    {
       "message": "<field> is required"
    }
```

- _401 - Bad Request_

_Body_

```json
    {
       "message": "Invalid email or password"
    }
```

### 3. POST/google-login

Description

> create new user to database

### request

- headers
```json
"google_token" : string
```

### response
- _200 - Ok_

_body_
```json
{
    "access_token" : access token
}
```

- _201 - Created_

_body_
```json
{
    "access_token" : access token
}
```

- _500 - Internal Server Error_

_body_
```json
{
    "message": "Internal Server Error"
}
```

### 4. GET/users

Description

> get all user from database

### request

- headers
```json
"access_token" : string
```

### response
- _200 - Ok_

_body_
```json
[
    {
        "_id": String,
        "username": String,
        "email": String,
        "password": String,
        "phoneNumber": String,
        "role": String,
        "address": String
    }
]

```

- _500 - Internal server error_

_body_
```json
{
    "message" : "Internal server error"
}
```

### 5. GET/users/:id

Description

> get user by id from database.

### request

- headers
```json
    "access_token" : string
```

- params
```json
    "id" : string
```

### response
- _200 - Ok_

_body_
```json
{
    "_id": String,
    "username": String,
    "email": String,
    "password": String,
    "phoneNumber": String,
    "role": String,
    "address": String
}
```
- _404 - not found_

_body_
```json
{
    "message" : "User not found"
}
```

- _400 - bad request_

_body_
```json
{
    "message" : String
}
```

- _500 - Internal server error_

_body_
```json
{
    "message" : "Internal server error"
}
```

### 6. PUT/users

Description

> update user by id from user id from database.

### request

- headers
```json
"access_token" : string
```

- body
```json
{
    "username": String, 
    "email": String, 
    "phoneNumber": StringS, 
    "password": String, 
    "address": String
}
```

### response
- _200 - Ok_

_body_
```json
{
    "message": "Update user has success",
    "id": updateReview._id
}
```

- _400 - bad request_

_body_
```json
{
    "message" : "<field> is required"
}
```

- _500 - Internal server error_

_body_
```json
{
    "message" : "Internal server error"
}
```

### 7. PATCH/users

Description

> update user role to database.

### request

- headers
```json
"access_token" : string
```

- body
```json
{
    "role": String, 
}
```

### response
- _200 - Ok_

_body_
```json
{
    "message": "Role updated successfully",
    "id": updateReview._id
}
```

- _400 - bad request_

_body_
```json
{
    "message" : "<field> is required"
}
```

- _500 - Internal server error_

_body_
```json
{
    "message" : "Internal server error"
}
```

### 8. POST/projects

Description

> add project to database.

### request

- headers
```json
"access_token" : string
```

- body
```json
{
    "name": String,
    "studentId": String,
    "teacherId": String,
    "startDate": DateString,
    "endDate": DateString,
    "status": String,
    "likes": Number,
    "description": String,
    "categoryId": String,
    "published": Boolean,
    "goals": String,
    "feedback": String,
}
```

### response
- _201 - Created_

_body_
```json
{
    "message": "Project has been successfully created",
    "id": response.insertedId
}
```

- _400 - bad request_

_body_
```json
{
    "message" : "<field> is required"
}
```

- _500 - Internal server error_

_body_
```json
{
    "message" : "Internal server error"
}
```

### 9. GET/projects

Description

> get all project from database.

### request

- headers
```json
"access_token" : string
```

### response

### 10. GET/projects/:id

Description

> get project by id from database.

### request

- headers
```json
    "access_token" : string
```

- params
```json
    "id" : string
```

### response

### 10. DELETE/projects/:id

Description

> delete project by id from database.

### request

- headers
```json
    "access_token" : string
```

- params
```json
    "id" : string
```

### response

### 11. PUT/projects/:id

Description

> update project by id from database.

### request

- headers
```json
    "access_token" : string
```

params
```json
    "id": string
```

- body
```json
    "name" : string,
    "description" : string,
    "CategoryId" : string
```

### response

- _200 - Ok_

_body_
```json
{ 
    "message": "<Field> updated successfully"
}

```
- _404 - not found_

_body_
```json
{
    "message" : "Project not found"
}
```

- _500 - Internal server error_

_body_
```json
{
    "message" : "Internal server error"
}
```

### 12. PATCH/projects/:id

Description

> update status project by id from database.

### request

- headers
```json
    "access_token" : string
```

- params
```json
    "id": string
```

- body
```json
    "status" : string,
```

### response
- _200 - Ok_

_body_
```json
{ 
    "message": "Status updated successfully to <Field>"
}

```
- _400 - Bad request_

_body_
```json
{
    "message" : "the status only: accepted paid onProgress finished"
}
```

- _404 - not found_

_body_
```json
{
    "message" : "Project not found"
}
```

- _500 - Internal server error_

_body_
```json
{
    "message" : "Internal server error"
}
```

### 13. PATCH/projects/:id

Description

> update status project by id from database.

### request

- headers
```json
    "access_token" : string
```

- params
```json
    "id": string
```

- body
```json
    "status" : string,
```

### response
- _200 - Ok_

_body_
```json
{ 
    "message": "Status updated successfully to <Field>"
}

```
- _400 - Bad request_

_body_
```json
{
    "message" : "the status only: accepted paid onProgress finished"
}
```

- _404 - not found_

_body_
```json
{
    "message" : "Project not found"
}
```

- _500 - Internal server error_

_body_
```json
{
    "message" : "Internal server error"
}
```


### 14. GET/ratings

Description

> get all rating from database.

### request

- headers
```json
    "access_token" : string
```

### response
- _200 - Ok_

_body_
```json
[
    {
        "_id": String,
        "UserId": String,
        "rating": Number
    }
]

```

- _500 - Internal server error_

_body_
```json
{
    "message" : "Internal server error"
}
```

### 15. POST/ratings

Description

> create rating to database.

### request

- headers
```json
    "access_token" : string
```

- body
```json
    "rating": Number
```

### response
- _201 - Created_

_body_
```json
{
    "message": "add rating success"
}
```

- _400 - bad request_

_body_
```json
{
    "message" : "rating is required"
}
```

- _500 - Internal server error_

_body_
```json
{
    "message" : "Internal server error"
}
```

### 16. PUT/ratings/:id

Description

> update rating to database.

### request

- headers
```json
    "access_token" : string
```

- params
```json
    "id": String
```

- body
```json
    "rating": Number
```

### response
- _200 - Ok_

_body_
```json

{
    "message": "update rating success",
}

```

- _400 - bad request_

_body_
```json
{
    "message" : "rating is required"
}
```

- _500 - Internal server error_

_body_
```json
{
    "message" : "Internal server error"
}
```