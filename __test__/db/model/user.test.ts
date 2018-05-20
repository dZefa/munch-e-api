import '../../../src/util/secrets';
import { sequelize } from '../../../src/db';
import { User } from '../../../src/db/models/user';

describe('User Model', () => {
  beforeAll(() => {
    return sequelize.authenticate()
      .then(() => {
        return User.sync({ force: true });
      });
  });

  afterAll(() => {
    return User.drop();
  });

  const testUser = {
    email: 'tester@test.com',
    password: 'testing',
  };

  it('should add a single User successfully', (done) => {
    User.create(testUser)
      .then((u) => {
        expect(u.id).toBeGreaterThan(0);
        done();
      });
  });

  it('should find test user', (done) => {
    User.findOne({ where: { email: testUser.email } })
      .then((u) => {
        expect(u).toBeDefined();
        done();
      });
  });
});

