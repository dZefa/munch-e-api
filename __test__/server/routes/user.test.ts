import supertest from 'supertest';
import app from '../../../src/app';

describe('/user', () => {
  const testUser = {
    email: 'test@test.com',
    password: 'testing',
  };

  describe('/register', () => {
    it('should register single test user', (done) => {
      return supertest(app).post('/register')
        .send(Object.assign({}, testUser, { confirmPassword: 'testing' }))
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .then((response) => {
          expect(response.status).toBe(201);
          done();
        });
    });
  });

  describe('/login', () => {
    it('should login and return token', (done) => {
      return supertest(app).post('/login')
        .send(testUser)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body.result.token.token).toBeInstanceOf(String);
          done();
        });
    });
  });
});
