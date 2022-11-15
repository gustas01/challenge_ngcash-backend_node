import Transaction from '../models/Transaction'

class TransactionController {
  async create(req, res){
    res.send('olá do TransactionController create')
  }

  async read(req, res){
    res.send('olá do TransactionController read')
  }

  async update(req, res){
    res.send('olá do TransactionController update')
  }

  async delete(req, res){
    res.send('olá do TransactionController delete')
  }
}

export default new TransactionController()
