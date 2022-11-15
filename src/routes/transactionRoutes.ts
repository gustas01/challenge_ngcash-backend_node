import { Router } from "express";
import transactionController from "../controllers/transactionController";

const router = Router()

router.post('/', transactionController.create)
router.get('/', transactionController.read)
router.put('/', transactionController.update)
router.delete('/', transactionController.delete)

export default router
