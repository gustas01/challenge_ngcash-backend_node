import Sequelize from "sequelize";
import databaseConfig from "../config/database";

import User from './User'
import Transaction from './Transaction'

const connection = new Sequelize(databaseConfig)

const Account = connection.define('Account', {
  balance: {
    type: Sequelize.FLOAT,
    defaultValue: 100,
  }
})

Account.hasOne(User, {
  foreignKey: 'account_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Account.hasMany(Transaction, {
  as: 'debited_account',
  foreignKey: 'debited_account_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',  
})

Account.hasMany(Transaction, {
  as: 'credited_account',
  foreignKey: 'credited_account_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',  
})

export default Account
