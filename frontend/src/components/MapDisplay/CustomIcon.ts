import { DivIcon } from "leaflet";
import ReactDOMServer from "react-dom/server";

/**
 * Creates a Leaflet DivIcon from a React component.
 * @param iconComponent The React component to render as an icon.
 * @param iconSize The size of the icon [width, height].
 * @returns A Leaflet DivIcon instance.
 */
export const createMuiIcon = (iconComponent: React.ReactElement, iconSize: [number, number]): DivIcon => {
  return new DivIcon({
    // Render the React component to an HTML string.
    html: ReactDOMServer.renderToString(iconComponent),

    // Define the size of the icon.
    iconSize: iconSize,

    // Set the anchor point. For a typical MUI icon, the "tip" is bottom-center.
    iconAnchor: [iconSize[0] / 2, iconSize[1]],

    // Set the point from which the popup should open.
    popupAnchor: [0, -iconSize[1]],

    // This is crucial! It removes Leaflet's default white background and border
    // from the div, so only our icon is visible.
    className: "",
  });
};
