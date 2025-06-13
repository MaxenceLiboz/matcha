import React from "react";
import { Box, Card, CardContent, Typography, Chip, Grid, Rating, Avatar } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { FullProfileDTO } from "../types";
import Image from "../../../components/Image";
import LazyMap from "../../../components/MapDisplay/LazyMap";

interface ProfileDisplayProps {
  profile: FullProfileDTO;
}

export const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ profile }) => {
  return (
    <Card sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
      <Image
        imageRef={profile.profile_picture_ref}
        alt={`${profile.username}'s profile picture`}
        style={{ width: "100%", height: "350px", objectFit: "cover" }}
      />
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Image
            imageRef={profile.profile_picture_ref}
            alt="avatar"
            style={{ width: 60, height: 60, marginRight: 16, borderRadius: "50%" }}
          />
          <Box>
            <Typography variant="h4" component="div">
              {profile.username}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {profile.firstName} {profile.lastName}, {profile.age}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Rating name="fame-rating" value={profile.fameRating} readOnly max={5} precision={0.5} />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({profile.fameRating.toFixed(1)})
          </Typography>
        </Box>

        {profile.location && (
          <Box sx={{ color: "text.secondary", my: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <LocationOnIcon sx={{ mr: 1 }} />
              <Typography variant="h6">{profile.location.city}</Typography>
            </Box>
            <LazyMap
              latitude={parseFloat(profile.location.latitude)}
              longitude={parseFloat(profile.location.longitude)}
              city={profile.location.city}
            />
          </Box>
        )}

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Biography
        </Typography>
        <Typography variant="body1" paragraph>
          {profile.biography}
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Interests
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {profile.tags.map((tag) => (
            <Chip key={tag.name} label={`#${tag.name}`} color="primary" variant="outlined" />
          ))}
        </Box>

        {profile.other_picture_ref && profile.other_picture_ref.length > 0 && (
          <>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Gallery
            </Typography>
            <Grid container spacing={1}>
              {profile.other_picture_ref.map((ref, index) => (
                <Grid key={index}>
                  <Image
                    imageRef={ref}
                    alt={`Gallery image ${index + 1}`}
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </CardContent>
    </Card>
  );
};
