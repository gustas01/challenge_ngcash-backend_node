import Sequelize, {Model} from "sequelize";
import bcryptjs from 'bcryptjs'

import databaseConfig from "../config/database";
import Account from "./Account";

const connection = new Sequelize(databaseConfig)

const User = connection.define('User', {
  user_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        min: 3,
        msg: "O user_name deve ter pelo menos 3 caracteres "
      },
    },
    unique: {
      msg: "O user_name que você tentou utilizar já está em uso"
    }
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
        min: 8,
        msg: 'A senha deve conter pelo menos 8 caracteres'
      }
    }
  },

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
