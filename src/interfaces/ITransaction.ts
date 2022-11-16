interface ITransaction {
  id: Number,
  value: Number,
  created_at: Date,
  updated_at: Date,
  debited_account_id: Number,
  credited_account_id: Number
  }


export default ITransaction