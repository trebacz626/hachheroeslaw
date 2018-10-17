import * as Sequelize from "sequelize";
import config from '../../configuration/main'
import * as User from './User'
import * as Law from './Law'
import * as Vote from './Vote'
import logger from "../../utils/logger/logger";

class SequelizeManager {
  _sequelize: Sequelize.Sequelize
  Transaction: Sequelize.Transaction
  constructor() {
    this.prepare();
  }
  get sequelize(): Sequelize.Sequelize {
    return this._sequelize;
  }
  prepare() {
    this._sequelize = new Sequelize(config.killstagramDB.name, config.killstagramDB.userName, config.killstagramDB.password, {
      host: config.killstagramDB.host,
      dialect: "mysql",
      operatorsAliases: false,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      }
    });
  }
  async connect() {
    this.setRelations();
    logger.info("Finished setting up database");
    await this._sequelize.authenticate();
    this._sequelize.sync();
    logger.info("Database connected");
  }
  setRelations() {
    User.setModel(this._sequelize);
    Law.setModel(this.sequelize);
    Vote.setModel(this.sequelize);
    Vote.model.belongsTo(User.model);
    User.model.hasMany(Vote.model);
    Vote.model.belongsTo(Law.model);
    Law.model.hasMany(Vote.model);
  }
}

//solution for sequelize problem with date format in sequelize
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);

  // Z here means current timezone, _not_ UTC
  // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
  return date.format('YYYY-MM-DD HH:mm:ss.SSS');
};

export default new SequelizeManager();