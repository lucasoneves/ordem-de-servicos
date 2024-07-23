import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    title: {
      type: String,
      required: [true, "O título da ordem de serviço é obrigatório"],
    },
    price: {
      type: Number,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customers',
      required: true
    }
  },
  {
    versionKey: false,
  }
);

const order = mongoose.model("orders", orderSchema);

export default order;
