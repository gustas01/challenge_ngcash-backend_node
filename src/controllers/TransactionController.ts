import Transaction from '../models/Transaction'

class TransactionController {
  async create(debited_account_id: number, credited_account_id: number, value: number){
    try{
      //essa função vai ser chamada no update de accounts
      const transaction = await Transaction.create({debited_account_id, credited_account_id, value})
      
      return transaction
    }catch(err){

    }
  }

  async read(req: any, res: any){

  }

  async update(req, res){
    res.send('olá do TransactionController update')
  }

  async delete(req, res){
    res.send('olá do TransactionController delete')
  }
}

export default new TransactionController()
