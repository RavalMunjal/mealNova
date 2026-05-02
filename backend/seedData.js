import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Meal from './models/Meal.js';
import User from './models/User.js';
import Plan from './models/Plan.js';

dotenv.config();

connectDB();

const mockMealsData = [
  // Breakfast
  { frontendId: 'm1', name: 'Kanda Poha', image: '/meals/poha.jpg', price: 150, calories: 250, protein: 5, carbs: 45, fat: 8, category: 'Breakfast', allergens: ['peanuts'], cuisine: 'Maharashtrian', rating: 4.5, isVeg: true, prepTime: 15, tags: ['Light', 'Healthy'] },
  { frontendId: 'm2', name: 'Masala Upma', image: '/meals/upma.jpg', price: 160, calories: 280, protein: 6, carbs: 48, fat: 9, category: 'Breakfast', allergens: ['gluten'], cuisine: 'South Indian', rating: 4.2, isVeg: true, prepTime: 20, tags: ['Comfort Food'] },
  { frontendId: 'm3', name: 'Aloo Paratha with Curd', image: '/meals/paratha.jpg', price: 230, calories: 450, protein: 12, carbs: 65, fat: 18, category: 'Breakfast', allergens: ['dairy', 'gluten'], cuisine: 'North Indian', rating: 4.8, isVeg: true, prepTime: 25, tags: ['Filling', 'Classic'] },
  // Lunch
  { frontendId: 'm11', name: 'Homestyle Dal Tadka & Rice', image: '/meals/dal_tadka.jpg', price: 230, calories: 450, protein: 15, carbs: 75, fat: 10, category: 'Lunch', allergens: ['dairy'], cuisine: 'North Indian', rating: 4.9, isVeg: true, prepTime: 30, tags: ['Comfort Food', 'Classic'] },
  { frontendId: 'm12', name: 'Rajma Chawal', image: '/meals/rajma.jpg', price: 260, calories: 520, protein: 18, carbs: 85, fat: 12, category: 'Lunch', allergens: [], cuisine: 'North Indian', rating: 4.8, isVeg: true, prepTime: 40, tags: ['High Protein', 'Heavy'] },
  { frontendId: 'm14', name: 'Chicken Curry & Rice', image: '/meals/chicken_curry.jpg', price: 290, calories: 600, protein: 35, carbs: 60, fat: 22, category: 'Lunch', allergens: [], cuisine: 'Indian', rating: 4.8, isVeg: false, prepTime: 45, tags: ['High Protein'] },
  // Dinner
  { frontendId: 'm21', name: 'Light Khichdi with Kadhi', image: '/meals/khichdi.jpg', price: 190, calories: 350, protein: 12, carbs: 55, fat: 8, category: 'Dinner', allergens: ['dairy'], cuisine: 'Gujarati', rating: 4.8, isVeg: true, prepTime: 25, tags: ['Light', 'Digestion Friendly'] },
  { frontendId: 'm22', name: 'Dal Makhani & Jeera Rice', image: '/meals/dal_makhani.jpg', price: 310, calories: 650, protein: 18, carbs: 70, fat: 32, category: 'Dinner', allergens: ['dairy'], cuisine: 'Punjabi', rating: 4.9, isVeg: true, prepTime: 120, tags: ['Heavy', 'Rich'] },
  { frontendId: 'm28', name: 'Chicken Tikka & Naan', image: '/meals/chicken_tikka.jpg', price: 280, calories: 580, protein: 32, carbs: 45, fat: 22, category: 'Dinner', allergens: ['gluten', 'dairy'], cuisine: 'Punjabi', rating: 4.9, isVeg: false, prepTime: 40, tags: ['High Protein'] }
];

const importData = async () => {
  try {
    await Meal.deleteMany();
    await User.deleteMany();
    await Plan.deleteMany();

    await Meal.insertMany(mockMealsData);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  // destroy data logic if needed
} else {
  importData();
}
