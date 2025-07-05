// backend/models/Coupon.js
import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  discount_type: { type: String, enum: ['percentage', 'flat'], required: true },
  discount_value: { type: Number, required: true },
  min_order: { type: Number, required: true },
  expires_at: { type: Date, required: true },
  usage_limit: { type: Number, required: true },
  times_used: { type: Number, default: 0 },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;
