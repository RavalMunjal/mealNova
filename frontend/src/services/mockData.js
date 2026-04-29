// Mock Data for MealNova
// All images are strictly LOCAL — perfectly matching the name, generated once and saved.

const L = {
  // Breakfast
  poha:    '/meals/poha.jpg',
  upma:    '/meals/upma.jpg',
  paratha: '/meals/paratha.jpg',
  idli:    '/meals/idli_sambar.jpg',
  puri:    '/meals/puri_bhaji.jpg',
  thepla:  '/meals/thepla.jpg',
  paneer_bhurji: '/meals/paneer_bhurji.jpg',
  oats_chilla: '/meals/oats_chilla.jpg',
  bread_pakora: '/meals/bread_pakora.jpg',
  moong_cheela: '/meals/moong_dal_cheela.jpg',

  // Lunch
  dal_tadka: '/meals/dal_tadka.jpg',
  rajma:     '/meals/rajma_chawal.jpg',
  palak:     '/meals/palak_paneer.jpg',
  chicken_curry: '/meals/chicken_curry.jpg',
  bhindi:    '/meals/bhindi_masala.jpg',
  chole:     '/meals/chole_bhature.jpg',
  biryani:   '/meals/biryani.jpg',
  baingan:   '/meals/baingan_bharta.jpg', 
  fish_curry: '/meals/fish_curry.jpg',
  mix_veg:   '/meals/mix_veg.jpg',

  // Dinner
  khichdi:   '/meals/khichdi.jpg',
  dal_makhani: '/meals/dal_makhani.jpg',
  soya_chaap: '/meals/soya_chaap.jpg',
  paneer_tikka: '/meals/paneer_tikka.jpg',
  mushroom:  '/meals/mushroom_do_pyaza.jpg',
  egg_curry: '/meals/egg_curry.jpg',
  gobi_aloo: '/meals/gobi_aloo.jpg',
  chicken_tikka: '/meals/chicken_tikka.jpg',
  lauki_kofta: '/meals/lauki_kofta.jpg',
  matar_paneer: '/meals/matar_paneer.jpg',

  // Salad & Extra
  salad:     '/meals/veg_salad.jpg',
  sprouted:  '/meals/sprouted_moong.jpg',
  raita:     '/meals/boondi_raita.jpg',
  papad:     '/meals/roasted_papad.jpg',

  // Desserts
  gulab_jamun: '/meals/gulab_jamun.jpg',
  kheer:       '/meals/rice_kheer.jpg',
  gajar_halwa: '/meals/gajar_halwa.jpg',
  rasgulla:    '/meals/rasgulla.jpg',
  moong_halwa: '/meals/moong_dal_halwa.jpg',
  custard:     '/meals/fruit_custard.jpg',
};

