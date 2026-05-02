import Meal from '../models/Meal.js';

// @desc    Fetch all meals or search/filter
// @route   GET /api/meals
// @access  Public
const getMeals = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const meals = await Meal.find(query);
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single meal
// @route   GET /api/meals/:id
// @access  Public
const getMealById = async (req, res) => {
  try {
    // Check if it's an object ID or frontend ID (m1, m2)
    let meal;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      meal = await Meal.findById(req.params.id);
    } else {
      meal = await Meal.findOne({ frontendId: req.params.id });
    }

    if (meal) {
      res.json(meal);
    } else {
      res.status(404).json({ message: 'Meal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getMeals, getMealById };
