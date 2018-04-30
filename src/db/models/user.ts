import { default as Sequelize } from 'sequelize';
import { sequelize } from '../index';

import { Bio } from './userBio';

export interface UserAddModel {
  email: string;
  password: string;
  BioId: number | null;
}

export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
  id: number;
  BioId: number | null;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserViewModel {
  id: number;
  email: string;
  BioId: number | null;
}

export const User = sequelize.define<UserModel, UserAddModel>('user', {
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});

User.belongsTo(Bio, { foreignKey: { allowNull: true, name: 'BioId' }, onDelete: 'CASCADE' });
