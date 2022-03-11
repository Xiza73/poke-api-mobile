import axios from "./config/pokeApi";
import { AxiosResponse } from "axios";
import { DataPokes, Pokemon } from "../utils/interfaces-types";

export const getPokes = async (
  limit: number,
  offset: number
): Promise<AxiosResponse<DataPokes> | undefined> => {
  try {
    let params = {
      limit,
      offset,
    };
    return await axios.get("pokemon", {
      params,
      paramsSerializer: function paramsSerializer(params) {
        // "Hide" the `answer` param
        return Object.entries(Object.assign({}, params, { answer: "HIDDEN" }))
          .map(([key, value]) => `${key}=${value}`)
          .join("&");
      },
    });
  } catch (_) {
    return;
  }
};

export const getPoke = async (
  name: string
): Promise<AxiosResponse<Pokemon> | undefined> => {
  if (!name) return;
  try {
    return await axios.get(`pokemon/${name}`);
  } catch (_) {
    return;
  }
};

export const getTypes = async (): Promise<
  AxiosResponse<{ results: { name: string }[] }> | undefined
> => {
  try {
    return await axios.get(`type`);
  } catch (_) {
    return;
  }
};
