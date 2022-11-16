import jwt from "jsonwebtoken"
import User from "../models/User"

export default async(req, res, next) => {
  const { authorization } = req.headers

  if(!authorization)
    return res.status(401).json({
      errors: ['Login requerido']
    })

  const [, token] = authorization.split(' ')

  try{
    const dados = jwt.verify(token, process.env.TOKEN_SECRET)
    const {id, user_name, account_id} = dados

    const user = await User.findOne({
      where: {
        id,
        user_name
      }
    })

    if(!user){
      return res.status(401).json({
        errors: ['Usuário inválido']
      })
    }

    req.user_id = id
    req.user_name = user_name
    req.account_id = account_id
    console.log(dados);
    
    return next()
  }catch(e){
    console.log(e);
    return res.status(401).json({
      errors: ['Token expirado ou inválido']
    })
  }
}