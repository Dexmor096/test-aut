// import { Router } from 'express';

import { Router } from 'express';
import { registration, login, logout, activate, refresh, getUsers } from '../controller/user-controller.js';

const router = new Router()

router.post('/registration', registration);
router.post('/login', login);
router.post('/logout', logout);
router.get('/activate/:link', activate);
router.get('/refresh', refresh);
router.get('/users', getUsers);

export default router
