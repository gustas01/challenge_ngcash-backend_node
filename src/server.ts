import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'

import userRoutes from './routes/userRoutes'
import accountRoutes from './routes/accountRoutes'
import transactionRoutes from './routes/transactionRoutes'


const app = express()
dotenv.config()

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(helmet())
app.use(cors())

app.use('/users', userRoutes)
app.use('/accounts', accountRoutes)
app.use('/transaction', transactionRoutes)

app.listen(process.env.APP_PORT, () => console.log(`servidor executando na porta ${process.env.APP_PORT} ${process.env.APP_URL}`))
