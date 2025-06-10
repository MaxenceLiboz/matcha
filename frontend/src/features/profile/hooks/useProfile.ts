import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm, UseFormGetValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ProfileFormValues, UpdateProfileResponse } from "../types";
import { createProfile } from "../profileAPI";

export const useUpdateProfile = (props: {
  watch: UseFormWatch<ProfileFormValues>;
  setValue: UseFormSetValue<ProfileFormValues>;
  getValues: UseFormGetValues<ProfileFormValues>;
}) => {
  const navigate = useNavigate();

  const { watch, setValue, getValues } = props;

  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(
    null
  );
  const [otherPicsPreview, setOtherPicsPreview] = useState<string[]>([]);

  const watchedProfilePic = watch("profilePicture");
  const watchedOtherPics = watch("otherPictures");

  useEffect(() => {
    if (watchedProfilePic) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result as string);
      };
      reader.readAsDataURL(watchedProfilePic);
    } else {
      setProfilePicPreview(null);
    }
  }, [watchedProfilePic]);

  useEffect(() => {
    if (watchedOtherPics && watchedOtherPics.length > 0) {
      const newPreviews: string[] = [];
      Array.from(watchedOtherPics).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === watchedOtherPics.length) {
            setOtherPicsPreview(newPreviews);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setOtherPicsPreview([]);
    }
  }, [watchedOtherPics]);

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setValue("profilePicture", event.target.files[0], {
        shouldValidate: true,
      });
    } else {
      setValue("profilePicture", null, { shouldValidate: true });
    }
  };

  const handleOtherPicturesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const newlySelectedFiles = Array.from(event.target.files);
      const existingFiles = getValues("otherPictures"); // Get current FileList from RHF
      const existingFilesArray = existingFiles ? Array.from(existingFiles) : [];

      // Combine existing and newly selected files
      let combinedFiles = [...existingFilesArray, ...newlySelectedFiles];

      // Enforce the limit of 4 "other" pictures
      const limit = 4;
      if (combinedFiles.length > limit) {
        // You might want to notify the user that not all files were added
        alert(
          `You can upload a maximum of ${limit} other pictures. ${
            combinedFiles.length - limit
          } files were not added.`
        );
        combinedFiles = combinedFiles.slice(0, limit);
      }

      // Create a new FileList from the combined array to store in react-hook-form
      const dataTransfer = new DataTransfer();
      combinedFiles.forEach((file) => dataTransfer.items.add(file));

      setValue(
        "otherPictures",
        dataTransfer.files.length > 0 ? dataTransfer.files : null,
        { shouldValidate: true }
      );
    }
    event.target.value = "";
  };

  const removeProfilePicture = () => {
    setValue("profilePicture", null, { shouldValidate: true });
  };

  const removeOtherPicture = (indexToRemove: number) => {
    const existingFiles = getValues("otherPictures");
    if (!existingFiles) return;

    const existingFilesArray = Array.from(existingFiles);
    existingFilesArray.splice(indexToRemove, 1); // Remove the file at the specific index

    const dataTransfer = new DataTransfer();
    existingFilesArray.forEach((file) => dataTransfer.items.add(file));

    setValue(
      "otherPictures",
      dataTransfer.files.length > 0 ? dataTransfer.files : null,
      { shouldValidate: true }
    );
  };

  const mutation = useMutation<UpdateProfileResponse, Error, FormData>({
    mutationFn: createProfile,
    onSuccess: (data) => {
      setServerSuccess(data.message);
      console.log("Profile updated:", data);
    },
    onError: (error: any) => {
      let errorMessage =
        "An unexpected error occurred while updating your profile.";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      setServerError(errorMessage);
      setServerSuccess(null);
    },
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    setServerError(null);
    setServerSuccess(null);

    const formData = new FormData();
    formData.append("gender", data.gender);
    formData.append("sexual_preference", data.sexualPreference);
    formData.append("biography", data.biography);
    formData.append("interests", data.interests.join(";"));
    formData.append('age', data.age.toString());

    if (data.profilePicture) {
      formData.append("profile_picture", data.profilePicture);
    }

    if (data.otherPictures) {
      for (let i = 0; i < data.otherPictures.length; i++) {
        formData.append("other_pictures", data.otherPictures[i]);
      }
    }
    mutation.mutate(formData);
  };

  return {
    mutation,
    onSubmit,
    serverError,
    serverSuccess,
    clearMessages: () => {
      setServerError(null);
      setServerSuccess(null);
    },
    profilePicPreview,
    otherPicsPreview,
    handleProfilePictureChange,
    removeProfilePicture,
    handleOtherPicturesChange,
    removeOtherPicture,
  };
};
