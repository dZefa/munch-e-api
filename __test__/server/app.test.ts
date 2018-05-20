import supertest from 'supertest';
import app from '../../src/app';

describe('GET /random-url', () => {
  it('should return 404', (done) => {
    return supertest(app).get('/random-url')
              .then((response) => {
                expect(response.status).toBe(404);
                done();
              });
  });
});
