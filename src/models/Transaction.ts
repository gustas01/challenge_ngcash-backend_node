import Sequelize, {Model} from "sequelize";
import bcryptjs from 'bcryptjs'

import databaseConfig from "../config/database";
import Account from './Account'

const connection = new Sequelize(databaseConfig)

const Transaction = connection.define('Transaction', {
  value: {
    type: Sequelize.FLOAT
  },
},)


export default Transaction
