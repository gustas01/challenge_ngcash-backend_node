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
        balance: account.balance
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
      const account = await Account.findByPk(req.account_id)
      
      if(account.balance < req.body.cashOutValue)
        return res.status(401).json({
          errors: ['Saldo insuficiente']
      })
      
      //verificar se o usuário não está mandando para ele mesmo, comparar os user_names
      if(req.user_name === req.body.user_name_cashIn)
        return res.status(401).json({
          errors: ["Não é possível fazer cash-out para si mesmo"]
        })

      const userCashIn = await User.findOne({where: {user_name: req.body.user_name_cashIn}})
      
      if(!userCashIn)
        return res.status(401).json({
          errors: ["Não foi possível encontrar usuário para cash-in"]
      })
      
      const accountUserCashOut = await Account.findByPk(userCashIn.account_id)
      
      
      accountUserCashOut.balance += Number(req.body.cashOutValue)
      account.balance -= req.body.cashOutValue

      await accountUserCashOut.update({balance: accountUserCashOut.balance})
      await account.update({balance: account.balance})

      TransactionController.create(req.account_id, userCashIn.account_id, req.body.cashOutValue)

      return res.status(200).send(
        `Cash-out de ${req.body.cashOutValue}R$ realizado com sucesso`
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
