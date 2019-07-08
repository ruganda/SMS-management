import express from 'express';
import UserController from '../controllers/userController';
import verifyToken, { validateContact } from '../middleware';
import MessageController from '../controllers/messageController';


const user = new UserController();
const message = new MessageController();
const router = express.Router();

router.post("/user", user.createUser)
router.delete("/user/:contact",  user.deleteContact)
router.post("/message", verifyToken,validateContact,  message.createMessage)
router.get("/recieved", verifyToken, message.viewAllRecieved)
router.get("/sent", verifyToken, message.viewAllSent)
router.patch("/recieved/:messageId", verifyToken, message.updateStatus)
router.delete("/recieved/:messageId", verifyToken, message.deleteMessage)
router.delete("/sent/:messageId", verifyToken, message.deleteMessage)
export default router;