export const MOCK_MEALS = [
  // ─── Breakfast ──────────────────────────────────────────────────────────
  { id: 'm1',  name: 'Kanda Poha',             image: L.poha, price: 150, calories: 250, protein: 5,  carbs: 45, fat: 8,  category: 'Breakfast', allergens: ['peanuts'],         cuisine: 'Maharashtrian', rating: 4.5, isVeg: true,  prepTime: 15, tags: ['Light','Healthy'] },
  { id: 'm2',  name: 'Masala Upma',            image: L.upma, price: 160, calories: 280, protein: 6,  carbs: 48, fat: 9,  category: 'Breakfast', allergens: ['gluten'],           cuisine: 'South Indian',  rating: 4.2, isVeg: true,  prepTime: 20, tags: ['Comfort Food'] },
  { id: 'm3',  name: 'Aloo Paratha with Curd', image: L.paratha, price: 230, calories: 450, protein: 12, carbs: 65, fat: 18, category: 'Breakfast', allergens: ['dairy','gluten'],   cuisine: 'North Indian',  rating: 4.8, isVeg: true,  prepTime: 25, tags: ['Filling','Classic'] },
  { id: 'm4',  name: 'Idli Sambar',            image: L.idli, price: 170, calories: 300, protein: 10, carbs: 55, fat: 5,  category: 'Breakfast', allergens: [],                   cuisine: 'South Indian',  rating: 4.6, isVeg: true,  prepTime: 15, tags: ['Healthy','High Protein'] },
  { id: 'm5',  name: 'Puri Bhaji',             image: L.puri, price: 270, calories: 550, protein: 8,  carbs: 70, fat: 25, category: 'Breakfast', allergens: ['gluten'],           cuisine: 'North Indian',  rating: 4.3, isVeg: true,  prepTime: 30, tags: ['Weekend Special'] },
  { id: 'm6',  name: 'Methi Thepla',           image: L.thepla, price: 180, calories: 320, protein: 8,  carbs: 45, fat: 12, category: 'Breakfast', allergens: ['gluten'],           cuisine: 'Gujarati',      rating: 4.4, isVeg: true,  prepTime: 20, tags: ['Travel Friendly'] },
  { id: 'm7',  name: 'Paneer Bhurji Pav',      image: L.paneer_bhurji, price: 240, calories: 480, protein: 20, carbs: 50, fat: 22, category: 'Breakfast', allergens: ['dairy','gluten'],   cuisine: 'Street Food',   rating: 4.7, isVeg: true,  prepTime: 20, tags: ['High Protein'] },
  { id: 'm8',  name: 'Oats Chilla',            image: L.oats_chilla, price: 140, calories: 220, protein: 9,  carbs: 35, fat: 6,  category: 'Breakfast', allergens: [],                   cuisine: 'Modern Indian', rating: 4.1, isVeg: true,  prepTime: 15, tags: ['Weight Loss'] },
  { id: 'm9',  name: 'Bread Pakora',           image: L.bread_pakora, price: 210, calories: 400, protein: 10, carbs: 45, fat: 20, category: 'Breakfast', allergens: ['gluten'],           cuisine: 'North Indian',  rating: 4.0, isVeg: true,  prepTime: 25, tags: ['Fried'] },
  { id: 'm10', name: 'Moong Dal Cheela',       image: L.moong_cheela, price: 150, calories: 250, protein: 14, carbs: 30, fat: 7,  category: 'Breakfast', allergens: [],                   cuisine: 'North Indian',  rating: 4.6, isVeg: true,  prepTime: 20, tags: ['High Protein','Healthy'] },

  // ─── Lunch ──────────────────────────────────────────────────────────────
  { id: 'm11', name: 'Homestyle Dal Tadka & Rice', image: L.dal_tadka, price: 230, calories: 450, protein: 15, carbs: 75, fat: 10, category: 'Lunch', allergens: ['dairy'],          cuisine: 'North Indian', rating: 4.9, isVeg: true,  prepTime: 30, tags: ['Comfort Food','Classic'] },
  { id: 'm12', name: 'Rajma Chawal',               image: L.rajma, price: 260, calories: 520, protein: 18, carbs: 85, fat: 12, category: 'Lunch', allergens: [],                 cuisine: 'North Indian', rating: 4.8, isVeg: true,  prepTime: 40, tags: ['High Protein','Heavy'] },
  { id: 'm13', name: 'Palak Paneer with Roti',     image: L.palak, price: 280, calories: 580, protein: 22, carbs: 55, fat: 28, category: 'Lunch', allergens: ['dairy','gluten'], cuisine: 'North Indian', rating: 4.7, isVeg: true,  prepTime: 35, tags: ['Iron Rich'] },
  { id: 'm14', name: 'Chicken Curry & Rice',       image: L.chicken_curry, price: 290, calories:600,protein: 35, carbs: 60, fat: 22, category: 'Lunch', allergens: [],                 cuisine: 'Indian',       rating: 4.8, isVeg: false, prepTime: 45, tags: ['High Protein'] },
  { id: 'm15', name: 'Bhindi Masala & Phulka',     image: L.bhindi, price: 190, calories: 350, protein: 10, carbs: 45, fat: 14, category: 'Lunch', allergens: ['gluten'],         cuisine: 'North Indian', rating: 4.4, isVeg: true,  prepTime: 25, tags: ['Light'] },
  { id: 'm16', name: 'Chole Bhature',              image: L.chole, price: 350, calories: 750, protein: 16, carbs: 90, fat: 35, category: 'Lunch', allergens: ['gluten','dairy'], cuisine: 'Punjabi',      rating: 4.9, isVeg: true,  prepTime: 50, tags: ['Cheat Meal','Heavy'] },
  { id: 'm17', name: 'Veg Biryani with Raita',     image: L.biryani, price: 270, calories: 550, protein: 12, carbs: 75, fat: 20, category: 'Lunch', allergens: ['dairy','nuts'],   cuisine: 'Mughlai',      rating: 4.6, isVeg: true,  prepTime: 45, tags: ['Festive'] },
  { id: 'm18', name: 'Baingan Bharta & Bajra Roti',image: L.baingan, price: 200, calories: 380, protein: 11, carbs: 55, fat: 12, category: 'Lunch', allergens: [],                 cuisine: 'Punjabi',      rating: 4.3, isVeg: true,  prepTime: 35, tags: ['Winter Special','Healthy'] },
  { id: 'm19', name: 'Fish Curry & Rice',          image: L.fish_curry, price: 240, calories: 480, protein: 28, carbs: 60, fat: 15, category: 'Lunch', allergens: ['fish'],           cuisine: 'Bengali',      rating: 4.5, isVeg: false, prepTime: 40, tags: ['Omega 3'] },
  { id: 'm20', name: 'Mix Veg Kadai & Naan',       image: L.mix_veg, price: 260, calories: 520, protein: 14, carbs: 65, fat: 22, category: 'Lunch', allergens: ['gluten','dairy'], cuisine: 'North Indian', rating: 4.4, isVeg: true,  prepTime: 35, tags: ['Classic'] },

  // ─── Dinner ─────────────────────────────────────────────────────────────
  { id: 'm21', name: 'Light Khichdi with Kadhi',   image: L.khichdi, price: 190, calories: 350, protein: 12, carbs: 55, fat: 8,  category: 'Dinner', allergens: ['dairy'],          cuisine: 'Gujarati',     rating: 4.8, isVeg: true,  prepTime: 25, tags: ['Light','Digestion Friendly'] },
  { id: 'm22', name: 'Dal Makhani & Jeera Rice',   image: L.dal_makhani, price: 310, calories: 650, protein: 18, carbs: 70, fat: 32, category: 'Dinner', allergens: ['dairy'],          cuisine: 'Punjabi',      rating: 4.9, isVeg: true,  prepTime: 120,tags: ['Heavy','Rich'] },
  { id: 'm23', name: 'Soya Chaap Masala & Roti',   image: L.soya_chaap, price: 230, calories: 450, protein: 25, carbs: 40, fat: 18, category: 'Dinner', allergens: ['gluten','soy'],   cuisine: 'North Indian', rating: 4.5, isVeg: true,  prepTime: 35, tags: ['High Protein'] },
  { id: 'm24', name: 'Paneer Tikka Masala',        image: L.paneer_tikka, price: 270, calories: 550, protein: 20, carbs: 35, fat: 35, category: 'Dinner', allergens: ['dairy'],          cuisine: 'North Indian', rating: 4.8, isVeg: true,  prepTime: 45, tags: ['Rich'] },
  { id: 'm25', name: 'Mushroom Do Pyaza & Roti',   image: L.mushroom, price: 200, calories: 380, protein: 12, carbs: 45, fat: 16, category: 'Dinner', allergens: ['gluten'],         cuisine: 'North Indian', rating: 4.3, isVeg: true,  prepTime: 30, tags: ['Light'] },
  { id: 'm26', name: 'Egg Curry & Rice',           image: L.egg_curry, price: 230, calories: 450, protein: 22, carbs: 50, fat: 18, category: 'Dinner', allergens: ['egg'],            cuisine: 'Indian',       rating: 4.6, isVeg: false, prepTime: 30, tags: ['High Protein'] },
  { id: 'm27', name: 'Gobi Aloo & Paratha',        image: L.gobi_aloo, price: 220, calories: 420, protein: 10, carbs: 60, fat: 16, category: 'Dinner', allergens: ['gluten'],         cuisine: 'North Indian', rating: 4.2, isVeg: true,  prepTime: 30, tags: ['Homestyle'] },
  { id: 'm28', name: 'Chicken Tikka & Naan',       image: L.chicken_tikka, price: 280, calories: 580, protein: 32, carbs: 45, fat: 22, category: 'Dinner', allergens: ['gluten','dairy'], cuisine: 'Punjabi',      rating: 4.9, isVeg: false, prepTime: 40, tags: ['High Protein'] },
  { id: 'm29', name: 'Lauki Kofta & Roti',         image: L.lauki_kofta, price: 210, calories: 390, protein: 12, carbs: 48, fat: 15, category: 'Dinner', allergens: ['gluten','dairy'], cuisine: 'North Indian', rating: 4.1, isVeg: true,  prepTime: 40, tags: ['Healthy'] },
  { id: 'm30', name: 'Matar Paneer & Jeera Rice',  image: L.matar_paneer, price: 260, calories: 520, protein: 18, carbs: 65, fat: 22, category: 'Dinner', allergens: ['dairy'],          cuisine: 'North Indian', rating: 4.6, isVeg: true,  prepTime: 35, tags: ['Classic'] },

  // ─── Salad & Extra ──────────────────────────────────────────────────────
  { id: 'm31', name: 'Kachumber Salad',      image: L.salad, price: 80, calories: 80,  protein: 2, carbs: 15, fat: 1, category: 'Salad', allergens: [],        cuisine: 'Indian',       rating: 4.5, isVeg: true, prepTime: 10, tags: ['Low Calorie','Raw'] },
  { id: 'm32', name: 'Sprouted Moong Salad', image: L.sprouted, price: 110, calories: 150, protein: 10,carbs: 25, fat: 2, category: 'Salad', allergens: [],        cuisine: 'Indian',       rating: 4.7, isVeg: true, prepTime: 15, tags: ['High Protein','Healthy'] },
  { id: 'm33', name: 'Boondi Raita',         image: L.raita, price: 100, calories: 120, protein: 5, carbs: 12, fat: 6, category: 'Extra', allergens: ['dairy'], cuisine: 'North Indian', rating: 4.4, isVeg: true, prepTime: 5,  tags: ['Cooling'] },
  { id: 'm34', name: 'Roasted Papad',        image: L.papad, price: 80, calories: 40,  protein: 2, carbs: 8,  fat: 0, category: 'Extra', allergens: [],        cuisine: 'Indian',       rating: 4.2, isVeg: true, prepTime: 2,  tags: ['Crunchy'] },

  // ─── Desserts ───────────────────────────────────────────────────────────
  { id: 'm35', name: 'Gulab Jamun (2 pcs)', image: L.gulab_jamun, price: 170, calories: 300, protein: 4, carbs: 50, fat: 10, category: 'Dessert', allergens: ['dairy','gluten'], cuisine: 'Indian',       rating: 4.9, isVeg: true, prepTime: 0, tags: ['Sweet','Rich'] },
  { id: 'm36', name: 'Rice Kheer',          image: L.kheer, price: 150, calories: 250, protein: 6, carbs: 35, fat: 8,  category: 'Dessert', allergens: ['dairy','nuts'],   cuisine: 'Indian',       rating: 4.6, isVeg: true, prepTime: 0, tags: ['Comfort Food'] },
  { id: 'm37', name: 'Gajar Halwa',         image: L.gajar_halwa, price: 180, calories: 320, protein: 5, carbs: 40, fat: 15, category: 'Dessert', allergens: ['dairy','nuts'],   cuisine: 'North Indian', rating: 4.8, isVeg: true, prepTime: 0, tags: ['Winter Special'] },
  { id: 'm38', name: 'Rasgulla (2 pcs)',    image: L.rasgulla, price: 140, calories: 220, protein: 6, carbs: 45, fat: 2,  category: 'Dessert', allergens: ['dairy'],          cuisine: 'Bengali',      rating: 4.7, isVeg: true, prepTime: 0, tags: ['Light Sweet'] },
  { id: 'm39', name: 'Moong Dal Halwa',     image: L.moong_halwa, price: 200, calories: 380, protein: 8, carbs: 45, fat: 20, category: 'Dessert', allergens: ['dairy','nuts'],   cuisine: 'North Indian', rating: 4.8, isVeg: true, prepTime: 0, tags: ['Rich'] },
  { id: 'm40', name: 'Fruit Custard',       image: L.custard, price: 120, calories: 180, protein: 4, carbs: 30, fat: 5,  category: 'Dessert', allergens: ['dairy'],          cuisine: 'Modern Indian',rating: 4.5, isVeg: true, prepTime: 0, tags: ['Fruity'] },
];

