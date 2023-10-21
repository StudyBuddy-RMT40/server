const { redis, BASE_URL } = require("../config/redis");
const axios = require('axios')

const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmU5MGVjYTQwNThmN2I0NzMzMzUzZCIsImlhdCI6MTY5Nzg4MTEyNH0.Ny3XjEYXqGKgwHeLE1IpTbZzuNlXXfUK3ZeHNzQR9ZU'

const typeDefs = `#graphql

    type User {
        _id: ID
        username: String
        email: String
        password: String
        phoneNumber: String
        role: String
        address: String
    }

    type Teacher {
        _id: ID
        username: String
        email: String
        password: String
        phoneNumber: String
        role: String
        address: String
    }

    type Student {
        _id: ID
        username: String
        email: String
        password: String
        phoneNumber: String
        role: String
        address: String
    }

    type Project {
        _id: ID
        name: String
        studentId: ID
        teacherId: ID
        startDate: String
        endDate: String
        status: String
        likes: Int
        description: String
        published: Boolean
        goals: String
        feedback: String
        categoryId: ID
        Student: Student
        Teacher: Teacher
        Category: Category
    }

    type Category {
        _id: ID
        name: String
    }

    type AccessToken {
        access_token: String
    }

    type Message {
        message: String
    }

    input UserInput {
        username: String
        email: String
        password: String
        phoneNumber: String
        address: String
        role: String
    }

    type Query {
        getUsers: [User]
        getUser(id: ID): User 
    }

    type Mutation {
        register(user: UserInput): Message
        login(user: UserInput): AccessToken
        putUser(user: UserInput): Message
        patchUser(role: UserInput): Message
    }

`

const resolvers = {
    Query: {
        getUsers: async () => {
            try {
                let users = await redis.get('users')
                if (!users) {
                    const { data } = await axios(`${BASE_URL}/users`, {
                        headers: {
                            access_token
                        }
                    })
                    users = data
                    await redis.set("users", JSON.stringify(data))
                } else {
                    users = JSON.parse(users)
                }
                return users
            } catch (err) {
                throw err.response.data
            }
        },
        getUser: async (_, args) => {
            try {
                const { id } = args
                let user = await redis.get(`user:${id}`)
                if (!user) {
                    const { data } = await axios(`${BASE_URL}/users/${id}`, {
                        headers: {
                            access_token
                        }
                    })
                    user = data
                    await redis.set(`user:${id}`, JSON.stringify(data))
                } else {
                    user = JSON.parse(user)
                }
                return user
            } catch (err) {
                throw err.response.data
            }
        }
    },
    Mutation: {
        register: async (_, args) => {
            try {
                const { data } = await axios.post(`${BASE_URL}/register`, args.user)
                await redis.del("users")
                return data
            } catch (err) {
                throw err.response.data
            }
        },
        login: async (_, args) => {
            try {
                const { data } = await axios.post(`${BASE_URL}/login`, args.user)
                return data
            } catch (err) {
                throw err.response.data
            }
        },
        patchUser: async (_, args) => {
            try {
                const { role } = args
                const { data } = await axios.patch(`${BASE_URL}/users`, role, {
                    headers: {
                        access_token
                    }
                })
                await redis.del("users")
                await redis.del(`user:${data.id}`)
                return data
            } catch (err) {
                throw err.response.data
            }
        },
        putUser: async (_, args) => {
            try {
                const { user } = args
                const { data } = await axios.put(`${BASE_URL}/users`, user, {
                    headers: {
                        access_token
                    }
                })
                console.log(data.id)
                await redis.del("users")
                await redis.del(`user:${data.id}`)
                return data
            } catch (err) {
                throwerr.response.data
            }
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}