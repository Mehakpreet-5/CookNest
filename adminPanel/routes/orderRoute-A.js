// const express = require('express');
// const router = express.Router();
// const Payment= require('../../models/order')

// router.get('/admin/order', async(req,res)=>{
//   try {
//     const order = await Payment.find();
//     res.json(order)
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// })


// // DELETE /order/:id (Delete Order by ID)
// router.delete('/admin/order/:id', async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     const deletedOrder = await Payment.findByIdAndDelete(orderId);

//     if (!deletedOrder) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     res.status(200).json({ message: 'Order deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting order:', error);
//     res.status(500).json({ message: 'Error deleting order', error: error.message });
//   }
// });

// // PUT /order/:id (Update Order by ID)
// // In your server code (e.g., routes/admin.js)
// router.put('/admin/order/:id', async (req, res) => {
//   const orderId = req.params.id;
//   const updatedData = req.body;

//   try {
//       const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedData, { new: true });
//       if (!updatedOrder) {
//           return res.status(404).json({ message: 'Order not found' });
//       }
//       res.json(updatedOrder);
//   } catch (error) {
//       console.error('Error updating order:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//   }
// });
// module.exports = router;

const express = require('express');
const router = express.Router();
const Payment = require('../../models/order'); // Ensure this points to the correct model

// GET all orders
router.get('/admin/order', async (req, res) => {
  try {
    const orders = await Payment.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE an order by ID
router.delete('/admin/order/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Payment.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
});

// PUT /admin/order/:id (Update Order by ID)
router.put('/admin/order/:id', async (req, res) => {
  const orderId = req.params.id;
  const { itemName, action } = req.body;

  try {
    const order = await Payment.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const item = order.cartItems.find(i => i.name === itemName);

    if (!item) {
      return res.status(404).json({ message: 'Item not found in order' });
    }

    switch (action) {
      case 'increase':
        item.quantity += 1;
        break;
      case 'decrease':
        if (item.quantity > 1) {
          item.quantity -= 1;
        }
        break;
      case 'cancel':
        order.cartItems = order.cartItems.filter(i => i.name !== itemName);
        break;
      default:
        return res.status(400).json({ message: 'Invalid action' });
    }

    // Recalculate total amount
    order.totalAmount = order.cartItems.reduce((total, currentItem) => {
      return total + (currentItem.price * currentItem.quantity);
    }, 0);

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = router;

