import mongoose from "mongoose";

const technicianSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId
  },
  createdAt: {
    type: mongoose.Schema.Types.Date
  },
  title: {
    type: String,
    required: [true, "O nome do(a) técnico(a) é obrigatório"],
    unique: true
  },
  contact: {
    email: {
      type: String,
      required: [true, "O email do(a) técnico(a) é obrigatório"],
      unique: true
    },
    phone: {
      type: String,
      required: true
    }
  }
}, { versionKey: false})

const technician = mongoose.model('technicians', technicianSchema)

export default technician;