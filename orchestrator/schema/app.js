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
        Category: Category
        Teacher: Teacher
        Student: Student
        Todo: [Todo]
    }

    type Category {
        _id: ID
        name: String
    }

    type Todo {
        _id: ID
        name: String
        learningUrl: String
        projectId: ID
        isFinished: Boolean
    }

    type AccessToken {
        access_token: String
    }

    type Message {
        message: String
    }

    input ProjectInput {
        name: String
        teacherId: ID
        description: String
        categoryId: ID
        goals: String
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
        getProjects: [Project]
        getProject(id: ID): Project
    }

    type Mutation {
        register(user: UserInput): Message
        login(user: UserInput): AccessToken
        putUser(user: UserInput): Message
        patchUser(role: UserInput): Message
        addProject(project: ProjectInput): Message
        deleteProject(id: ID): Message
        putProject(id: ID, project: ProjectInput): Message
        patchProject(id: ID, project: ProjectInput): Message
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
        },
        getProjects: async () => {
            try {
                let projects = await redis.get('projects')
                if (!projects) {
                    const { data } = await axios(`${BASE_URL}/projects`, {
                        headers: {
                            access_token
                        }
                    })
                    projects = data
                    await redis.set('projects', JSON.stringify(data))
                } else {
                    projects = JSON.parse(projects)
                }
                return projects
            } catch (err) {
                throw err.response.data
            }
        },
        getProject: async (_, args) => {
            try {
                const { id } = args
                let project = await redis.get(`project:${id}`)
                if (!project) {
                    const { data } = await axios(`${BASE_URL}/projects/${id}`, {
                        headers: {
                            access_token
                        }
                    })
                    console.log(data)
                    project = data
                    await redis.set(`project:${id}`, JSON.stringify(data))
                } else {
                    project = JSON.parse(project)
                }
                return project
            } catch (err) {
                throw err
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
                throw err.response.data
            }
        },
        addProject: async (_, args) => {
            try {
                const { project } = args
                const { data } = await axios.post(`${BASE_URL}/projects`, project, {
                    headers: {
                        access_token
                    }
                })
                await redis.del('projects')
                return data
            } catch (err) {
                throw err.response.data
            }
        },
        deleteProject: async (_, args) => {
            try {
                const { id } = args
                const { data } = await axios.delete(`${BASE_URL}/projects/${id}`, {
                    headers: {
                        access_token
                    }
                })
                console.log(data)
                await redis.del('projects')
                await redis.del(`project:${id}`)
                return data
            } catch (err) {
                throw err.response.data
            }
        },
        putProject: async (_, args) => {
            try {
                const { id, project } = args
                const { data } = await axios.put(`${BASE_URL}/projects/${id}`, project, {
                    headers: {
                        access_token
                    }
                })
                await redis.del('projects')
                await redis.del(`project:${id}`)
                return data
            } catch (err) {
                throw err.response.data
            }
        },
        patchProject: async (_, args) => {
            try {
                const { id, project } = args
                const { data } = await axios.put(`${BASE_URL}/projects/${id}`, project, {
                    headers: {
                        access_token
                    }
                })
                await redis.del('projects')
                await redis.del(`project:${id}`)
                return data
            } catch (err) {
                throw err.response.data
            }
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}