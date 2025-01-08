const { app } = required("../server");
const request = require("supertest");

/**
 * @param Automating Testing Procedures.
 */
describe('GET /user', () => {
    it('responds with json', (done) => {
        request(app)
        .get('/api/user')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});

describe('POST /sign-up', () => {
    it('responds with json', (done) => {
        request(app)
        .post('/api/sign-up')
        .send({ 
            username: 'thor', 
            email: 'user1@example.com', 
            password: 'thor1234'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(res.body).toHaveProperty(':id')
        .expect(res.statusCode).toEqual(201, done);
    });
});

describe('POST /login', () => {
    it('responds with json', (done) => {
        request(app)
        .post('/api/login')
        .send({ 
            username: 'thor', 
            email: 'user1@example.com', 
            password: 'thor1234' 
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});

describe('GET /logout', () => {
    it('responds with json', (done) => {
        request(app)
        .get('/api/logout')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});

describe('GET /loggedin', () => {
    it('responds with json', (done) => {
        request(app)
        .get('/api/loggedin')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});