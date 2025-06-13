import apiClient from "../../api/apiClient";
import ipGeolocationAPI from "../../api/ipGeolocalisationAPI";
import { FullProfileDTO, Tag, UpdateProfileResponse } from "./types";

export const createProfile = async (formData: FormData): Promise<UpdateProfileResponse> => {
  const response = await apiClient.post<UpdateProfileResponse>("/profile", formData, {
    headers: {
      "Content-Type": undefined,
    },
  });
  return response.data;
};

export const getLocalisation = async () : Promise<{city: string, latitude: number, longitude: number}> => {
  const reponse = await ipGeolocationAPI.get("");
  return reponse.data.location;
};

export const getTags = async (): Promise<Tag[]> => {
  const { data } = await apiClient.get<Tag[]>("/tags");
  return data;
};

export const getMyProfile = async (): Promise<FullProfileDTO> => {
  const { data } = await apiClient.get<FullProfileDTO>("/profile");
  return data;
};

export const getPictureBlob = async (ref: string): Promise<Blob> => {
  const response = await apiClient.get(`/picture/${ref}`, {
    responseType: "blob",
  });
  return response.data;
};
