import axios from "axios";

const payload = {
  companyName: "Train Agency",
  clientID: "a3826a5d-d4cb-4c4c-8889-dcf6f88d8bfb",
  clientSecret: "pWeUtPasreIPHFsG", //I am not using .env as it needs to screened by the hiring team
  ownerName: "My Name",
  ownerEmail: "124003153@sastra.ac.in",
  rollNo: "124003153",
};
let auth_token = "";
async function getToken(payload) {
  try {
    const resp = await axios.post("http://20.244.56.144/train/auth", payload);
    const tok = resp.data.access_token;
    return tok;
  } catch (error) {
    console.error("Error generatin tok:", error);
    throw error;
  }
}

export { getToken };
