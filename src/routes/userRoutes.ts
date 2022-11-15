import { Router } from "express";
import userController from "../controllers/UserController";
import loginRequired from "../middlewares/loginRequired";

const router = Router()

router.post('/', userController.create)
router.get('/', loginRequired, userController.read)
router.put('/', loginRequired, userController.update)
router.delete('/', loginRequired, userController.delete)

export default router
