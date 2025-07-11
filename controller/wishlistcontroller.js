const wishlistmodel = require('../model/wishlistmodel')
const mongoose = require('mongoose')

const addwishlist = async (req, res) => {

  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ status: false, data: { message: 'null' } });
    }
    const userId = req.user._id;
    const exists = await wishlistmodel.findOne({ user: userId, product: productId });
    if (exists) {
      return res.status(400).json({ status: false, data: { message: 'Product already added' } });
    }
    const item = new wishlistmodel({ user: userId, product: productId });
    await item.save();
    return res.status(200).json({ status: true, data: { message: "product wishlisted successfully" } })
  } catch (error) {

    return res.status(500).json({ status: false, data: { message: 'Internal server error' } });
  }
}
const getwishlist = async (req, res) => {
  const userId = req.user._id;
  if (!userId)
    return res.status(400).json({ status: false, message: 'User ID is null' });
  const wishlist = await wishlistmodel.find({ user: userId }).populate('product');
  return res.status(200).json({ status: true, data: { message: "fetched product successfully", data: wishlist } });
}

const removewishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;
    if (!userId) {
      return res.status(400).json({ status: false, message: 'User  ID is null' });
    }
    // Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ status: false, message: 'Invalid product ID' });
    }
    const productObjectId = new mongoose.Types.ObjectId(productId);
    // Use findOneAndDelete
    const deletedItem = await wishlistmodel.deleteOne({
      user: userId,
      product: productObjectId
    });
    if (!deletedItem) {
      return res.status(404).json({
        status: false,
        message: 'Product not found in wishlist'
      });
    }
    return res.status(200).json({
      status: true,
      data: { message: 'Item deleted successfully' }
    });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return res.status(500).json({ status: false, message: 'Server error', error });
  }
};

module.exports = { addwishlist, removewishlist, getwishlist };