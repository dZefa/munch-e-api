import { default as Sequelize } from 'sequelize';
import { sequelize } from '../index';

export interface UserAddModel {
  email: string;
  password: string;
}

export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserViewModel {
  id: number;
  email: string;
}

export const User = sequelize.define<UserModel, UserAddModel>('user', {
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});
