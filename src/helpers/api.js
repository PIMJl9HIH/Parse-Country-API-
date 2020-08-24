import axios from "axios";

const ROOT_URL = "https://restcountries.eu/rest/v2/";

// data sources
const REGION = `${ROOT_URL}region/`;

export function GET_REGION(name) {
  return axios.get(`${REGION}${name}`);
}
