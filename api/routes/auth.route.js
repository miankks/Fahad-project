import expres from 'express';
import { signin, signup } from '../controllers/auth.controller.js';

const router = expres.Router();

router.post('/signup', signup)
router.post('/signin', signin)

export default router;