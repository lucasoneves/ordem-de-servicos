import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number
  }
}, {
  versionKey: false
});

const order = mongoose.model('orders', orderSchema);

export default order;