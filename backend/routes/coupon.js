// import express from 'express';
// import Coupon from '../models/Coupon.js';

// const router = express.Router();

// // GET all coupons
// router.get('/', async (req, res) => {
//   try {
//     const coupons = await Coupon.find().sort({ createdAt: -1 });
//     res.json(coupons);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // POST create a new coupon
// router.post('/', async (req, res) => {
//   try {
//     const {
//       code,
//       discount_type,
//       discount_value,
//       min_order_amount,
//       expiry_date,
//     } = req.body;

//     const coupon = new Coupon({
//       code: code.toUpperCase(),
//       discount_type,
//       discount_value,
//       min_order: min_order_amount,
//       expires_at: expiry_date,
//       is_active: true,
//       usage_limit: 9999, // default usage limit
//       times_used: 0,
//     });

//     await coupon.save();
//     res.status(201).json({ success: true, message: 'Coupon created', coupon });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // DELETE coupon by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Coupon.findByIdAndDelete(id);
//     res.json({ success: true, message: 'Coupon deleted' });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // GET /api/coupon/validate?code=SAVE20&orderAmount=600
// router.get('/validate', async (req, res) => {
//   try {
//     const { code, orderAmount } = req.query;

//     if (!code || !orderAmount) {
//       return res.status(400).json({ error: 'Coupon code and order amount required' });
//     }

//     const coupon = await Coupon.findOne({ code: code.toUpperCase(), is_active: true });

//     if (!coupon) return res.status(400).json({ error: 'Coupon not found' });

//     if (new Date(coupon.expires_at) < new Date()) {
//       return res.status(400).json({ error: 'Coupon expired' });
//     }

//     if (coupon.times_used >= coupon.usage_limit) {
//       return res.status(400).json({ error: 'Coupon usage limit reached' });
//     }

//     if (Number(orderAmount) < coupon.min_order) {
//       return res.status(400).json({ error: `Minimum order amount is ₹${coupon.min_order}` });
//     }

//     res.json({ coupon });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// export default router;
