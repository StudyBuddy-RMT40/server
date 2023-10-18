const { describe, expect, test, it, beforeAll, afterAll, beforeEach } = require('@jest/globals');
const request = require('supertest');
const app = require('../app');
const User = require('../models/user');
const { connectTest, client, getDbTest } = require('../config/mongo');

beforeEach(async () => {
    try {
        console.log("before all guys")
        await connectTest()        
        console.log("before all after <<<")

        const user = await User.findOne({where: {email: "najmi@mail.com"}})
        access_token = signToken({id: user.id})

        console.log(access_token)
    } catch (error) {
        console.log(error)
    }
})

afterAll(async () => {
    try {
        console.log("after all guys")
        // const a = await getDbTest().deleteMany({})      
        // console.log(a, "<<<<<<<<<")
        await client.close()
    } catch (error) {
        console.log(error)
    }
})

describe('Register user with endpoint /register', () => {
    it('Register success', async () => {
        const response = await request(app).post('/register').send({
            username: 'najmi',
            email: 'najmi@mail.com',
            password: '12345',
            phoneNumber: '082368273623',
            address: 'Punteun'
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message', expect.any(String))
    })

    it('Register with empty username', async () => {
        const response = await request(app).post('/register').send({
            email: 'abo@mail.com',
            password: '12345',
            phoneNumber: '083273268376',
            address: 'Punteun'
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', expect.any(String))
    })

    it('Register with empty email', async () => {
        const response = await request(app).post('/register').send({
            username: 'najmi',
            password: '12345',
            phoneNumber: '083273268376',
            address: 'Punteun'
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', expect.any(String))
    })

    it('Register with empty password', async () => {
        const response = await request(app).post('/register').send({
            username: 'najmi',
            email: 'abo@mail.com',
            phoneNumber: '083273268376',
            address: 'Punteun'
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', expect.any(String))
    })
})

describe('Login user with endpoint /login', () => {
    it('Login success', async () => {
        const response = await request(app).post('/login').send({
            email: 'najmi@mail.com',
            password: '12345',
        })
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('message', expect.any(String))
    })

    it('Login with empty username', async () => {
        const response = await request(app).post('/login').send({
            password: '12345',
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', expect.any(String))
    })

    it('Login with empty password', async () => {
        const response = await request(app).post('/login').send({
            email: 'najmi@mail.com',
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', expect.any(String))
    })

    it('Login with email is invalid', async () => {
        const response = await request(app).post('/login').send({
            email: 'halo@mail.com',
            password: '12345'
        })
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message', expect.any(String))
    })

    it('Login with password is invalid', async () => {
        const response = await request(app).post('/login').send({
            email: 'najmi@mail.com',
            password: '123'
        })
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message', expect.any(String))
    })
})

describe('Project with endpoint /project', () => {

    it('should respon 201 and body message', async () => {
        const response = await request(app)
            .post('/project')
            .send({
                name: 'Halo',
                studentId: 1,
                teacherId: 1,
                startDate: '2023-10-1',
                endDate: '2023-10-10',
                isFinished: true,
                description: "Halo ini untuk test description",
                likes: 10,
                categoryId: 1
            })
            // .set('access_token', access_token)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message', expect.any(String))
    })


    it('should respon 200 and body message', async () => {
        const response = await request(app)
            .get('/project')
            // .set('access_token', access_token)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)

        expect(response.body[0]).toHaveProperty('_id', expect.any(String))
        expect(response.body[0]).toHaveProperty('name', expect.any(String))
        expect(response.body[0]).toHaveProperty('studentId', expect.any(Number))
        expect(response.body[0]).toHaveProperty('teacherId', expect.any(Number))
        expect(response.body[0]).toHaveProperty('startDate', expect.any(String))
        expect(response.body[0]).toHaveProperty('endDate', expect.any(String))
        expect(response.body[0]).toHaveProperty('isFinished', expect.any(Boolean))
        expect(response.body[0]).toHaveProperty('description', expect.any(String))
        expect(response.body[0]).toHaveProperty('likes', expect.any(Number))
        expect(response.body[0]).toHaveProperty('categoryId', expect.any(Number))
    })

    it('should respon 400 name invalid and body message', async () => {
        const response = await request(app)
            .post('/project')
            .send({
                studentId: 1,
                teacherId: 1,
                startDate: '2023-10-1',
                endDate: '2023-10-10',
                isFinished: true,
                description: "Halo ini untuk test description",
                likes: 10,
                categoryId: 1
            })
            // .set('access_token', access_token)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', expect.any(String))
    })

    it('should respon 400 description invalid and body message', async () => {
        const response = await request(app)
            .post('/project')
            .send({
                name: "Halo",
                studentId: 1,
                teacherId: 1,
                startDate: '2023-10-1',
                endDate: '2023-10-10',
                isFinished: true,
                likes: 10,
                categoryId: 1
            })
            // .set('access_token', access_token)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', expect.any(String))
    })

    it('should respon 400 category id invalid and body message', async () => {
        const response = await request(app)
            .post('/project')
            .send({
                name: "Halo",
                studentId: 1,
                teacherId: 1,
                startDate: '2023-10-1',
                endDate: '2023-10-10',
                isFinished: true,
                description: "Halo ini untuk test description",
                likes: 10,
            })
            // .set('access_token', access_token)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', expect.any(String))
    })

    it('should respon 200 delete project and body message', async () => {
        const response = await request(app)
            .delete('/project/652ff4ea907670325fb67333')
            // .set('access_token', access_token)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('message', expect.any(String))
    })

    it('should respon 404 delete project not found and body message', async () => {
        const response = await request(app)
            .delete('/project/652ff4ea907670325fkejcow')
            // .set('access_token', access_token)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message', expect.any(String))
    })
})