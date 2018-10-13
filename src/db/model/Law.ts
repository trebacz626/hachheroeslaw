import * as Sequelize from 'sequelize'
import sequelizeManager from './sequelizeManager';

export interface ILawAttributes {
  id?: string,
  email?: string,
  passwordHash?: string
}


export interface ILawInstance extends Sequelize.Instance<ILawAttributes>, ILawAttributes {
}

export var model: Sequelize.Model<ILawInstance, ILawAttributes>;

export function setModel(sequelize: Sequelize.Sequelize) {
  const Law: Sequelize.Model<ILawInstance, ILawAttributes> = sequelize.define<ILawInstance, ILawAttributes>('laws', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    govId:{
      type: Sequelize.INTEGER,
      allowNull:false
    },
    name:{
      type:Sequelize.STRING,
      allowNull:false
    },
    pdfLink:{
      type:Sequelize.STRING,
      allowNull:false
    },
    votesUp:{
      type:Sequelize.INTEGER,
      defaultValue:0
    },
    votesDown:{
      type:Sequelize.INTEGER,
      defaultValue:0
    }
  }, {
      timestamps: false,
      tableName: 'laws'
    });

  model = Law;

}
