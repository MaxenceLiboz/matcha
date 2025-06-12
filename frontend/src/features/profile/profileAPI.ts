import apiClient from "../../api/apiClient";
import ipGeolocationAPI from "../../api/ipGeolocalisationAPI";
import { UpdateProfileResponse } from "./types";

export const createProfile = async (
  formData: FormData,
): Promise<UpdateProfileResponse> => {
  const response = await apiClient.post<UpdateProfileResponse>(
    "/profile",
    formData,
    {
      headers: {
        "Content-Type": undefined,
      },
    },
  );
  return response.data;
};

export const getLocalisation = async () => {
  const reponse = await ipGeolocationAPI.get("");
  return reponse.data;
};

// export const updateProfile = async (formData: FormData): Promise<UpdateProfileResponse> => {
// 	const { data } = await apiClient.patch<UpdateProfileResponse>('/profile', formData);
// 	return data;
// };
