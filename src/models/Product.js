import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema({
  capacity: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 0 },
  available: { type: Boolean, default: true },
});

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tag: { type: String },
    available: { type: Boolean, default: true },
    variants: [VariantSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
