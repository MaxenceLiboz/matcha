import axios from "axios";

const IP_GEOLOCALISATION_KEY = process.env.REACT_APP_IP_GEOLOCALISATION_KEY;

if (!IP_GEOLOCALISATION_KEY) {
  throw new Error("Geolocalisation API key is not set");
}

const ipGeolocationAPI = axios.create({
  baseURL: `https://api.ipgeolocation.io/v2/ipgeo?apiKey=${IP_GEOLOCALISATION_KEY}`,
});

export default ipGeolocationAPI;