export const SUBSCRIPTION_PLANS = [
  { id: 'p1', name: 'Basic',   price: 999,  mealsPerDay: 1, deliveryDays: 5, popular: false, features: ['1 Meal/Day (Mon–Fri)', 'Standard Delivery', 'Basic Customization', 'No Weekend Delivery'] },
  { id: 'p2', name: 'Pro',     price: 1499, mealsPerDay: 2, deliveryDays: 6, popular: true,  features: ['2 Meals/Day (Mon–Sat)', 'Priority Delivery', 'Full Meal Swapping', 'Free Weekend Dessert'] },
  { id: 'p3', name: 'Premium', price: 2199, mealsPerDay: 3, deliveryDays: 7, popular: false, features: ['All 3 Meals (Mon–Sun)', 'Premium Packaging', 'Unlimited Swaps', 'Nutritionist Consult'] },
];

export const MOCK_USERS = Array.from({ length: 15 }, (_, i) => ({
  id: `u${i + 1}`, name: `User ${i + 1}`, email: `user${i + 1}@example.com`,
  plan: i % 3 === 0 ? 'Premium' : i % 2 === 0 ? 'Pro' : 'Basic',
  status: i % 5 === 0 ? 'Paused' : 'Active',
  joinDate: new Date(2023, i % 12, (i * 2) + 1).toISOString(),
  role: i === 0 ? 'admin' : 'user',
}));

