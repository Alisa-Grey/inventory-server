import { Router } from 'express';
import { addSetup, editSetup, deleteSetup, getSetup, getSetups } from '../controllers/setupController';

const router = Router();

router.get('/', getSetups);
router.post('/', addSetup);
router.get('/setup/:id', getSetup);
router.put('/setup/:id', editSetup);
router.delete('/setup/:id', deleteSetup);

export default router;