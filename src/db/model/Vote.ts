import * as Sequelize from 'sequelize'
import sequelizeManager from './sequelizeManager';

export interface IVoteAttributes {
  isUp?:boolean,
  userId:number,
  lawId:number,
}


export interface IVoteInstance extends Sequelize.Instance<IVoteAttributes>, IVoteAttributes {
}

export var model: Sequelize.Model<IVoteInstance, IVoteAttributes>;

export function setModel(sequelize: Sequelize.Sequelize) {
  const Vote: Sequelize.Model<IVoteInstance, IVoteAttributes> = sequelize.define<IVoteInstance, IVoteAttributes>('votes',{
    isUp:{
      type:Sequelize.BOOLEAN,
      allowNull:false
    }
  }, {
      timestamps: false,
      tableName: 'votes'
    });

  model = Vote;
  model.removeAttribute('id');
}
