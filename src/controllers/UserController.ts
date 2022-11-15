import User from '../models/User'

class UserController {
  async create(req, res){
    res.send('olá do usercontroller create')
  }

  async read(req, res){
    res.send('olá do usercontroller read')
  }

  async update(req, res){
    res.send('olá do usercontroller update')
  }

  async delete(req, res){
    res.send('olá do usercontroller delete')
  }
}

export default new UserController()
