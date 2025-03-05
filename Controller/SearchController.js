import Location from "../Models/location.model.js";
import { Place } from "../Models/place.model.js";
import mongoose from "mongoose"; 

export const SearchAll = async (req, res) => {
  try {
    const { query } = req.query; 

    
    if (!query || query.trim() === "") {
      return res.status(400).json({ success: false, message: "Query parameter is required" });
    }

    // console.log(" Search Query:", query);

    
    const searchRegex = new RegExp("^" + query, "i"); 

    
    const places = await Place.find({ name: searchRegex })
      .select("_id name location_id")
      .populate("location_id", "name")
      .lean();

    
    const locations = await Location.find({ name: searchRegex })
      .select("_id name parent_id").populate("parent_id")
      .lean();


    
    const results = [
      ...places.map((place) => ({
        id: place._id,
        name: place.name,
        parent_id: place.location_id ? place.location_id._id : null, 
        location_name: place.location_id ? place.location_id.name : null, 
        type: "place",
      })),
      ...locations.map((location) => ({
        id: location._id,
        name: location.name,
        parent_id: location.parent_id, 
        type: "location",
      }))
    ];

    

    return res.status(200).json({ success: true, data: results });
  
  } catch (error) {
    console.error(" Search Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
