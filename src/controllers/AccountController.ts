import Account from '../models/Account'
import User from '../models/User'
import TransactionController from './TransactionController'

class AccountController {
  async create(){}

  async read(req: any, res: any){
    try{
      const account = await Account.findByPk(req.account_id)

      if(!account){
        res.status(404).json({
          errors: ["Account não encontrada"]
        })
      }

      return res.status(200).json({
        balance: account?.dataValues.balance
      })
    }catch(error: any){
      return res.status(200).json({
        errors: error.errors?.map(err => err.message)
      })
    }
  }

  async update(req: any, res: any){
    //quando fizer cash-in e cash-out
    try{
      if(!req.body.cashOutValue)
        return res.status(400).json({
          errors: ['Valor não enviado']
        })
        
      const account = await Account.findByPk(req.account_id)
      
      if(account?.dataValues.balance < req.body.cashOutValue)
        return res.status(400).json({
          errors: ['Saldo insuficiente']
      })
      
      //verificar se o usuário não está mandando para ele mesmo
      if(req.user_name === req.body.user_name_cashIn)
        return res.status(400).json({
          errors: ["Não é possível fazer cash-out para si mesmo"]
        })

      const userCashIn = await User.findOne({where: {user_name: req.body.user_name_cashIn}})
      
      if(!userCashIn)
        return res.status(400).json({
          errors: ["Não foi possível encontrar usuário para cash-in"]
      })
      
      const accountUserCashOut = await Account.findByPk(userCashIn.dataValues.account_id)
      
      await accountUserCashOut?.update({balance: accountUserCashOut.dataValues.balance + Number(req.body.cashOutValue)})
      await account?.update({balance: account.dataValues.balance - req.body.cashOutValue})
  


      TransactionController.create(req.account_id, userCashIn.dataValues.account_id, req.body.cashOutValue)

      return res.status(200).json(
        {msg: `Cash-out de ${req.body.cashOutValue}R$ realizado com sucesso para ${req.body.user_name_cashIn}`}
      )
    }catch(error: any){
      return res.status(200).json({
        errors: error.errors?.map(err => err.message)
      })
    }
  }

  async delete(req: any, res: any){}
}

export default new AccountController()
