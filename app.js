  import express from "express";
  import dotenv from "dotenv";
  import cors from "cors";
  import { connectDB } from "./DB/db.js";
  import locationRoutes from "./Routes/locationRoutes.js";
  import categoryRoutes from "./Routes/categoryRoutes.js";
  import placeRoutes from "./Routes/placesRoutes.js";
  import transportRoutes from "./Routes/transportRoutes.js";
  import locationTransportRoutes from "./Routes/LocationTransportRoutes.js";
  import imageUploadRoutes from "./Routes/imageUploadRoutes.js"
  import SearchRouter from "./Routes/SearchRoutes.js";

  import multer from "multer";

  dotenv.config();


  const app = express();
  app.use(cors()); 

  const upload =  multer();
 
  app.use(cors({ origin: "http://localhost:3000" }));


  app.use("/uploads", express.static("uploads"));


  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const PORT = process.env.PORT;
  connectDB();

  app.use(express.json());
  app.use(cors());

  app.use("/ckeditor",imageUploadRoutes);
  app.use("/locations", locationRoutes);
  app.use("/categories", upload.none(), categoryRoutes);
  app.use("/places", placeRoutes);
  app.use("/transport", upload.none(), transportRoutes);
  app.use("/locationtransport", upload.none(), locationTransportRoutes);
  app.use("/search",SearchRouter);


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
