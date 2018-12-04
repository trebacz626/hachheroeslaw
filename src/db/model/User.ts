import * as Sequelize from 'sequelize'
import sequelizeManager from './sequelizeManager';
import { setMaxListeners } from 'cluster';

export interface IUserAttributes {
  id?: number,
  email?: string,
  passwordHash?: string,
  name?:string,
  refreshToken?:string,
  voteToken?:string
}


export interface IUserInstance extends Sequelize.Instance<IUserAttributes>, IUserAttributes {
}

export var model: Sequelize.Model<IUserInstance, IUserAttributes>;

export function setModel(sequelize: Sequelize.Sequelize) {
  const User: Sequelize.Model<IUserInstance, IUserAttributes> = sequelize.define<IUserInstance, IUserAttributes>('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true

    },
    name:{
      type:Sequelize.STRING,
      defaultValue:"Jan Kowalski"
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true
    },
    passwordHash: {
      type: Sequelize.STRING,
      allowNull: true
    },
    refreshToken:{
      type:Sequelize.STRING,
      allowNull:true
    },
    voteToken:{
      type:Sequelize.STRING,
      allowNull:false
    }
  }, {
      timestamps: false,
      tableName: 'users'
    });

  model = User;

}
