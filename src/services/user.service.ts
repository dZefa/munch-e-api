import { default as bcrypt } from 'bcrypt';
import { default as jwt } from 'jsonwebtoken';
import { default as Bluebird } from 'bluebird';

import { User, UserModel, UserAddModel, UserViewModel } from '../db/models/user';

export class UserService {
  private readonly _saltRounds = Number(process.env.SALT);
  private readonly _jwtSecret = process.env.JWT_SECRET!;

  static get userAttributes() {
    return ['id', 'email'];
  }

  private static _user: Bluebird<UserModel | null>;

  static get user() {
    return UserService._user;
  }

  register({ email, password }: UserAddModel) {
    return bcrypt.hash(password, this._saltRounds)
      .then((hash) => {
        return User.create({ email, password: hash })
          .then((u: UserModel) => this.getUserById(u.id));
      });
  }

  login({ email }: UserAddModel) {
    return User.findOne({ where: { email } })
      .then((u) => {
        const { id, email } = u!;
        return { token: jwt.sign({ id, email }, this._jwtSecret) };
      });
  }

  verifyToken(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this._jwtSecret, (err, decoded: any) => {
        if (err) {
          resolve(false);
          return;
        }

        UserService._user = User.findById(decoded['id']);
        resolve(true);
        return;
      });
    }) as Promise<Boolean>;
  }

  getUserById(id: number) {
    return User.findById(id, {
      attributes: UserService.userAttributes,
    }) as Bluebird<UserViewModel>;
  }
}
