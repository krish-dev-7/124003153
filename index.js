import cors from "cors";
import express from "express";
import axios from "axios";
import api from "./api/api.js";

const app = express();
app.use(cors());

//
app.listen(8000, () => {
  console.log("Server is running on port http://localhost:8000");
});

app.use("/", api);
