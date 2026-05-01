// src/utils/constants.js
export const MEALS = [
  { id:1, name:"Kanda Poha", category:"Breakfast", price:150, cal:250, protein:5, cuisine:"Maharashtrian", time:15, rating:4.5, veg:true },
  { id:2, name:"Masala Upma", category:"Breakfast", price:160, cal:280, protein:6, cuisine:"South Indian", time:20, rating:4.2, veg:true },
  { id:3, name:"Aloo Paratha with Curd", category:"Breakfast", price:230, cal:450, protein:12, cuisine:"North Indian", time:25, rating:4.8, veg:true },
  { id:4, name:"Idli Sambar", category:"Breakfast", price:170, cal:300, protein:10, cuisine:"South Indian", time:15, rating:4.6, veg:true },
  { id:5, name:"Puri Bhaji", category:"Lunch", price:180, cal:380, protein:8, cuisine:"Maharashtrian", time:30, rating:4.3, veg:true },
  { id:6, name:"Methi Thepla", category:"Lunch", price:140, cal:220, protein:7, cuisine:"Gujarati", time:20, rating:4.4, veg:true },
  { id:7, name:"Paneer Bhurji Pav", category:"Lunch", price:200, cal:420, protein:18, cuisine:"North Indian", time:20, rating:4.7, veg:true },
  { id:8, name:"Oats Chilla", category:"Breakfast", price:130, cal:180, protein:9, cuisine:"Healthy", time:15, rating:4.1, veg:true },
  { id:9, name:"Dal Tadka Rice", category:"Lunch", price:190, cal:490, protein:15, cuisine:"North Indian", time:25, rating:4.5, veg:true },
  { id:10, name:"Veg Biryani", category:"Dinner", price:250, cal:520, protein:14, cuisine:"Hyderabadi", time:35, rating:4.9, veg:true },
  { id:11, name:"Palak Paneer Roti", category:"Dinner", price:220, cal:410, protein:20, cuisine:"North Indian", time:30, rating:4.6, veg:true },
  { id:12, name:"Fruit Custard", category:"Dessert", price:100, cal:200, protein:5, cuisine:"Indian", time:10, rating:4.3, veg:true }
];

export const SUBSCRIPTION_PLANS = [
  { id:"daily",   label:"Daily",   pricePerDay:89,  minDays:5,  saving:null,  tag:null,           total:null },
  { id:"three",   label:"3-Day",   pricePerDay:79,  minDays:3,  saving:"11%", tag:null,           total:237 },
  { id:"weekly",  label:"Weekly",  pricePerDay:69,  minDays:7,  saving:"22%", tag:"Most Popular", total:483 },
  { id:"monthly", label:"Monthly", pricePerDay:59,  minDays:30, saving:"34%", tag:null,           total:1770 }
];

export const DELIVERY_SLOTS = ["Morning 8–10 AM", "Afternoon 12–2 PM", "Evening 7–9 PM"];
export const GST_RATE = 0.05;
export const DELIVERY_CHARGE = 0;
