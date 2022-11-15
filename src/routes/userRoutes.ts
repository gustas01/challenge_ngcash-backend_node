import { Router } from "express";
import userController from "../controllers/UserController";

const router = Router()

router.post('/', userController.create)
router.get('/', userController.read)
router.put('/', userController.update)
router.delete('/', userController.delete)

export default router
