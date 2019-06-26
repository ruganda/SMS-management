import express from 'express';
import UserController from '../conrollers/userContoller';

const user = new UserController();

const router = express.Router()

router.post("/user", user.createUser )

export default router;