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