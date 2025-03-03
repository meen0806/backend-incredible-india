import mongoose from "mongoose";

const NearbyTransportSchema = new mongoose.Schema(
  {
    location_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'locations',
      required: true,
    },
    transport_type: {
      type: String,
     required: true,
    },
    transport_name: {
      type: String,
      required: true,
    },
   
  },
  { timestamps: true }
);

const locationTransport = mongoose.model('LocationTransport', NearbyTransportSchema);
export default locationTransport;