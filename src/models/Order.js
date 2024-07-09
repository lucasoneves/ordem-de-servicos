import mongoose, { mongo } from "mongoose";
import { customerSchema } from "./Customer.js";

const orderSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    title: {
      type: String,
      required: true,
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
