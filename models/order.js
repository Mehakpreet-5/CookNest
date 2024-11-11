const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  cartItems: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: String, required: true }, // Or use Number if applicable
  }],
  address: {
    name: { type: String, required: true },
   email: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true },
  totalAmount: { type: String, required: true }, // Or use Number if applicable
  // cardDetails: { type: Object }, // Optional field for card details if needed
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
