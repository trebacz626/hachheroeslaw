import * as Sequelize from 'sequelize'
import sequelizeManager from './sequelizeManager';

export interface ILawAttributes {
  id?: string,
  name?:string,
  cadence?:number,
  govId?:number,
  pdfLink?:string,
  votesUp?:number,
  votesDown?:number,
  usersVote?:boolean,
  status?:string
}


export interface ILawInstance extends Sequelize.Instance<ILawAttributes>, ILawAttributes {
}

export var model: Sequelize.Model<ILawInstance, ILawAttributes>;

export const LawStatus={
  PROJECT:"project",
  IN_PROCEDURE:"inprogress",
  VOTED_ACCEPTED:"accepted",
  VOTED_REFUSED:"refused"
}

export function setModel(sequelize: Sequelize.Sequelize) {
  const Law: Sequelize.Model<ILawInstance, ILawAttributes> = sequelize.define<ILawInstance, ILawAttributes>('laws', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    cadence:{
      type:Sequelize.INTEGER,
      allowNull:false
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
    },
    status:{
      type:Sequelize.STRING,
      allowNull:false
    }
  }, {
      timestamps: false,
      tableName: 'laws',
      /*indexes: [
        // add a FULLTEXT index
        <Sequelize.DefineIndexOptions>{ type: 'FULLTEXT', name: 'text_idx', fields: ['name'] }
      ]*/
    });

  model = Law;

}
