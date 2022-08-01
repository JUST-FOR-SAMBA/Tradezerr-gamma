import express from 'express';
import controller from '../controllers/user';
const router = express.Router();

router.get('/:id', controller.read);

router.get('/', controller.readAll);

export = router;