export const DEFAULT_WEEK_PLAN = {
  mon: { breakfast: 'm3',  lunch: 'm11', dinner: 'm21' },
  tue: { breakfast: 'm4',  lunch: 'm12', dinner: 'm22' },
  wed: { breakfast: 'm1',  lunch: 'm13', dinner: 'm24' },
  thu: { breakfast: 'm5',  lunch: 'm14', dinner: 'm26' },
  fri: { breakfast: 'm7',  lunch: 'm16', dinner: 'm28' },
  sat: { breakfast: 'm2',  lunch: 'm17', dinner: 'm30' },
  sun: { breakfast: 'm6',  lunch: 'm20', dinner: 'm29' },
};

export const MOCK_TESTIMONIALS = [
  { id: 1, name: 'Rahul Sharma',  city: 'Mumbai',    rating: 5, text: 'Finally a tiffin service that lets me skip bhindi! Quality is amazing.', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 2, name: 'Priya Patel',   city: 'Pune',      rating: 4, text: 'Love the drag-and-drop meal planner. Saves me so much headache every Sunday.', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 3, name: 'Amit Kumar',    city: 'Delhi',     rating: 5, text: 'Food tastes just like home. Highly recommend the Pro plan!', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: 4, name: 'Sneha Gupta',   city: 'Bangalore', rating: 5, text: 'No more boring office lunches. MealNova is a game-changer!', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: 5, name: 'Vikram Singh',  city: 'Hyderabad', rating: 4, text: 'Great packaging and always on time. Fresh and hot every day.', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
];

export const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Delivery Updated', message: 'Your lunch will arrive 10 mins early today.', time: '2 hours ago', read: false },
  { id: 2, title: 'Plan Renewed',     message: 'Your Pro plan has been successfully renewed.', time: '1 day ago',   read: true },
  { id: 3, title: 'New Menu Alert',   message: 'We added 5 new winter special dishes!',        time: '2 days ago',  read: true },
  { id: 4, title: 'Meal Swapped',     message: 'Dal Makhani swapped with Paneer Tikka.',       time: '3 days ago',  read: true },
];

export const MOCK_DELIVERIES = [
  { id: 'd1', date: 'Today',    type: 'Lunch',     meal: 'Homestyle Dal Tadka & Rice', status: 'Out for Delivery', time: '1:00 PM' },
  { id: 'd2', date: 'Today',    type: 'Dinner',    meal: 'Light Khichdi with Kadhi',   status: 'Scheduled',        time: '8:00 PM' },
  { id: 'd3', date: 'Tomorrow', type: 'Breakfast', meal: 'Kanda Poha',                 status: 'Scheduled',        time: '8:30 AM' },
  { id: 'd4', date: 'Tomorrow', type: 'Lunch',     meal: 'Rajma Chawal',               status: 'Scheduled',        time: '1:00 PM' },
];
