import mongoose, { Types } from "mongoose";
import { IInventory } from "../interfaces/models/inventory.interface";
import Collections from "../interfaces/collections";

const InventorySchema = new mongoose.Schema<IInventory>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  images: { type: [{ type: String }], default: [] },
  videos: { type: [{ type: String }], default: [] },
  owner: { type: Types.ObjectId, ref: Collections.user, required: true },
});

const Inventory = mongoose.model(Collections.inventory, InventorySchema);

export default Inventory;