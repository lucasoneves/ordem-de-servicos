import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    },
    title: {
      type: String,
      required: [true, "O título da ordem de serviço é obrigatório"],
    },
    price: {
      type: Number,
      min: [1, "O valor mínimo está incorreto"],
      required: [true, "O campo preço é obrigatório"]
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customers',
      required: true
    },
    technician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'technicians',
      required: true
    }
  },
  {
    versionKey: false,
  }
);

const order = mongoose.model("orders", orderSchema);

export default order;
