import express from 'express';
import { deleteMessage, login, register, saveMessage, showMessages } from '../controllers/user.controller.js';

const router = express.Router()

router.post('/register', register )
router.post('/login', login)
router.post('/saveMessage', saveMessage)
router.get('/getMessages', showMessages)
router.delete('/deleteMessage/:id', deleteMessage)


export default router