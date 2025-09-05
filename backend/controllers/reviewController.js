
import reviewConnection from "../config/reviewDb.js";
import { getReviewModel } from "../models/reviewModel.js";
import userModel from "../models/userModel.js"; // main DB

// -------------------------
// Create Review
// -------------------------
export const createReview = async (req, res) => {
  try {
    const { productId, userId, rating, comment } = req.body;

    if (!productId || !userId || !rating) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Ensure Review model is bound to a ready connection
    const Review = getReviewModel(reviewConnection);

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
// Get Reviews by Product
// -------------------------
export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    console.log("🔎 Fetching reviews for product:", productId);

    if (!reviewConnection.readyState) {
      console.error("❌ Review DB is NOT connected. State:", reviewConnection.readyState);
    } else {
      console.log("✅ Review DB connected. State:", reviewConnection.readyState);
    }

    // ✅ Ensure Review model is created when connection is ready
    const Review = getReviewModel(reviewConnection);

    // Fetch reviews
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    console.log("✅ Reviews fetched:", reviews.length);

    // Fetch users from main DB
    const userIds = reviews.map(r => r.userId);
    const users = await userModel.find({ _id: { $in: userIds } }).select("name email");
    console.log("✅ Users fetched:", users.length);

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
    console.error("❌ Error fetching reviews:", error.message);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};
