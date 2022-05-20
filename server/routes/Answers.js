import express from "express"

import { postAnswer, postComment, deleteAnswer } from '../controllers/Answers.js'
import auth from '../middleware/auth.js'

const router = express.Router();

router.patch('/post/:id',auth, postAnswer)
router.patch('/delete/:id',auth, deleteAnswer)
router.patch('/postComment/:id',auth, postComment)

export default router