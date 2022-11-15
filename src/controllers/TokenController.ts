import User from '../models/User'
import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

class TokenController {
  async create(req: Request, res: Response){
    const {user_name, password} = req.body

    if(!user_name || !password){
      return res.status(404).json({
        errors: ["Credenciais inválidas"]
      })
    }

    const user = await User.findOne({where: {user_name}})

    if(!user){
      return res.status(404).json({
        errors: ["Usuário não encontrado"]
      })
    }

    if(!(await bcryptjs.compare(password, user.password_hash))){
      return res.status(401).json({
        errors: ['Senha inválida']
      })
    }

    const { id } = user
    const token = jwt.sign({id, user_name}, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_EXPIRATION})

    res.json({token})
  }
}

export default new TokenController()