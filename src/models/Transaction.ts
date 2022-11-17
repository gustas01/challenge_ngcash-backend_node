import { Sequelize, DataTypes } from "sequelize";

import databaseConfig from "../config/database";

const connection = new Sequelize(databaseConfig)

const Transaction = connection.define('Transaction', {
  value: {
    type: DataTypes.FLOAT
  },
},)



export default Transaction
