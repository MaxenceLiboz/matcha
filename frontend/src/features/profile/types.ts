// src/features/profile/types.ts (or a shared types file)
export interface ProfileFormValues {
  gender: "male" | "female" | "non-binary" | "other" | "prefer-not-to-say" | "";
  sexualPreference: "men" | "women" | "both" | "other" | "prefer-not-to-say" | "";
  biography: string;
  interests: string[];
  age: number;
  profilePicture: File | null;
  otherPictures: FileList | null;
  authorizeLocation: boolean;
  latitude?: number;
  longitude?: number;
  city?: string;
}

export interface UpdateProfileRequest extends Omit<ProfileFormValues, "profilePicture" | "otherPictures"> {
  // Backend will likely expect FormData, or URLs if images are pre-uploaded
  // For this example, we'll assume FormData is built in the mutation
}

export interface UpdateProfileResponse {
  message: string;
  // Potentially updated user data
  user: {
    // simplified User type
    id: string;
    email: string;
    // ... other user fields
    profile: {
      gender: string;
      sexualPreference: string;
      biography: string;
      interests: string[];
      profilePictureUrl: string;
      otherPictureUrls: string[];
    };
  };
}

export interface Tag {
  name: string;
}

export type Gender = "Male" | "Female" | "Other";
export type SexualPreference = "Heterosexual" | "Homosexual" | "Other";

export interface LocationResponseDTO {
  city: string;
  latitude: string;
  longitude: string;
}

export interface FullProfileDTO {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: Gender;
  sexualPreference: SexualPreference;
  fameRating: number;
  biography: string;
  location: LocationResponseDTO | null;
  profile_picture_ref: string;
  other_picture_ref: string[];
  tags: Pick<Tag, "name">[];
}
