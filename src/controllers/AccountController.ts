import Account from '../models/Account'
import { Request, Response } from 'express'

class AccountController {
  async create(){}

  async read(req, res){
    res.send('olá do accountController read')
  }

  async update(req, res){
    res.send('olá do accountController update')
  }

  async delete(req, res){
    res.send('olá do accountController delete')
  }
}

export default new AccountController()
