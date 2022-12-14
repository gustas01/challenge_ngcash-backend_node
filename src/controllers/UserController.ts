import { Sequelize } from "sequelize";

import User from '../models/User'
import databaseConfig from "../config/database";
import Account from "../models/Account";
import Transaction from "../models/Transaction";
import IUser from "../interfaces/IUser";

class UserController {
  async create(req: any, res: any){
    const connection = new Sequelize(databaseConfig)
    
    try{
      const { password } = req.body
      
      if (!((/[A-Z]/).test(password) && ((/[a-z]/).test(password))))
        return res.status(400).json({errors: ["A senha deve ter pelo menos 1 letra maiúscula e 1 minúscula"]})
      
      
      const newUser = await connection.transaction(async (t: any) => {
        const newAccount = await Account.create({}, {transaction: t})
        const { id } = newAccount.dataValues
        
        return await User.create({...req.body, account_id: id}, {transaction: t})
      })

      const {id, user_name} = newUser.dataValues

      return res.status(200).json({id, user_name})
      }catch(error: any){
        
        return res.status(400).json({
          errors: error.errors?.map(err => err.message)
        })
      }
  }

  async read(req: any, res: any){
    try{
      const user = await User.findByPk(req.user_id)

      if(!user){
        return res.status(404).json({
          errors: ['Usuário não encontrado']
        })
      }

      return res.status(200).json({
        id: user.dataValues.id,
        user_name: user.dataValues.user_name
      })
    }catch(error: any){
      return res.status(400).json({
        errors: error.errors?.map(err => err.message)
      })
    }
  }

  async update(req: any, res: any){
    try{
      const user = await User.findByPk(req.user_id)

      if(!user)
        return res.status(404).json({
          errors: ['Usuário não encontrado']
        })

      const updatedUser = await user.update(req.body)
      const {id, user_name} = updatedUser.dataValues
      
      return res.status(200).json({id, user_name})
    }catch(error: any){
      return res.status(400).json({
        errors: error.errors?.map(err => err.message)
      })
    }
  }

  async delete(req: any, res: any){
    try{
      const user = await User.findByPk(req.user_id)

      if(!user){
        return res.status(404).json({errors: ["Usurário não encontrado"]})
      }

      const {account_id} = user.dataValues

      await User.destroy({where: {id: req.user_id}})
      await Account.destroy({where: {id: account_id}})
      await Transaction.destroy({where: {debited_account_id: account_id}})

      return res.status(200).json('Usuário deletado')
    }catch(error: any){
      return res.status(200).json({
        errors: error.errors?.map(err => err.message)
      })
    }
  }
}

export default new UserController()
