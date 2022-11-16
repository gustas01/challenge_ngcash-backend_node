import Transaction from '../models/Transaction'
import { Op } from 'sequelize'
import ITransaction from '../interfaces/ITransaction'

class TransactionController {
  //essa função vai ser chamada no update de accounts
  async create(debited_account_id: number, credited_account_id: number, value: number){
    try{
      const transaction = await Transaction.create({debited_account_id, credited_account_id, value})
      
      return transaction
    }catch(err){
      return new Error('Falha ao criar transação')
    }
  }

  async read(req: any, res: any){
    try{
      let transactions: Array<ITransaction> = await Transaction.findAll({where: {
        [Op.or]: [
          {debited_account_id: req.user_id},
          {credited_account_id: req.user_id}
        ]
      }})


      if(req.query.filtercashout == 'true'){
        transactions = transactions.filter((el: ITransaction) => el.debited_account_id === req.account_id)
      }

      if(req.query.filtercashin == 'true'){
        transactions = transactions.filter((el: ITransaction) => el.credited_account_id === req.account_id)
      }


      
      return res.status(200).json(transactions)
    }catch(error: any){ 
      return res.status(400).json({
        errors: error.errors?.map(err => err.message)
      })
    }
  }

  async update(req: any, res: any){
    res.send('olá do TransactionController update')
  }

  async delete(req: any, res: any){
    res.send('olá do TransactionController delete')
  }
}

export default new TransactionController()
