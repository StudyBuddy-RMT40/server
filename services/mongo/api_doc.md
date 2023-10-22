# API Docs StudyBuddy App

## Endpoint

List of available endpoints

- `POST/register`
- `POST/login`
- `POST/google-login`
- `GET/users`
- `GET/users/:id`
- `PUT/users/`


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