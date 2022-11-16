import { Router } from "express";
import transactionController from "../controllers/TransactionController";
import loginRequired from "../middlewares/loginRequired";

const router = Router()

router.get('/', loginRequired, transactionController.read)
router.put('/', loginRequired, transactionController.update)
router.delete('/', loginRequired, transactionController.delete)

export default router
