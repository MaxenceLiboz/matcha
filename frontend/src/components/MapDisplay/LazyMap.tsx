import React, { Suspense } from "react";
import { Box, Typography } from "@mui/material";

const MapDisplay = React.lazy(() => import("./MapDisplay"));

interface LazyMapProps {
  latitude: number;
  longitude: number;
  city: string;
}

const LazyMap: React.FC<LazyMapProps> = (props) => {
  const isSSR = typeof window === "undefined";

  return (
    <>
      {!isSSR && (
        <Suspense
          fallback={
            <Box sx={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography>Loading map...</Typography>
            </Box>
          }
        >
          <MapDisplay {...props} />
        </Suspense>
      )}
    </>
  );
};

export default LazyMap;