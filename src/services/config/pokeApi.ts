import axios, { AxiosInstance } from "axios";

const pokeApiInstance: AxiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  headers: {
    "Content-Type": "application/json",
  },
});

export default pokeApiInstance;
