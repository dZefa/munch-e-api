import '../../../src/util/secrets';
import { sequelize } from '../../../src/db';
import { User } from '../../../src/db/models/user';
import { Bio } from '../../../src/db/models/userBio';

describe('Bio Model', () => {
  beforeAll(() => {
    return sequelize.authenticate()
      .then(() => {
        return User.sync({ force: true })
          .then(() => {
            return Bio.sync({ force: true });
          });
      });
  });

  afterAll(() => {
    return User.drop()
      .then(() => {
        return Bio.drop();
      });
  });

  const testUser = {
    email: 'tester@test.com',
    password: 'testing',
  };

  const testBio = {
    firstName: 'Test',
    lastName: 'Tester',
    dob: 'dateformat',
  };

  it('should add a single User and their Bio', () => {
    User.create(testUser)
      .then((u) => {
        Bio.create(Object.assign({}, testBio, { UserId: u.id }))
          .then((b) => {
            expect(b.id).toBe(typeof Number);
            expect(b.firstName).toBe('Test');
            expect(b.lastName).toBe('Tester');
            expect(b.UserId).toBe(u.id);
          });
      });
  });
});
