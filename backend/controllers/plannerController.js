import Plan from '../models/Plan.js';
import Meal from '../models/Meal.js';

// Helper to get or create plan
const getOrCreatePlan = async (userId) => {
  let plan = await Plan.findOne({ user: userId }).populate('plan.mon.breakfast plan.mon.lunch plan.mon.dinner plan.tue.breakfast plan.tue.lunch plan.tue.dinner plan.wed.breakfast plan.wed.lunch plan.wed.dinner plan.thu.breakfast plan.thu.lunch plan.thu.dinner plan.fri.breakfast plan.fri.lunch plan.fri.dinner plan.sat.breakfast plan.sat.lunch plan.sat.dinner plan.sun.breakfast plan.sun.lunch plan.sun.dinner');
  
  if (!plan) {
    plan = await Plan.create({
      user: userId,
      plan: {
        mon: {}, tue: {}, wed: {}, thu: {}, fri: {}, sat: {}, sun: {}
      }
    });
  }
  return plan;
};

// @desc    Get user's weekly plan
// @route   GET /api/planner
// @access  Private
const getWeeklyPlan = async (req, res) => {
  try {
    const plan = await getOrCreatePlan(req.user._id);
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add meal to day
// @route   POST /api/planner
// @access  Private
const addMealToDay = async (req, res) => {
  const { day, mealId, mealType } = req.body;
  try {
    const plan = await getOrCreatePlan(req.user._id);
    
    // Find meal object id from frontend string id if needed
    let dbMeal = await Meal.findById(mealId).catch(() => null);
    if (!dbMeal) {
      dbMeal = await Meal.findOne({ frontendId: mealId });
    }

    if (!dbMeal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    if (plan.plan[day.toLowerCase()]) {
      plan.plan[day.toLowerCase()][mealType.toLowerCase()] = dbMeal._id;
      await plan.save();
      res.json(plan);
    } else {
      res.status(400).json({ message: 'Invalid day' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove meal from day
// @route   DELETE /api/planner/:day/:mealId
// @access  Private
const removeMealFromDay = async (req, res) => {
  const { day, mealId } = req.params;
  try {
    const plan = await Plan.findOne({ user: req.user._id });
    if (!plan || !plan.plan[day.toLowerCase()]) {
      return res.status(404).json({ message: 'Plan or day not found' });
    }

    // Since we don't know the exact mealType (breakfast/lunch/dinner), we can search and nullify
    const dayPlan = plan.plan[day.toLowerCase()];
    if (dayPlan.breakfast && dayPlan.breakfast.toString() === mealId) dayPlan.breakfast = null;
    if (dayPlan.lunch && dayPlan.lunch.toString() === mealId) dayPlan.lunch = null;
    if (dayPlan.dinner && dayPlan.dinner.toString() === mealId) dayPlan.dinner = null;

    await plan.save();
    res.json({ message: 'Meal removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get grocery list based on weekly plan
// @route   GET /api/planner/grocery-list
// @access  Private
const getGroceryList = async (req, res) => {
  try {
    const plan = await getOrCreatePlan(req.user._id);
    // Simple mock logic: extract unique tags/categories or mock a grocery list
    const list = [
      { item: "Onions", qty: "1kg" },
      { item: "Tomatoes", qty: "1kg" },
      { item: "Rice", qty: "5kg" },
      { item: "Dal", qty: "2kg" },
      { item: "Paneer", qty: "500g" }
    ];
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getWeeklyPlan, addMealToDay, removeMealFromDay, getGroceryList };
