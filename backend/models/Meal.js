import mongoose from 'mongoose';

const mealSchema = mongoose.Schema({
  frontendId: { type: String, required: true }, // to map with 'm1', 'm2' etc.
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
  category: { type: String, required: true },
  allergens: [String],
  cuisine: { type: String },
  rating: { type: Number },
  isVeg: { type: Boolean, required: true },
  prepTime: { type: Number },
  tags: [String]
}, { timestamps: true });

const Meal = mongoose.model('Meal', mealSchema);
export default Meal;
