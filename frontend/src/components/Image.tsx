import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Skeleton } from "@mui/material";
import { getPictureBlob } from "../features/profile/profileAPI";

interface ImageProps {
  imageRef?: string;
  alt: string;
  style: React.CSSProperties;
}

const Image: React.FC<ImageProps> = ({ imageRef, alt, style }) => {
  const [objectUrl, setObjectUrl] = useState<string>("");

  const { data: blob, isLoading } = useQuery({
    queryKey: ["picture", imageRef],
    queryFn: () => getPictureBlob(imageRef!),
    enabled: !!imageRef,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      setObjectUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [blob]);

  if (isLoading) {
    return <Skeleton variant="rectangular" style={style} />;
  }

  if (!imageRef || !objectUrl) {
    return <Box style={{ ...style, backgroundColor: '#f0f0f0' }} />;
  }

  return <img src={objectUrl} alt={alt} style={style} />;
};

export default Image;