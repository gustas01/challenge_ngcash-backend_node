import Transaction from '../models/Transaction'
import { Request, Response } from 'express'

class TransactionController {
  async create(value: number){
    try{
//essa função vai ser chamada no update de accounts
    }catch(err){

    }
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
