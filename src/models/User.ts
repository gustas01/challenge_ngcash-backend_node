import { Sequelize, DataTypes } from "sequelize";
import bcryptjs from 'bcryptjs'

import databaseConfig from "../config/database";

const connection = new Sequelize(databaseConfig)

const User = connection.define('User', {
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 50],
        msg: "O user_name deve ter pelo menos 3 caracteres "
      },
    },
    unique: {
      name: 'user_name',
      msg: "O user_name que você tentou utilizar já está em uso"
    }
  },
  password_hash: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  password: {
    type: DataTypes.VIRTUAL,
    defaultValue: '',
    validate: {
      len: {
        args: [8, 50],
        msg: 'A senha deve conter pelo menos 8 caracteres'
      }
    }
  },

},
{
  tableName: 'users',
  hooks: {
    beforeSave: async (user) => {
      if(user.dataValues.password)
        user.dataValues.password_hash = await bcryptjs.hash(user.dataValues.password, 8)  
    }
  }
},)


export default User
