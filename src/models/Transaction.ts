import Sequelize from "sequelize";

import databaseConfig from "../config/database";

const connection = new Sequelize(databaseConfig)

const Transaction = connection.define('Transaction', {
  value: {
    type: Sequelize.FLOAT
  },
},)


export default Transaction
