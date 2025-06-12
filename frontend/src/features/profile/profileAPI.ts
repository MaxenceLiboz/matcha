import apiClient from "../../api/apiClient";
import ipGeolocationAPI from "../../api/ipGeolocalisationAPI";
import { Tag, UpdateProfileResponse } from "./types";

export const createProfile = async (formData: FormData): Promise<UpdateProfileResponse> => {
  const response = await apiClient.post<UpdateProfileResponse>("/profile", formData, {
    headers: {
      "Content-Type": undefined,
    },
  });
  return response.data;
};

export const getLocalisation = async () => {
  const reponse = await ipGeolocationAPI.get("");
  return reponse.data;
};

export const getTags = async (): Promise<Tag[]> => {
  const { data } = await apiClient.get<Tag[]>("/tags");
  return data;
};
