
import mongoose from "mongoose";
import {Place,nearbyplace} from "../Models/place.model.js";
export const NearbyPlace = async (req, res) => {
    try {
      const { place_id, nearbyplace_id, distance_km } = req.body;
        const placeExists = await Place.findById(place_id);
      const nearbyPlaceExists = await Place.findById(nearbyplace_id);
  
      if (!placeExists || !nearbyPlaceExists) {
        return res.status(404).json({ message: 'One or both places not found' });
      }
  
      const newNearbyPlace = new nearbyplace({ place_id, nearbyplace_id, distance_km });
      await newNearbyPlace.save();
  
      res.status(201).json({ message: 'Nearby place added successfully', data: newNearbyPlace });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  


  export const getListNearByPlaces = async (req, res) => {
    try {
      const nearByPlace = await nearbyplace.find();
      res.json(nearByPlace);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



export const getNearbyPlaces = async (req, res) => {
  try {
    const { place_id } = req.params;

    const nearbyPlaces = await nearbyplace
      .find({ place_id })
      .populate([
        { path: "nearbyplace_id", populate: { path: "image_id" } }, // Populate image_id inside nearbyplace_id
          ]);

    res.status(200).json({ data: nearbyPlaces });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const nearByPlaceById = async (req, res) => {
  
  try {
    const id = req.params.id;

    const palace = await nearbyplace.findById(id);
    // .populate([{ path: 'place_id'},{ path: 'nearbyplace_id'}]);
    res.status(200).json(palace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const updateNearByplaceData = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedNearByPlaceData = await nearbyplace.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedNearByPlaceData) {
      return res.status(404).json({ message: "NearByplaceData not found" });
    }

    res.status(200).json({ data: updatedNearByPlaceData }); // Ensure the response has a `data` key
  } catch (err) {
    res.status(400).json({ message: err.message }); // Fix incorrect error message handling
  }
};


export const deletenearByPlaceById = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID Format" });
  }

  try {
    const nearbypalace = await nearbyplace.findByIdAndDelete(id);

    if (!nearbypalace) {
      return res.status(404).json({ message: "nearbypalace not found" });
    }

    res.status(200).json({ message: "nearbypalace deleted sucessfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};