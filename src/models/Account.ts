import Sequelize from "sequelize";
import databaseConfig from "../config/database";

import User from './User'

const connection = new Sequelize(databaseConfig)

const Account = connection.define('Account', {
  balance: {
    type: Sequelize.FLOAT,
    defaultValue: 100,
  }
})

Account.hasOne(User, {
  foreignKey: 'accountId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

export default Account
