import { Router } from "express";
import accountController from "../controllers/AccountController";
import loginRequired from "../middlewares/loginRequired";

const router = Router()

router.post('/', loginRequired, accountController.create)
router.get('/', loginRequired, accountController.read)
router.put('/', loginRequired, accountController.update)
router.delete('/', loginRequired, accountController.delete)

export default router
