import Transaction from '../models/Transaction'
import { Op } from 'sequelize'

class TransactionController {
  async create(debited_account_id: number, credited_account_id: number, value: number){
    try{
      //essa função vai ser chamada no update de accounts
      const transaction = await Transaction.create({debited_account_id, credited_account_id, value})
      
      return transaction
    }catch(err){
      return new Error('Falha ao criar transação')
    }
  }

  async read(req: any, res: any){
    try{
      const transactions = await Transaction.findAll({where: {
        [Op.or]: [
          {debited_account_id: req.user_id},
          {credited_account_id: req.user_id}
        ]
      }})
      
      return res.status(200).json({transactions})
    }catch(error: any){ 
      return res.status(400).json({
        errors: error.errors?.map(err => err.message)
      })
    }
  }

  async update(req, res){
    res.send('olá do TransactionController update')
  }

  async delete(req, res){
    res.send('olá do TransactionController delete')
  }
}

export default new TransactionController()
