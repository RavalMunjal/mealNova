import mongoose from 'mongoose';

const planSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  plan: {
    mon: { breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }, lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }, dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' } },
    tue: { breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }, lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }, dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' } },
    wed: { breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }, lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }, dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' } },
    thu: { breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }, lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }, dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' } },
    fri: { breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }, lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }, dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' } },
    sat: { breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }, lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }, dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' } },
    sun: { breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }, lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }, dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' } },
  }
}, { timestamps: true });

const Plan = mongoose.model('Plan', planSchema);
export default Plan;
