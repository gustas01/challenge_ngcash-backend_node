import { Router } from "express";
import accountController from "../controllers/AccountController";

const router = Router()

router.post('/', accountController.create)
router.get('/', accountController.read)
router.put('/', accountController.update)
router.delete('/', accountController.delete)

export default router
