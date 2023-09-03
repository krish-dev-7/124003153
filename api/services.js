import axios from "axios";
import { getToken } from "./auth.js";

async function fetchTrains() {
  const AUTH_TOKEN = await getToken();
  try {
    const headers = {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    };
    const res = await axios.get("http://20.244.56.144/train/trains", {
      headers,
    });
    const trains = res.data;
    return trains;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
function sortTrains(trains_data) {
  function customSort(a, b) {
    const priceComp = a.price.AC - b.price.AC;
    if (priceComp !== 0) {
      return priceComp;
    }
    const seatsAvailableComp = b.seatsAvailable.AC - a.seatsAvailable.AC;
    if (seatsAvailableComp !== 0) {
      return seatsAvailableComp;
    }
    const departureTimeA = a.departureTime.Hours * 60 + a.departureTime.Minutes;
    const departureTimeB = b.departureTime.Hours * 60 + b.departureTime.Minutes;
    return departureTimeB - departureTimeA;
  }
  for (let i = 0; i < trains_data.length - 1; i++) {
    for (let j = 0; j < trains_data.length - i - 1; j++) {
      if (customSort(trains_data[j], trains_data[j + 1]) > 0) {
        const temp = trains_data[j];
        trains_data[j] = trains_data[j + 1];
        trains_data[j + 1] = temp;
      }
    }
  }
  const sortedTrains = [];
  for (const train of trains_data) {
    if (train.departureTime.Minutes > 30) {
      sortedTrains.push(train);
    }
  }

  return sortedTrains;
}

export { fetchTrains, sortTrains };
