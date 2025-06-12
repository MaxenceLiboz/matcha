import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Grid,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Autocomplete } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProfileFormValues } from "../types";
import { useUpdateProfile } from "../hooks/useProfile";
import TextFieldForm from "../../../components/TextFieldForm";

const GENDERS = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

const SEXUAL_PREFERENCES = [
  { value: "Heterosexual", label: "Heterosexual" },
  { value: "Homosexual", label: "Homosexual" },
  { value: "Other", label: "Other" },
];

// Predefined common interests (optional, user can add their own)
const PREDEFINED_INTERESTS = [
  "#music",
  "#travel",
  "#foodie",
  "#movies",
  "#books",
  "#gaming",
  "#fitness",
  "#art",
  "#photography",
  "#vegan",
  "#geek",
  "#piercing",
  "#tattoo",
  "#coding",
  "#nature",
  "#sports",
  "#dancing",
];

export const ProfileForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm<ProfileFormValues>({
    defaultValues: {
      gender: "",
      sexualPreference: "",
      interests: [],
      profilePicture: null,
      otherPictures: null,
    },
  });

  const {
    mutation,
    onSubmit,
    serverError,
    serverSuccess,
    clearMessages,
    profilePicPreview,
    otherPicsPreview,
    handleProfilePictureChange,
    removeProfilePicture,
    handleOtherPicturesChange,
    removeOtherPicture,
    locationError,
    handleLocationChange,
    cityName,
    authorizeLocation,
  } = useUpdateProfile({ watch, setValue, getValues });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: "700px",
        margin: "20px auto",
        padding: 4,
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
      noValidate
    >
      <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
        Complete Your Profile
      </Typography>

      {serverSuccess && (
        <Alert severity="success" onClose={clearMessages}>
          {serverSuccess}
        </Alert>
      )}
      {serverError && (
        <Alert severity="error" onClose={clearMessages}>
          {serverError}
        </Alert>
      )}

      <Grid container justifyContent={"space-between"}>
        <Grid width={0.33}>
          <FormControl fullWidth error={!!errors.gender}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <Select labelId="gender-label" label="Gender" {...field}>
                  <MenuItem value="" disabled>
                    <em>Select Gender</em>
                  </MenuItem>
                  {GENDERS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.gender && (
              <FormHelperText>{errors.gender.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid width={0.33}>
          <FormControl fullWidth error={!!errors.sexualPreference}>
            <InputLabel id="sexual-preference-label">
              Sexual Preference
            </InputLabel>
            <Controller
              name="sexualPreference"
              control={control}
              rules={{ required: "Sexual preference is required" }}
              render={({ field }) => (
                <Select
                  labelId="sexual-preference-label"
                  label="Sexual Preference"
                  {...field}
                >
                  <MenuItem value="" disabled>
                    <em>Select Preference</em>
                  </MenuItem>
                  {SEXUAL_PREFERENCES.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.sexualPreference && (
              <FormHelperText>{errors.sexualPreference.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid width={0.33}>
          <TextFieldForm
            name="Age"
            required={true}
            register={register}
            error={errors.age}
            serverError={serverError}
            isPending={mutation.isPending}
          />
        </Grid>
      </Grid>

      <Box sx={{ border: "1px dashed grey", p: 2, borderRadius: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          Location
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Controller
                name="authorizeLocation"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    checked={authorizeLocation}
                    onChange={(e) => handleLocationChange(e.target.checked)}
                  />
                )}
              />
            }
            label="Authorize localization to find matches near you."
          />
        </FormGroup>
        {locationError && (
          <Alert severity="warning" sx={{ mt: 1 }}>
            {locationError}
          </Alert>
        )}
        {cityName && authorizeLocation && (
          <Typography variant="body1" sx={{ mt: 1, ml: 4, fontWeight: "bold" }}>
            Your City: {cityName}
          </Typography>
        )}
      </Box>

      <TextField
        label="Biography"
        multiline
        rows={4}
        fullWidth
        {...register("biography", {
          required: "Biography is required",
          maxLength: {
            value: 500,
            message: "Biography cannot exceed 500 characters",
          },
        })}
        error={!!errors.biography}
        helperText={errors.biography?.message}
        disabled={mutation.isPending}
      />

      <Controller
        name="interests"
        control={control}
        rules={{
          validate: (value) =>
            (value && value.length > 0 && value.length <= 10) ||
            "Please select between 1 and 10 interests.",
        }}
        render={({ field: { onChange, value: currentValues } }) => (
          <Autocomplete
            multiple
            freeSolo // Allow custom tags
            options={PREDEFINED_INTERESTS.filter(
              (opt) => !(currentValues || []).includes(opt),
            )}
            value={currentValues || []}
            onChange={(event, newValue) => {
              // Ensure tags are stored with '#' and handle freeSolo input
              const formattedValues = newValue.map((item) => {
                const tag =
                  typeof item === "string"
                    ? item
                    : (item as any).inputValue || item;
                return tag.startsWith("#") ? tag : `#${tag}`;
              });
              onChange(formattedValues);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Interests (e.g., #vegan, #books)"
                placeholder="Add up to 10 interests"
                error={!!errors.interests}
                helperText={
                  errors.interests?.message ||
                  "Type and press Enter to add a new interest."
                }
                disabled={mutation.isPending}
              />
            )}
          />
        )}
      />

      <Box sx={{ border: "1px dashed grey", p: 2, borderRadius: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          Profile Picture (Required)
        </Typography>
        <Button
          variant="outlined"
          component="label"
          startIcon={<PhotoCameraIcon />}
          disabled={mutation.isPending}
        >
          Upload Profile Picture
          <input
            type="file"
            hidden
            accept="image/jpeg,image/png,image/webp"
            onChange={handleProfilePictureChange}
          />
        </Button>
        {profilePicPreview && (
          <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src={profilePicPreview}
              alt="Profile Preview"
              style={{
                width: 100,
                height: 100,
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <IconButton
              onClick={removeProfilePicture}
              size="small"
              disabled={mutation.isPending}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
        {errors.profilePicture && (
          <FormHelperText error sx={{ mt: 1 }}>
            {errors.profilePicture.message}
          </FormHelperText>
        )}
        <Controller
          name="profilePicture"
          control={control}
          rules={{ required: "Profile picture is required." }}
          render={() => <></>}
        />
      </Box>

      <Box sx={{ border: "1px dashed grey", p: 2, borderRadius: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          Other Pictures (Up to 4)
        </Typography>
        <Button
          variant="outlined"
          component="label"
          startIcon={<PhotoCameraIcon />}
          disabled={mutation.isPending || otherPicsPreview.length >= 4}
        >
          Upload Other Pictures
          <input
            type="file"
            hidden
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={handleOtherPicturesChange}
          />
        </Button>
        {otherPicsPreview.length > 0 && (
          <Grid container spacing={1} sx={{ mt: 2 }}>
            {otherPicsPreview.map((src, index) => (
              <Grid key={index} sx={{ position: "relative" }}>
                <img
                  src={src}
                  alt={`Other Pic ${index + 1}`}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => removeOtherPicture(index)}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background: "rgba(255,255,255,0.7)",
                  }}
                  disabled={mutation.isPending}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        )}
        <Controller
          name="otherPictures"
          control={control}
          rules={{
            validate: (value) =>
              !value ||
              value.length <= 4 ||
              "You can upload a maximum of 4 other pictures.",
          }}
          render={() => <></>}
        />
        {errors.otherPictures && (
          <FormHelperText error sx={{ mt: 1 }}>
            {errors.otherPictures.message}
          </FormHelperText>
        )}
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={mutation.isPending}
        sx={{ mt: 2, py: 1.5, fontSize: "1.1rem" }}
      >
        {mutation.isPending ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Save Profile"
        )}
      </Button>
    </Box>
  );
};
