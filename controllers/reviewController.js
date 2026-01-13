import productModel from "../models/product.model.js";
import userModel from "../models/user.model.js";

// Add a review
const addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.body.userId; // From auth middleware

        console.log('Adding review:', { productId, userId, rating, comment });

        // Get user name
        const user = await userModel.findById(userId);
        if (!user) {
            console.log('User not found:', userId);
            return res.json({ success: false, message: "User not found" });
        }

        // Get product
        const product = await productModel.findById(productId);
        if (!product) {
            console.log('Product not found:', productId);
            return res.json({ success: false, message: "Product not found" });
        }

        // Check if user already reviewed this product
        const existingReview = product.reviews.find(review => review.userId.toString() === userId);
        if (existingReview) {
            console.log('User already reviewed this product');
            return res.json({ success: false, message: "You have already reviewed this product" });
        }

        // Add review to product
        product.reviews.push({
            userId,
            userName: user.name,
            rating: Number(rating),
            comment,
            createdAt: new Date()
        });

        await product.save();
        console.log('Review saved successfully. Total reviews:', product.reviews.length);

        res.json({ success: true, message: "Review added successfully" });
    } catch (error) {
        console.log('Error adding review:', error);
        res.json({ success: false, message: error.message });
    }
};

// Get all reviews for a product
const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.body;
        
        console.log('Getting reviews for product:', productId);

        const product = await productModel.findById(productId);
        if (!product) {
            console.log('Product not found:', productId);
            return res.json({ success: false, message: "Product not found" });
        }

        console.log('Product found, reviews count:', product.reviews ? product.reviews.length : 0);

        const reviews = product.reviews ? product.reviews.sort((a, b) => b.createdAt - a.createdAt) : [];

        // Calculate average rating
        let averageRating = 0;
        if (reviews.length > 0) {
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            averageRating = (totalRating / reviews.length).toFixed(1);
        }

        console.log('Sending response:', { totalReviews: reviews.length, averageRating });

        res.json({ 
            success: true, 
            reviews, 
            averageRating: Number(averageRating),
            totalReviews: reviews.length 
        });
    } catch (error) {
        console.log('Error getting reviews:', error);
        res.json({ success: false, message: error.message });
    }
};

// Delete a review (user can only delete their own)
const deleteReview = async (req, res) => {
    try {
        const { reviewId, productId } = req.body;
        const userId = req.body.userId; // From auth middleware

        const product = await productModel.findById(productId);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        const reviewIndex = product.reviews.findIndex(review => review._id.toString() === reviewId);
        if (reviewIndex === -1) {
            return res.json({ success: false, message: "Review not found" });
        }

        // Check if user owns the review
        if (product.reviews[reviewIndex].userId.toString() !== userId) {
            return res.json({ success: false, message: "Unauthorized to delete this review" });
        }

        product.reviews.splice(reviewIndex, 1);
        await product.save();

        res.json({ success: true, message: "Review deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addReview, getProductReviews, deleteReview };
