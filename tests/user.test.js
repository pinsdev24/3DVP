const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const User = require('../models/User');
const usersRoutes = require('../routes/users');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/users', usersRoutes);

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/nodejs-app-test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    await User.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Users API', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/users')
            .send({ name: 'John Doe', email: 'john@example.com'});
        expect(res.statusCode).toEqual(302);
    });

    it('should fetch all users', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('John Doe');
    });

    it('should update a user', async () => {
        const user = await User.findOne({ email: 'john@example.com' });
        const res = await request(app)
            .put(`/users/${user._id}`)
            .send({ name: 'Jane Doe', email: 'jane@example.com' });
        expect(res.statusCode).toEqual(302);
    });

    it('should delete a user', async () => {
        const user = await User.findOne({ email: 'jane@example.com' });
        const res = await request(app).delete(`/users/${user._id}`);
        expect(res.statusCode).toEqual(302);
    });
});
