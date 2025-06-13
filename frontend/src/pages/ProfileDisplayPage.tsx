// Create new file: src/pages/ProfilePage.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, CircularProgress, Alert } from "@mui/material";
import Layout from "../layouts/MainLayout";
import { getMyProfile } from "../features/profile/profileAPI";
import { ProfileForm } from "../features/profile/components/ProfileForm";
import { ProfileDisplay } from "../features/profile/components/ProfileDisplay";

const ProfilePage: React.FC = () => {
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myProfile"],
    queryFn: getMyProfile,
    retry: (failureCount, error: any) => {
      // Don't retry if the error is 404 (Not Found)
      if (error?.response?.status === 404) {
        return false;
      }
      // Otherwise, retry up to 2 times
      return failureCount < 2;
    },
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      );
    }

    // Explicitly check for 404 error to show the creation form
    if (isError && (error as any)?.response?.status === 404) {
      return <ProfileForm />;
    }

    if (isError) {
      return <Alert severity="error">There was an error loading your profile. Please try again later.</Alert>;
    }

    if (profile) {
      return <ProfileDisplay profile={profile} />;
    }

    // Fallback case
    return null;
  };

  return <Layout>{renderContent()}</Layout>;
};

export default ProfilePage;
