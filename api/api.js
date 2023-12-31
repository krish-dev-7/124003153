import cors from "cors";
import express from "express";
import axios from "axios";
import { Router } from "express";
import { getToken } from "./auth.js";
import { fetchTrains, sortTrains } from "./services.js";

const router = Router();
router.use(cors());

router.get("/", async (req, res) => {
  try {
    const trains = await fetchTrains();
    const sortedTrains = sortTrains(trains);
    res.json(sortedTrains);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});
router.get("/getTrain/:trainId", async (req, res) => {
  try {
    const train_num = req.params.trainId;
    const AUTH_TKN = await getToken();

    const headers = {
      Authorization: `Bearer ${AUTH_TKN}`,
    };

    const train_data = await axios.get(
      `http://20.244.56.144/train/trains/${train_num}`,
      { headers }
    );
    res.json(train_data.data);
  } catch (error) {
    console.error("Unable to fetch data", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
