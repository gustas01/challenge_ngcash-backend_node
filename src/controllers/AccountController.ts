import Account from '../models/Account'

class AccountController {
  async create(req, res){
    res.send('olá do accountController create')
  }

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
