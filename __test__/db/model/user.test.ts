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

  it('should add a single User successfully', () => {
    const testUser = {
      email: 'tester@test.com',
      password: 'testing',
    };

    const user = User.create(testUser);

    return user.then((u) => {
      expect(u.id).toBeGreaterThan(0);
    });
  });
});

