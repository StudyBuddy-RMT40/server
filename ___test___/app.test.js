const { describe, expect, test, it, beforeAll, afterAll, beforeEach } = require('@jest/globals');
const request = require('supertest');
const app = require('../app');
const User = require('../models/user');
const { connectTest, client } = require('../config/mongo');

beforeEach(async () => {
    await connectTest()
})

afterAll(async () => {
    await client.close()
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
})