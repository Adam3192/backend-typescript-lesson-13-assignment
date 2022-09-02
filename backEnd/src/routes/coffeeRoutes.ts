import { Router } from 'express';
import { addCoffee, editCoffee, deleteCoffee, getAllCoffee, getOneCoffee } from '../controllers/coffeeController';

const router = Router();

router.get('/', getAllCoffee);
router.get('/:id', getOneCoffee);
router.post('/', addCoffee);
router.put('/:id', editCoffee);
router.delete('/:id', deleteCoffee);

export default router;