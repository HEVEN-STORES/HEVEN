
import reviewConnection from "../config/reviewDb.js";
import { getReviewModel } from "../models/reviewModel.js";
import userModel from "../models/userModel.js"; // main DB

// ✅ Create the Review model ONCE from the review DB connection
const Review = getReviewModel(reviewConnection);

// -------------------------
// Create Review
// -------------------------
// ✅ Create Review
export const createReview = async (req, res) => {
  try {
    const { productId, userId, rating, comment } = req.body;

    if (!productId || !userId || !rating) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Prevent duplicate review by same user
    const existing = await Review.findOne({ productId, userId });
    if (existing) {
      return res.status(400).json({ message: "You have already reviewed this product" });
    }

    // Save review in Review DB
    const newReview = new Review({ productId, userId, rating, comment });
    await newReview.save();

    // ✅ Fetch user details from main DB
    const user = await userModel.findById(userId).select("name email");

    res.status(201).json({
      message: "Review submitted",
      review: {
        ...newReview.toObject(),
        user: user ? { name: user.name, email: user.email } : null,
      },
    });
  } catch (error) {
    console.error("❌ Error creating review:", error);
    res.status(500).json({ message: "Failed to submit review" });
  }
};


// -------------------------
// Get Reviews
// -------------------------
// -------------------------
// Get Reviews with User Data
// -------------------------
// ✅ Get Reviews
export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Reviews from Review DB
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });

    // Fetch users from main DB
    const userIds = reviews.map(r => r.userId);
    const users = await userModel.find({ _id: { $in: userIds } }).select("name email");

    // Attach user info
    const reviewsWithUser = reviews.map(r => {
      const user = users.find(u => u._id.toString() === r.userId.toString());
      return {
        ...r.toObject(),
        user: user ? { name: user.name, email: user.email } : null,
      };
    });

    res.status(200).json(reviewsWithUser);
  } catch (error) {
    console.error("❌ Error fetching reviews:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};
