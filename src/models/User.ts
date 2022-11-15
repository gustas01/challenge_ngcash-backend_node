import Sequelize, {Model} from "sequelize";
import bcryptjs from 'bcryptjs'

import databaseConfig from "../config/database";
import Account from './Account'

const connection = new Sequelize(databaseConfig)

const User = connection.define('User', {
  userName: {
    type: Sequelize.STRING,
    defaultValue: '',
    allowNull: false,
    },
  password_hash: {
    type: Sequelize.STRING,
    defaultValue: '',
  },
  password: {
    type: Sequelize.VIRTUAL,
    defaultValue: '',
    validate: {
      len: {
        args: [8, 50],
        msg: 'A senha deve conter entre 8 e 50 caracteres'
      }
    }
  },
  accountId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }

},
{
  hooks: {
    beforeSave: async (user) => {
      if(user.password){
        user.password_hash = await bcryptjs.hash(user.password, 8)
      }
    }
  },
},)


export default User
