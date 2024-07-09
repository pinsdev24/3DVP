const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const User = require('../models/User');
const usersRoutes = require('../routes/users');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/users', usersRoutes);

beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Users API Integration Tests', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('should create a new user and fetch it', async () => {
        // Create User
        const createRes = await request(app)
            .post('/users')
            .send({ name: 'John Doe', email: 'john@example.com' });
        expect(createRes.statusCode).toEqual(302);

        // Fetch Users
        const fetchRes = await request(app).get('/users');
        expect(fetchRes.statusCode).toEqual(200);
        expect(fetchRes.text).toContain('John Doe');
        expect(fetchRes.text).toContain('john@example.com');
        const user = await User.findOne({ email: 'john@example.com' });
        expect(fetchRes.text).toContain(user.createdAt.toISOString().slice(0, 10));
    });

    it('should update a user and verify the update', async () => {
        const user = new User({ name: 'John Doe', email: 'john@example.com' });
        await user.save();

        // Update User
        const updateRes = await request(app)
            .put(`/users/${user._id}`)
            .send({ name: 'Jane Doe', email: 'jane@example.com' });
        expect(updateRes.statusCode).toEqual(302);

        // Fetch Updated User
        const fetchRes = await request(app).get('/users');
        expect(fetchRes.statusCode).toEqual(200);
        expect(fetchRes.text).toContain('Jane Doe');
        expect(fetchRes.text).toContain('jane@example.com');
    });

    it('should delete a user and verify deletion', async () => {
        const user = new User({ name: 'John Doe', email: 'john@example.com' });
        await user.save();

        // Delete User
        const deleteRes = await request(app).delete(`/users/${user._id}`);
        expect(deleteRes.statusCode).toEqual(302);

        // Verify Deletion
        const fetchRes = await request(app).get('/users');
        expect(fetchRes.statusCode).toEqual(200);
        expect(fetchRes.text).not.toContain('John Doe');
        expect(fetchRes.text).not.toContain('john@example.com');
    });
});