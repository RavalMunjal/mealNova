import express from 'express';
import { getWeeklyPlan, addMealToDay, removeMealFromDay, getGroceryList } from '../controllers/plannerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getWeeklyPlan)
  .post(protect, addMealToDay);

// grocery-list MUST be before /:day/:mealId to avoid route conflict
router.get('/grocery-list', protect, getGroceryList);
router.delete('/:day/:mealId', protect, removeMealFromDay);

export default router;
