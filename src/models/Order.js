import mongoose, { mongo } from "mongoose";
import autopopulate from "mongoose-autopopulate";

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
    status: {
      type: String,
      enum: ['pendente', 'em andamento', 'concluída', 'cancelada'],
      default: 'pendente',
      required: true
    },
    description: {
      type: String,
      required: false
    },
    price: {
      type: Number,
      min: [1, "O valor mínimo está incorreto"],
      required: [true, "O campo preço é obrigatório"]
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customers',
      required: true,
      autopopulate: true
    },
    technician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'technicians',
      required: true,
      autopopulate: true
    }
  },
  {
    versionKey: false,
  }
);

orderSchema.plugin(autopopulate)

const order = mongoose.model("orders", orderSchema);

export default order;
