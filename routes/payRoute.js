
// const express = require('express')
// const router = express.Router();
// const Payment = require('../models/order'); 
// router.post('/payment', async (req, res) => {
//   try {
//     console.log("Payment endpoint hit");
//     // console.log("Request body:", req.body); // Log the incoming request body

//     const { cartItems, address, paymentMethod, totalAmount, cardDetails } = req.body;

//     // Check if required fields are missing
//     if (!cartItems || !address || !paymentMethod || !totalAmount) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Create a new payment document
//     const newPayment = new Payment({
//       cartItems,
//       address,
//       paymentMethod,
//       totalAmount,
//       // Uncomment the next line if you want to save cardDetails
//       // cardDetails: paymentMethod === 'Card' ? cardDetails : undefined
//     });

//     // Save the payment to the database
//     const savedPayment = await newPayment.save();

//     res.status(201).json({
//       message: 'Payment processed successfully',
//       paymentId: savedPayment._id
//     });
//   } catch (error) {
//     console.error("Error processing payment:", error); // Log the error details
//     res.status(500).json({ message: 'Error processing payment', error: error.message });
//   }
// });


// // DELETE order by ID
// router.delete('/order/:id', async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     await Payment.findByIdAndDelete(orderId);
//     res.status(200).json({ message: 'Order deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting order:', error);
//     res.status(500).json({ message: 'Error deleting order', error: error.message });
//   }
// });

// // PUT to update order
// router.put('/order/:id', async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     const updatedOrder = await Payment.findByIdAndUpdate(orderId, req.body, { new: true });
//     res.status(200).json({ message: 'Order updated successfully', updatedOrder });
//   } catch (error) {
//     console.error('Error updating order:', error);
//     res.status(500).json({ message: 'Error updating order', error: error.message });
//   }
// });


// module.exports = router;

const express = require('express');
const router = express.Router();
const Payment = require('../models/order'); 

// POST /payment (Process Payment)
router.post('/payment', async (req, res) => {
  try {
    console.log("Payment endpoint hit");

    const { cartItems, address, paymentMethod, totalAmount, cardDetails } = req.body;

    // Validate required fields
    if (!cartItems || !address || !paymentMethod || !totalAmount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new payment document
    const newPayment = new Payment({
      cartItems,
      address,
      paymentMethod,
      totalAmount,
      // If the payment is by card, optionally store cardDetails
      cardDetails: paymentMethod === 'Card' ? cardDetails : undefined
    });

    // Save the payment to the database
    const savedPayment = await newPayment.save();

    res.status(201).json({
      message: 'Payment processed successfully',
      paymentId: savedPayment._id
    });
  } catch (error) {
    console.error("Error processing payment:", error); // Log the error details
    res.status(500).json({ message: 'Error processing payment', error: error.message });
  }
});

module.exports = router;
